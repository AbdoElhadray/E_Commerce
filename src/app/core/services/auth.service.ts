import { enviroments } from './../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedInfo:any;
  constructor(private _HttpClient:HttpClient) { }
  registerUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/auth/signup`,userData)
  }
  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/auth/signin`,userData)
  }
  saveDecodedUser():void{
    if(sessionStorage.getItem('token',) !){
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token')!)
      console.log(this.decodedInfo);
      
    }
  }

}
