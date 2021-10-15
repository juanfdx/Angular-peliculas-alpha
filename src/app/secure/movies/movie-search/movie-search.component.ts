import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  public movies!: any[];
  public imageUrl = `${environment.base_url}/upload/movies/`;

  constructor(private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  //METHODS:
  search(termino: string) {

    if (termino.length === 0) {
       this.movies = [];
      return;
    }

    this.moviesService.getSearchMovie(termino).subscribe( res => {
      this.movies = res.movie.rows;
    })
  }

}
