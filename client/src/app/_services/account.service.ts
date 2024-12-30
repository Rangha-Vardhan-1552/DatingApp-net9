import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http= inject(HttpClient)
  baseUrl='https://localhost:7003/api/';
  currentUser=signal<User |null>(null)


  login(model:any){
    return this.http.post<User>(this.baseUrl+'Account/login',model).pipe(
      map(user=>{
        if(!user) return;
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUser.set(user)
        return user;
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'Account/register',model).pipe(
      map(user=>{
        if(!user) return;
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUser.set(user)
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUser.set(null)
  }

}
