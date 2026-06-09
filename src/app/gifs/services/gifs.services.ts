import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs/operators';

const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage) ?? {};
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGisLoading = signal(false);
  private trendingGifsPage = signal(0);


  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys =  computed(() => Object.keys(this.searchHistory()));
  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if (this.trendingGisLoading()) return;

    this.trendingGisLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        offset: this.trendingGifsPage() * 20
      }
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      //this.trendingGifs.set(gifs);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsPage.update(page => page + 1);
      this.trendingGisLoading.set(false);
    });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        q: query
      }
    }).pipe(
      map(response => GifMapper.mapGiphyItemsToGifArray(response.data)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }));
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLocaleLowerCase()] || [];
  }
}
