import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//services
import {AuthService} from "../../services/auth.service";
import {FileUploadService} from "../../services/file-upload.service";
import {ImageService} from "../../services/image.service";
import {ProfileNameService} from "../../services/profile-name.service";

import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";
import Swal from "sweetalert2";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public formSubmitted: boolean = false;
  public user!: User;
  private userId = parseInt(localStorage.getItem('id')!);
  public uploadImage!: File;
  public imageUrl: string = ``;
  public imgTemp: any;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private fileUploadService: FileUploadService,
              private imageService: ImageService,
              private profileNameService: ProfileNameService) {
  }


  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });

    //se llenan los campos del usuario con sus datos
    this.loadUser(this.userId);
  }


  //METHODS:
  loadUser(userId: number): void {
    this.authService.user(userId).subscribe( (user: User) => {
      this.user = user;
      this.profileForm.patchValue(user);
      this.imageUrl = `${environment.base_url}/upload/users/${user.image}`;
    });
  }


  submit(): void {
    this.formSubmitted = true;

    this.authService.updateUser(this.userId, this.profileForm.getRawValue())
        .subscribe( res => {
          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.msg,
              showConfirmButton: false,
              timer: 1500
            })

            const firstName = this.profileForm.get('firstName')?.value;
            const lastName = this.profileForm.get('lastName')?.value;
            const completeName = `${firstName} ${lastName}`;
            this.profileNameService.sendCompleteName(completeName);
          }

    //si token no existe o no es valido
    }, error => {
          Swal.fire('Error', error.error.msg, 'error');
        });
  }


  //Verifica que los campos del formulario sean válidos
  checkValidField( field: string): boolean {
    if (this.profileForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return  false;
  }

  //Seleccionar imagen en el input
  // @ts-ignore
  changeImage(event: any) {
    this.uploadImage = event.target.files[0];
    const file = event.target.files[0];

    //para ver instantáneamente la imagen que vamos a guardar
    if(!file) {
      //si cancelamos la imagen nueva, para que muestre la anterior al momento
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
     this.imgTemp = reader.result;
    }

  }

  //Actualiza la imagen
  updateImage() {
    const type = 'users';
    const data = new FormData();
    // @ts-ignore
    data.append('image', this.uploadImage);

    this.fileUploadService.uploadImage(this.userId, type, data).subscribe( (res: any) => {
      if (res.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Imagen actualizada con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire('Error', res.msg, 'error');

      }
      this.imageUrl = `${environment.base_url}/upload/users/${res.image}`;

      //mandamos la imagen al imageService
      this.imageService.sendImage(this.imageUrl);
    })
  }

}

