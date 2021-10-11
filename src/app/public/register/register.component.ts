import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';


import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public formSubmitted: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]

    }, {
      validators: this.matchedPasswords('password', 'passwordConfirm')
    });
  }

  //METHODS:
  submit(): void {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    //Crea el usuario
    this.authService.register( this.registerForm.getRawValue())
        .subscribe( res => {
          this.router.navigateByUrl('/');

        }, (err) => {
          //Si ocurre un error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  //Verifica que los campos del formulario sean válidos
  checkValidField( field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
        return true;
    }
    return  false;
  }

  //Comprueba que las contraseñas sean iguales
  matchedPasswords(pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);

      } else {
        pass2Control?.setErrors({noMatch: true});

      }
    }
  }

}
