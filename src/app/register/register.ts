import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register
{
  username: string="";
  email: string="";
  password: string="";

  constructor(private serv:AuthService) {
  }


  registra()
  {
    this.serv.registration(this.username, this.password,this.email);
  }
}
