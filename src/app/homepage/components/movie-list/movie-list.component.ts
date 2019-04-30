import {Component, Injectable, OnInit} from '@angular/core';
import {Movie} from '../../../movie';
import {OmdbResult} from '../../../omdb-result';
import {MovieService} from '../../../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  constructor(private movieService: MovieService) {
    this.currentYear = new Date().getFullYear();
  }
  currentYear;
  // Create empty results field so that we can subscribe it to our MovieService
  results: OmdbResult  = {
    Search: [],
    Response: '',
    totalResults: 0
  };
  // List of movie information
  movies: Movie[] = [];
  // List of decades spanned throughout all available movies
  decades: {year: number, active: boolean}[] = [];

  static getDecadeForReleased(year: string) {
    return parseInt(year.slice(-4, -1) + '0', 10);
  }

  ngOnInit() {
    this.getMovies(); // Populate our results and movie data containers.
  }

  /**
   * Subscribes our results field to the MovieService and sets our field with the retrieved values
   */
  getMovies(): void {
    this.movieService.queryMovies()
      .subscribe(results => {
        results.Search.forEach((r: any) => {
          this.movieService.queryMovieById(r.imdbID).subscribe(m => {
            this.movies.push(m);
            const decade = MovieListComponent.getDecadeForReleased(m.Released);
            if (this.decades.filter((x) => x.year === decade).length === 0) {
              this.decades.push({
                year: decade,
                active: true
              });
              this.decades.sort(((a, b) => a.year - b.year));
            }
          });
        });
      });
  }

  isActiveDecade(decade): boolean {
    const decadeInstances = this.decades.filter((x) => x.year === decade);
    if (decadeInstances) {
      const instance = decadeInstances[0];
      return instance.active;
    }
    return false;
  }

  onFilterClick($event, decade: any) {
    decade.active = !decade.active;
  }
}
