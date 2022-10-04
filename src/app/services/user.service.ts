import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable, Subject, tap } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrlgetLastID = "https://localhost:44379/api/v1/PhoneBooks/getLastId";
  apiUrlget= "https://localhost:44379/api/v1/PhoneBooks";
  apiUrldel="https://localhost:44379";

 private _refresh=new Subject<void>();

get Refresh(){
  return this._refresh;
}

  constructor(private httpClient:HttpClient) { }
    //gelen yanıt respose ile eşlesiyor
    getUsers():Observable<ListResponseModel<User>>{
      return this.httpClient.get<ListResponseModel<User>>(this.apiUrlget);

    }
    add(user:User):Observable<any>{
      return this.httpClient.post(`${this.apiUrlget}`,user).pipe(
        tap(()=>{
          this._refresh.next();
        })
      )
    }
    delete(id:number):Observable<Object>{
      return this.httpClient.delete<object>(`${this.apiUrldel}/${id}`)
    }
    update(user:User):Observable<Object>{
      return this.httpClient.put(this.apiUrlget, user).pipe(
        tap(()=>{
          this._refresh.next();
        })
      );
    }
    getbyid(id : string):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrlget}/${id}`)
    }

    getLastId():Observable<ListResponseModel<User>>{
      return this.httpClient.get<ListResponseModel<User>>(this.apiUrlgetLastID);
    }

}

