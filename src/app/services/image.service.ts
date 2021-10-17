import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * para pasar la imagen entre componentes hermanos
 * de profile.component a nav.component creamos este servicio
 *
 */
export class ImageService {

  private subject = new Subject<any>();

  constructor() { }

  //recibe la imagen de profile.component:134
  sendImage(image: string) {
    this.subject.next(image);
  }

  clearImage() {
    this.subject.next();
  }

  //manda la imagen a nav.component:37 y se actualiza al instante
  getImage(): Observable<any> {
    return this.subject.asObservable();
  }


}
