import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadImage(id: number, type: string, data: any): Observable<any> {
    return this.http.put(`${environment.base_url}/upload/${type}/${id}`, data);
  }


}
