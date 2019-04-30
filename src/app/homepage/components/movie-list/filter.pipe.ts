import { Pipe, PipeTransform } from '@angular/core';
import {Movie} from '../../../movie';
import {MovieListComponent} from './movie-list.component';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  /**
   * Manages the content displayed in our movie-list component, allowing us to filter out choices the users specifics
   * @param items the items being filters
   * @param decades the decades object array
   */
  transform(items: any[], decades): any[] {
    if (!items) { return []; }
    if (!decades) { return items; }
    return items.filter( it => {
      return  decades.filter((x) => MovieListComponent.getDecadeForReleased(it.Released) === x.year)[0].active;
    });
  }

}
