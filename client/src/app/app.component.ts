import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, CommonModule, NavComponent],
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
