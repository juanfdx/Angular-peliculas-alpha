import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public formSubmitted: boolean = false;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  //METHODS:
  submit(): void {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue())
      .subscribe( res => {

        this.router.navigateByUrl('/');

      }, (err) => {
        //Si ocurre un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  //Verifica que los campos del formulario sean válidos
  checkValidField( field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return  false;
  }

}
