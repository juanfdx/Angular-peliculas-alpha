import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario!: User;

  constructor(private http: HttpClient) {

  }

  //token del usuario logeado
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  //SERVICES:
  //Ingresar
  login(formData: any): Observable<any> {
    return this.http.post(`${environment.base_url}/login`, formData)
              .pipe(
                tap( (res: any) => {
                  //creamos una instancia de usuario
                  const { id, firstName, lastName, email, image } = res.user;
                  this.usuario = new User(id, firstName, lastName, email, image);

                  localStorage.setItem('id', res.user.id);
                  localStorage.setItem('token', res.token);
                })
              )
  }

  //Crear usuario
  register(formData: any): Observable<any> {
    return this.http.post(`${environment.base_url}/users/create`, formData)
            .pipe(
              tap( (res: any) => {

                const { id, firstName, lastName, email, image } = res.user;
                this.usuario = new User(id, firstName, lastName, email, image);

                localStorage.setItem('id', res.user.id);
                localStorage.setItem('token', res.token);
              })
            )
  }

  //Obtener usuario
  user(id: number): Observable<User> {
    return this.http.get<User>(`${environment.base_url}/users/${id}`);
  }

  //Actualizar usuario
  updateUser(id: number, formData: any): Observable<any> {
    return this.http.put(`${environment.base_url}/users/${id}/edit`, formData, {
      headers: {
        'x-token': this.token
      }
    })
  }


}
