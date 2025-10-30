import { Component } from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [
    RouterLink
  ],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {

  constructor(public serv:AuthService) {}



}
