import {Component, Input, OnInit} from '@angular/core';

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {ImageService} from "../../services/image.service";
import {environment} from "../../../environments/environment";
import {ProfileNameService} from "../../services/profile-name.service";


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
  public completeName: any;
  private userId = parseInt(localStorage.getItem('id')!);


  constructor(private authService: AuthService,
              private imageService: ImageService,
              private profileNameService: ProfileNameService) {

    this.authService.user(this.userId).subscribe( user => {
      this.imageUrl = `${environment.base_url}/upload/users/${user.image}`;
    })

  }


  ngOnInit(): void {
    //actualizamos en tiempo real la imagen y el nombre con los que se cambió en profile.component
    this.imageService.getImage().subscribe( image => {
      if (image) {
        this.imageTemp = image;
      }
    });

    this.profileNameService.getCompleteName().subscribe( name => {
      if (name) {
        this.completeName = name;
      }
    })
  }


  //METHODS:
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }


}
