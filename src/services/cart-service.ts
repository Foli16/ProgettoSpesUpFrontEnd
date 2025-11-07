import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShoppingList} from '../model/ShoppingList';
import {ComparedLists} from '../model/ComparedLists';
import {TotalsOfLists} from '../model/TotalsOfLists';
import {ProductService} from './product-service';
import {BestSupermarket} from '../model/BestSupermarket';



@Injectable({
  providedIn: 'root'
})
export class CartService
{
 constructor(private http: HttpClient, private pServ:ProductService) {
   this.getCart();
 }

 separatedLists: ComparedLists ={};
 totalsOfLists:  TotalsOfLists = {};
 shoppingList: ShoppingList = {productList: [], cart: false, total: 0} ;
 loadingCart:boolean = false;
 comparisonLists:ComparedLists = {};



  addToCart(priceTrendId: string) {
   let body = {};

   return this.http.post("/api/shoppinglist/add/" + priceTrendId, body).subscribe({
      next: (resp) => {
      },
      error: () => { this.openLoginModal(); }
    });
  }
  openLoginModal() {
    const btn = document.createElement('button');
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#loginModal');
    btn.style.display = 'none'; // opzionale
    document.body.appendChild(btn);
    btn.click(); // 🔹 apre il modal
    document.body.removeChild(btn);
  }


  removeFromCart(priceTrendId: string) {
    let body = {};

    return this.http.delete("/api/shoppinglist/remove/" + priceTrendId, body).subscribe({
      next: (resp) => {
        window.location.reload();
      },
      error: () => { this.openLoginModal(); }
    });
  }

  getCart() {
    this.loadingCart = true;
    return this.http.get<ShoppingList>("/api/shoppinglist/cart").subscribe({
      next: (resp) => { this.shoppingList = resp},
      error: () => { this.openLoginModal(); }
    });
  }

  getSeparatedShoppingLists()
  {
    return this.http.get<ComparedLists>("/api/shoppinglist/listsbymarket").subscribe(
      {
        next:(resp) => this.separatedLists = resp,
        error:() => alert("Errore")
      }
    )
  }

  totalsOfCart() {
    return this.http.get<TotalsOfLists>("/api/shoppinglist/totals").subscribe({
      next: (resp) => { this.totalsOfLists = resp
      },
      error: () => { this.openLoginModal(); }
    });
  }

  getComparisonLists()
  {
    return this.http.get<ComparedLists>("/api/shoppinglist/cart/comparison").subscribe(
      {
        next: (resp) =>
        {
          this.comparisonLists = resp;
          for(let el in this.comparisonLists)
            this.comparisonLists[el].sort((a, b) => a.productName.localeCompare(b.productName));
        },

        error: () => this.openLoginModal()
      }
    );
  }
}
