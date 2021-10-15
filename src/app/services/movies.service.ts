import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Movie} from "../interfaces/movie.interface";


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }


  //SERVICES:
  //obtener todas las películas con paginación
  getAllMovies(desde: number = 0, limite: number = 8): Observable<any> {
    return this.http.get<any>(`${environment.base_url}/movies?desde=${desde}&limite=${limite}`);
  }

  //obtener una película por su id
  getMovie(id: number): Observable<any> {
    return this.http.get(`${environment.base_url}/movies/${id}`);
  }

  //crear una película
  createMovie(formData: any): Observable<any> {
    return this.http.post<any>(`${environment.base_url}/movies/create`, formData);
  }

  //actualizar una película
  updateMovie(id: number, formData: any) {
    return this.http.put(`${environment.base_url}/movies/${id}/edit`, formData);
  }

  //borrar una película
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${environment.base_url}/movies/${id}`);
  }
  //obtener una película con sus comentarios y paginación
  getMovieAndComments(id: number, desde: number = 0): Observable<any> {
    return this.http.get(`${environment.base_url}/movies/${id}/comments?desde=${desde}`);
  }

  //comentar una película
  commentMovie(id: number, formData: any ): Observable<any> {
    return this.http.post(`${environment.base_url}/movies/${id}/comment`, formData)
  }

  //calificar una película
  rateMovie(id: number, formData: any ): Observable<any> {
    return this.http.post(`${environment.base_url}/movies/${id}/rate`, formData);
  }

  //buscar películas  por título o por año
  getSearchMovie(termino: string): Observable<any> {
    return this.http.get(`${environment.base_url}/search/${termino}`);
  }
}
