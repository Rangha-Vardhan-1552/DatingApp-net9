import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  http= inject(HttpClient)
  Users: any

  ngOnInit(): void {
    this.http.get('https://localhost:7003/api/Users').subscribe(
      {
        next:(response)=>this.Users=response,
        error:error=>console.log(error),
        complete:()=>console.log("user data fetched...!")
      }

    )
  }
}
