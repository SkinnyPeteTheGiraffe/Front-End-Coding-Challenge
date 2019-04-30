import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {OmdbResult} from './omdb-result';
import {Movie} from './movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private omdbApiBaseUrl = 'http://www.omdbapi.com';
  private omdbApiKey = 'ac52f7a0';
  private movieTitle = 'Batman';

  constructor(
    private http: HttpClient) { }

  queryMovies(): Observable<OmdbResult> {
    return this.http.get<OmdbResult>(`${this.omdbApiBaseUrl}/?s=${this.movieTitle}&apikey=${this.omdbApiKey}`)
      .pipe(
        tap(_ => this.log('Fetched Search Results...')),
        catchError(this.handleError<OmdbResult>('queryMovies', {Search: [], Response: '', totalResults: 0}))
      );
  }

  queryMovieById<Data>(id: string): Observable<Movie> {
    const url = `${this.omdbApiBaseUrl}/?i=${id}&apikey=${this.omdbApiKey}`;
    return this.http.get<Movie>(url)
      .pipe(
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} movie id=${id}`);
        }),
        catchError(this.handleError<Movie>(`queryMovieById id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`[ERROR] ${operation} failed! Message: ${error.message}`);
      return of(result as T);
    };
  }

  /**
   * Broadcast given message to console (Can be extended later for more functionality).
   * @param message - the message to be broadcasted
   */
  private log(message: string) {
    console.log(`MovieService: ${message}`);
  }
}
