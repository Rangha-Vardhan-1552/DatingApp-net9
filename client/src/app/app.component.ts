import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  accountService=inject(AccountService)
  ngOnInit(): void {
    this.setCurrentuser()
  }

  setCurrentuser(){
    var UserString=localStorage.getItem('user');
    if(!UserString) return;
    var user=JSON.parse(UserString);
    this.accountService.currentUser.set(user)
  }

  
}
