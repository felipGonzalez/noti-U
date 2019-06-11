import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../model/publicacion';

import { UserPublic } from '../model/UserPublic';
import { Usuario } from '../model/Usuario';


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

  public  getImg(url,img_url:string, name:string): Observable<string> {
    let postData = new  FormData();
    postData.append('img', img_url);
    postData.append('nombre', name);
    return this.http.post<string>(url, postData);
  }

  public verifyUser(email:string,password:string,url:string):Observable<Usuario> {
    var data = {
      email : email,
      password : password
    }
    return this.http.post<Usuario>(url, data);
  }

  public saveUser(url, user):Observable<any> {
      return this.http.post<any>(url, user);    
  }

  public savePost(url, post):Observable<any> {
    return this.http.post<any>(url, post);    
}

  public dowloadImg(url, nameImg): Observable<any> {

    return this.http.post<any>(url, {nameImg: nameImg});
  }

}
