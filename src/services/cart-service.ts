import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShoppingList} from '../model/ShoppingList';
import {ComparedLists} from '../model/ComparedLists';
import {TotalsOfLists} from '../model/TotalsOfLists';



@Injectable({
  providedIn: 'root'
})
export class CartService
{
 constructor(private http: HttpClient) {}

 shoppingList: ShoppingList = {products: [], cart: false, total: 0};
 comparedList: ComparedLists = {};
 totalsOfLists:  TotalsOfLists = {};


  addToCart(priceTrendId: string) {
   let body = {};

   return this.http.post("/api/shoppingList/add/" + priceTrendId, body).subscribe({
      next: (resp) => {
      },
      error: () => { alert("L'operazione è fallita"); }
    });
  }


  removeFromCart(priceTrendId: string) {
    let body = {};

    return this.http.delete("/api/shoppingList/remove/" + priceTrendId, body).subscribe({
      next: (resp) => {
      },
      error: () => { alert("L'operazione è fallita"); }
    });
  }

  getCart() {
    return this.http.get<ShoppingList>("/api/shoppingList/cart").subscribe({
      next: (resp) => { this.shoppingList = resp},
      error: () => { alert("L'operazione è fallita"); }
    });
  }

  compareCart() {
    return this.http.get<ComparedLists>("/api/shoppingList/compare").subscribe({
      next: (resp) => { this.comparedList = resp},
      error: () => { alert("L'operazione è fallita"); }
    });
  }


  totalsOfCart() {
    return this.http.get<TotalsOfLists>("/api/shoppingList/totals").subscribe({
      next: (resp) => { this.totalsOfLists = resp
      },
      error: () => { alert("L'operazione è fallita"); }
    });
  }


}
