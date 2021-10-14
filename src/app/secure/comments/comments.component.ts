import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Movie} from "../../interfaces/movie.interface";
import {environment} from "../../../environments/environment";
import {MoviesService} from "../../services/movies.service";
import Swal from "sweetalert2";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: [
  ]
})
export class CommentsComponent implements OnInit {

  public movies: Movie[] = [];
  public totalMovies: number = 0;
  public desde: number = 0;
  public imageUrl = `${environment.base_url}/upload/movies/`;
  private userId = parseInt(localStorage.getItem('id')!);
  public userName!: string;
  public rateForm!: FormGroup;
  public commentForm!: FormGroup;
  public movieSelected!: Movie;
  public formSubmitted: boolean = false;



  constructor(private moviesService: MoviesService,
              private authService: AuthService,
              private fb: FormBuilder) {

    //obtenemos el nombre del usuario conectado
    this.authService.user(this.userId).subscribe( user => {
      this.userName = `${user.firstName} ${user.lastName}`;
      //asignamos el valor al campo "userName" del commentForm
      this.commentForm.controls['userName'].setValue(this.userName);
    })

  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ?!,. ]+$/i )] ],
      userName: ''
    })

    this.loadMovies();
  }


  //METHODS:
  loadMovies(): void {
    this.moviesService.getAllMovies(this.desde).subscribe( res => {
      this.movies = res.rows;
      this.totalMovies = res.count;
    })
  }


  //submit del modal
  submit(): void {
    this.formSubmitted = true;

    if (this.commentForm.invalid) {
      Swal.fire('', 'EL campo no puede tener caracteres especiales, ni estar vacío', 'warning');
      return;

    } else {

      const movieId = this.movieSelected.id
      this.moviesService.commentMovie( movieId, this.commentForm.getRawValue())
        .subscribe( res => {

          if (res.ok) {
            this.commentForm.controls['comment'].reset();
            this.commentForm.markAsPristine()

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.msg,
              showConfirmButton: false,
              timer: 2000
            })
          }
        });
    }
  }

  //obtener la info de la peli para el modal
  getTheMovie(movie: Movie): void {
    //obtenemos la película
    this.movieSelected = movie;
  }

  //Calificar una película usando sweetalert2
  async rateMovie( movie: Movie) {
    // @ts-ignore
    Swal.fire({
      title: movie.title,
      input: 'range',
      inputAttributes: {
        min: 1,
        max: 10,
        step: 1
      },
      inputValue: 10

    }).then( objRate => {

      const rate = parseInt(objRate.value);
      //para evitar una respuesta falsa del sweetaler2
      if (isNaN(rate)) {
        return;
      }
      //formulario del sweetalert2
      this.rateForm = this.fb.group({
        rate: rate
      })

      this.moviesService.rateMovie( movie.id, this.rateForm.getRawValue() ).subscribe( res => {

          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.msg,
              showConfirmButton: false,
              timer: 2000
            })
          } else {
            Swal.fire('', res.msg, 'info');
          }
      })
    });
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
