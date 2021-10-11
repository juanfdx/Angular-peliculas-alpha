import { Component, OnInit } from '@angular/core';

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
  public imageUrl = `${environment.base_url}/upload/movies/`;
  public movieSelected!: Movie;
  public allInComments!: any[];
  public movieDeleted: boolean = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  //METHODS:
  loadMovies(): void {
    this.moviesService.getAllMovies().subscribe( res => {
      this.movies = res.rows;
      this.totalMovies = res.count;
      // console.log(this.movies)

    })
  }

  getMovieAndComments(id: number) {
    this.moviesService.getMovieAndComments(id).subscribe( res => {
      this.movieSelected = res;
      this.movieDeleted = true;
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

            // this.loadMovies(); //en caso de la paginación
            Swal.fire('Película borrada', movie.title, 'success');
          })
      }
    });
  }

}
