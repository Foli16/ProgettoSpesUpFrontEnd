import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from '../../services/auth-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login
{
  email: string="";
  password: string="";

  constructor(private serv:AuthService) {
  }


  login()
  {
    this.serv.login(this.email, this.password);
  }
}
