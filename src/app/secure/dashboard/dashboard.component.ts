import { Component, OnInit } from '@angular/core';
import {Movie} from "../../interfaces/movie.interface";
import {MoviesService} from "../../services/movies.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public movies: Movie[] = [];
  public totalMovies: number = 0;
  public desde: number = 0;
  public imageUrl = `${environment.base_url}/upload/movies/`;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  //METHODS:
  loadMovies(): void {
    this.moviesService.getAllMovies(this.desde).subscribe( res => {
      this.movies = res.rows;
      this.totalMovies = res.count;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalMovies ) {
      this.desde -= valor;
    }
    this.loadMovies();
  }


}
