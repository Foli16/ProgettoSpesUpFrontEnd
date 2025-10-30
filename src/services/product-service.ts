import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/Product';
import {Router} from '@angular/router';

export interface SupermarketName{id:string, name:string, selected?: boolean; }

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { this.getSupermarketList()}

  names: SupermarketName[] = [];
  selectedNames: string[] = [];
  products: Product[] = [];

  getSupermarketList(){
    return this.http.get<SupermarketName[]>("/api/search/allstores").subscribe(
      resp => this.names = resp
    )
  }



  getProductsBySupermarket(){
    return this.http.post<Product[]>("/api/search/selectedstores", this.selectedNames).subscribe(
      {
        next:(resp) => {
        this.products=resp;
        this.router.navigate(["/productsofsupermarket"])
        },
        error:()=>{
          alert("l'operazione è fallita")
        }
      }
    )
  }

}
