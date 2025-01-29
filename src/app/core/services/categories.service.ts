import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient=inject(HttpClient)
    constructor() { }
    getAllCategories():Observable<any>{
      return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/categories`)
    } 
    specificCategory(id:string|null):Observable<any>{
      return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/categories/${id}`)
    }
   

}
