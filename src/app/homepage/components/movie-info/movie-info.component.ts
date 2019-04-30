import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  @Input() movie: Movie; // The movie to store
  private protocol = 'https'; // The protocol we will use to link the IMDB website
  private imdbBaseUrl = 'www.imdb.com'; // The IMDB base url
  private imdbDirectory = 'title';  // The directory we will query in

  constructor() { }

  ngOnInit() {
  }

  /**
   * Generates a urls for the web front for IMBD with more information regarding the given movie.
   */
  public getImdbUrlForMovie() {
    return `${this.protocol}://${this.imdbBaseUrl}/${this.imdbDirectory}/${this.movie.imdbID}`;
  }

}
