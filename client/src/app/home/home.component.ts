import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerToggle= false
  Users: any
  http= inject(HttpClient)

  ngOnInit(): void {
    this.getUsers();
  }

  registerMode(){
    this.registerToggle=!this.registerToggle
  }

  CancleRegisterFunc(event:boolean){
    this.registerToggle=event;
  }

  getUsers(){
    this.http.get('https://localhost:7003/api/Users').subscribe(
      {
        next:(response)=>this.Users=response,
        error:error=>console.log(error),
        complete:()=>console.log("user data fetched...!")
      }

    )
  }
}
