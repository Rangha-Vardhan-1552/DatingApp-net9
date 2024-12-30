import { Component, EventEmitter, inject, Input, input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService= inject(AccountService)
  // @Input() UserFormHomeComponent:any=[]; this is the ang17 prior method but we can use this in another way
  // by using input signal  method from angular/core (parent to child communication)
  // UserFormHomeComponent= input.required<any>()

  // @Output() CancleRegister= new EventEmitter() ang17 prior method for  child to parent communication
  CancleRegister= output<boolean>()

  model:any={};
  register(){
    this.accountService.register(this.model).subscribe({
      next:response=>{
        console.log(response)
        this.cancle()
      },
      error:err=>console.log(err)
    })
  }

  cancle(){
    this.CancleRegister.emit(false)
  }
}
