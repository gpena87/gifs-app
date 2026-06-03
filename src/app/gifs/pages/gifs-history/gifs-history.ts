import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { GifsService } from '../../services/gifs.services';
import { GifsList } from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-gifs-history',
  imports: [GifsList],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory {

  // query = inject(ActivatedRoute).params.subscribe(params => {
  //   console.log(params);
  // });

  gifsService = inject(GifsService);

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query'])
  ));

  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query());
  });
}
