import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../model/publicacion';

import { UserPublic } from '../model/UserPublic';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {
    
   }

  public  getPublic(url:string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(url);
  }

  public  getPublicUser(url:string): Observable<UserPublic[]> {
    return this.http.get<UserPublic[]>(url);
  }
}
