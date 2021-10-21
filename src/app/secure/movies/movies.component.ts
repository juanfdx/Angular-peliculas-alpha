import { Component, OnInit } from '@angular/core';
import {Movie} from "../../interfaces/movie.interface";
import {environment} from "../../../environments/environment";
import {MoviesService} from "../../services/movies.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styles: [
  ]
})
export class MoviesComponent implements OnInit {

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

  delete(movie: Movie): void {
    Swal.fire({
      title: 'Borrar',
      text: `Deseas borrar ${ movie.title }?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.moviesService.deleteMovie(movie.id).subscribe(
          res => {
            this.movies = this.movies.filter(m => m.id !== movie.id);
            // this.loadMovies(); //en caso de la paginación
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Película ${movie.title} borrada con éxito!`,
              showConfirmButton: false,
              timer: 2000
            });

        //si token no existe o no es valido
        }, error => {
          Swal.fire('Error', error.error.msg, 'error');
        });

      }
    });
  }

}
