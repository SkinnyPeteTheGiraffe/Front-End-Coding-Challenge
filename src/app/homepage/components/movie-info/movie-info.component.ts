import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  @Input() movie: Movie;
  private protocol = 'https';
  private imdbBaseUrl = 'www.imdb.com';
  private imdbDirectory = 'title';

  constructor() { }

  ngOnInit() {
  }

  public getImdbUrlForMovie() {
    return `${this.protocol}://${this.imdbBaseUrl}/${this.imdbDirectory}/${this.movie.imdbID}`;
  }

}
