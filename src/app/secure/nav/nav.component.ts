import {Component, Input, OnInit} from '@angular/core';

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {ImageService} from "../../services/image.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //recibimos user del componente padre secure.component
  @Input('user') user!: User;
  public imageUrl = '';
  public imageTemp = '';
  private userId = parseInt(localStorage.getItem('id')!);


  constructor(private authService: AuthService,
              private imageService: ImageService) {

    this.authService.user(this.userId).subscribe( user => {
      this.imageUrl = `${environment.base_url}/upload/users/${user.image}`;
    })

  }


  ngOnInit(): void {
    //actualizamos la imagen con la que se cambió en profile.component
    this.imageService.getImage().subscribe( image => {
      if (image) {
        this.imageTemp = image;
      }
    })
  }


  //METHODS:
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }


}
