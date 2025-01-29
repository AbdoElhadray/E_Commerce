import { enviroments } from './../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }
  getAllBrands():Observable<any> {
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/brands`)
  }
  getBranddetails(id: string|null): Observable<any> {
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/brands/${id}`);
  }
}
