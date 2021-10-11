import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MoviesService} from "../../../services/movies.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  public movieForm!: FormGroup;
  public formSubmitted: boolean = false;


  constructor(private fb: FormBuilder,
              private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ?,. ]+$/i )] ],
      year: ['', [ Validators.required,
                   Validators.pattern(/^-?(0|[1-9]\d*)?$/ ),
                   Validators.min(1900),
                   Validators.max(2022) ]
      ],

    });
  }

  //METHODS:
  submit(): void {
    this.formSubmitted = true;
    if (this.movieForm.invalid) {
      return;
    }

    this.moviesService.createMovie(this.movieForm.getRawValue())
        .subscribe( res => {
          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Película creada con éxito!',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              this.router.navigateByUrl('/dashboard');
            }, 2500);

          } else {
            Swal.fire('Error', res.msg, 'warning');
          }
        }, error => {
          Swal.fire('Error', error.error.msg, 'error');
        });
  }

  //Verifica que los campos del formulario sean válidos
  checkValidField( field: string): boolean {
    if (this.movieForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return  false;
  }

}
