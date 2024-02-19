import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interface';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${environment.apiKey}`).pipe(delay(2000));
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${environment.apiKey}`);
  }

  searchMovies(searchTerm:string):Observable<MovieResult[]>{
    return this.http.get<MovieResult[]>(`${BASE_URL}/search/movie?query=${searchTerm}&api_key=${environment.apiKey}`); 
  }
}

