import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MoviesService} from "../../../services/movies.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']

})
export class MovieEditComponent implements OnInit {

  public movieForm!: FormGroup;
  public formSubmitted: boolean = false;
  public uploadImage!: File;
  public imageUrl: string = ``;
  private movieId: string = '';


  constructor(private fb: FormBuilder,
              private moviesService: MoviesService,
              private fileUploadService: FileUploadService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ?,. ]+$/i )] ],
      year: ['', [ Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/ ),
        Validators.min(1900),
        Validators.max(2022) ]
      ],
    });

    this.activatedRoute.paramMap.subscribe( params => {
      this.movieId = params.get('id') || "";
    })

    this.loadMovie(this.movieId);
  }

  //METHODS:
  //cargamos la película en el formulario
  loadMovie(movieId: string): void {
    const id = parseInt(movieId);

    this.moviesService.getMovie(id).subscribe( res => {
      if (!res.ok) {
        Swal.fire('Error', res.msg, 'error');
        this.router.navigateByUrl('movies');
        return;
      }
      this.movieForm.patchValue(res.movie);
      this.imageUrl = `${environment.base_url}/upload/movies/${res.movie.image}`;
    })
  }

  submit(): void {
    this.formSubmitted = true;
    if (this.movieForm.invalid) {
      return;
    }
    const id = parseInt(this.movieId);

    this.moviesService.updateMovie(id, this.movieForm.getRawValue()).subscribe( (res: any) => {
      if (res.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Película actualizada con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);

      } else {
        Swal.fire('Error', res.msg, 'warning');
        setTimeout(() => {
          this.router.navigateByUrl('/movies');
        }, 2000);
      }
    })
  }

  //válida los campos del formulario
  checkValidField( field: string): boolean {
    if (this.movieForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return  false;
  }

  //Seleccionar imagen en el input
  changeImage(event: any) {
    this.uploadImage = event.target.files[0];
  }

  //Actualiza la imagen
  updateImage() {
    const id = parseInt(this.movieId);
    const type = 'movies';
    const data = new FormData();
    // @ts-ignore
    data.append('image', this.uploadImage);

    this.fileUploadService.uploadImage(id, type, data).subscribe( (res: any) => {
      if (res.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Imagen actualizada con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);

      } else {
        Swal.fire('Error', res.msg, 'error');

      }
      this.imageUrl = `${environment.base_url}/upload/movies/${res.image}`;
    })
  }


}
