import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Movie} from "../../../interfaces/movie.interface";
import {environment} from "../../../../environments/environment";
import {MoviesService} from "../../../services/movies.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrls: ['./movie-comment.component.css']
})

export class MovieCommentComponent implements OnInit {

  public movies: Movie[] = [];
  public totalMovies: number = 0;
  public desde: number = 0;
  public limite: number = 5;
  public totalComments: number = 0;
  public desdeComment: number = 0;
  public limiteComments: number = 10;
  public imageUrl = `${environment.base_url}/upload/movies/`;
  public movieSelected!: Movie;
  public allInComments!: any[];
  public movieDeleted: boolean = false;
  public idTemp!: number;
  public solo10comments: any;


  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadMovies();

    //obtenemos el id(parámetro opcional) de la ruta, que viene del componente search
    this.route.queryParams.subscribe( res => {
      const movieId = parseInt(res.id);
      //si no viene id, que se salga
      if (isNaN(movieId)) {
        return;
      }
      this.getMovieAndComments(movieId, 0);
    })
  }


  //METHODS:
  loadMovies(): void {
    this.moviesService.getAllMovies(this.desde, 5).subscribe( res => {
      this.movies = res.rows;
      this.totalMovies = res.count;
    })
  }

  getMovieAndComments(id: number , desde: number) {
    this.moviesService.getMovieAndComments(id, desde ).subscribe( res => {
      this.movieSelected = res;
      this.movieDeleted = true;
      this.totalComments = res.countComments;
      this.idTemp = id;
      //para paginar los comentarios de 10 en 10
      this.solo10comments = res.comments?.filter( (item: any, index: any) => index < 10)
    })
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
            //Eliminamos la película del array this.movies
            this.movies = this.movies.filter(m => m.id !== movie.id);
            this.movieDeleted = false;

            Swal.fire('Película borrada', movie.title, 'success');
          })
      }
    });
  }

  //paginación películas
  cambiarPagina( valor: number ) {
    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalMovies ) {
      this.desde -= valor;
    }
    this.loadMovies();
  }

  //paginación comentarios
  cambiarPaginaComentarios( valor: number ) {
    let desde = 0;
    desde += valor;

    if ( desde < 0 ) {
      desde = 0;
    } else if ( desde >= this.totalComments ) {
      desde -= valor;
      return;
    }
    //usamos el id de la película seleccionada para ver sus comentarios
    this.getMovieAndComments(this.idTemp, desde);
  }

}
