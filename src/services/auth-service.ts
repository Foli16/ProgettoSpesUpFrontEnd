import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  userInformation:User | null = null;

  constructor(private http: HttpClient, private router: Router)
  {
    //I servizi vengono istanziati la prima volta che viene creato un componente dove li abbiamo iniettati
    this.letturaInfoUtente();
  }

  registration(username: string, password: string,email:string)
  {
    let body = {'username': username, 'password': password, 'email': email};
    this.http.post('/api/auth/register', body).subscribe(
      //usa quando response 200
      () =>
      {
        this.letturaInfoUtente();
        this.router.navigate(['/']);
      },
      //usa quando response 400-500
      (error) =>
      {
        alert("Registration Failed");
      }
    );
  }

  letturaInfoUtente()
  {
    this.http.get<User>('/api/auth/userinformation').subscribe(
      (user: User) => this.userInformation = user
    )
  }

  logout()
  {
    //1- imposto userInformation a null
    this.userInformation=null;
    //2 - cancella token
    document.cookie = 'token=; Path=/api/auth; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  login(username: string, password: string)
  {
    let body = {'username': username, 'password': password};
    this.http.post('/api/auth/login', body).subscribe(
      //usa quando response 200
      () =>
      {
        this.letturaInfoUtente();
        this.router.navigate(['/']);
      },
      //usa quando response 400-500
      (error) =>
      {
        alert(error.message);
      }
    );
  }
}
