import { Component, inject, signal } from '@angular/core';
import { GifsList } from '../../components/gifs-list/gifs-list';
import { GifsService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [
    GifsList
  ],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GifsService);
  gifs = signal<Gif[]>([]);


  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe(gifs => {
      this.gifs.set(gifs);
    });
  }
}
