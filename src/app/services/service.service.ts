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

  public  getImg(imgPrueba:string, name:string): Observable<string> {
    let postData = new  FormData();
    postData.append('img', imgPrueba);
    postData.append('nombre', name);
    return this.http.post<string>("http://192.168.43.152:402/one", postData);
  }

  public verifyUser(email:string,password:string,url:string):Observable<boolean> {
    var data = {
      email : email,
      password : password
    }
    return this.http.post<boolean>(url, data);
  }

  public saveUser(url, user):Observable<boolean> {
      return this.http.post<boolean>(url, user);    
  }
}
