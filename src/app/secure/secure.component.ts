import {AfterViewInit, Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import Swal from "sweetalert2";


@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styles: [
  ]
})
export class SecureComponent implements OnInit {

  public user!: User;
  private userId = parseInt(localStorage.getItem('id')!);
  private token = localStorage.getItem('token');


  constructor(private authService: AuthService,
              private router: Router) { }


  ngOnInit(): void {
    //Tiene que existir el id y el token para poder estar en la parte segura de la app
    if (!this.userId || !this.token) {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigateByUrl('/login');
      return;
    }

    this.userIsLogged(this.userId);
  }

  //METHODS:
  userIsLogged(userId: number): void {
    this.authService.user(userId).subscribe( (user: any) => {

      if (user.ok === false) {
        Swal.fire('Error', user.msg, 'error');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.router.navigateByUrl('/login');
        return;
      }

      this.user = user;
    });
  }

}
