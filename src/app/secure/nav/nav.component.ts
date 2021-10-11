import {Component, Input, OnInit} from '@angular/core';

import {User} from "../../models/user.model";
import {FileUploadService} from "../../services/file-upload.service";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //recibimos user del componente padre secure.component
  @Input('user') user!: User;
  public imageUrl = ``;

  private userId = parseInt(localStorage.getItem('id')!);



  constructor(private authService: AuthService) {

    this.authService.user(this.userId).subscribe( user => {
      this.imageUrl = `${environment.base_url}/upload/users/${user.image}`;
    })
  }


  ngOnInit(): void {

  }


  //METHODS:
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }



}
