import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supermarket {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  private apiUrl = 'http://localhost:8080/api/supermarkets';

  constructor(private http: HttpClient) { }

  getSupermarkets(address: string): Observable<Supermarket[]> {
    return this.http.get<Supermarket[]>(`/api/supermarkets?address=${encodeURIComponent(address)}`);
  }


}
