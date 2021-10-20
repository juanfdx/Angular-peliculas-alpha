import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * servicio para actualizar el nombre del usuario en tiempo real en nav.component
 */
export class ProfileNameService {

  private subject = new Subject<any>();


  sendCompleteName(name: string) {
    this.subject.next(name);
  }

  getCompleteName(): Observable<any> {
    return this.subject.asObservable();
  }

}
