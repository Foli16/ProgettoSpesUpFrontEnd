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
 comparedList: ComparedLists = {};
 totalsOfLists:  TotalsOfLists = {};
 shoppingList: ShoppingList = {productList: [], cart: false, total: 0} ;
 loadingCart:boolean = false;
 best:BestSupermarket = {total:0, bestSupermarket:'', products: []};



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

  compareCart() {
    return this.http.get<ComparedLists>("/api/shoppinglist/compare").subscribe({
      next: (resp) => { this.comparedList = resp},
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

  getBestSupermarket()
  {
    let listaNomi:string[] = [];
    for (let supermarketName of this.pServ.names) {
      if(supermarketName.selected)
      {
        listaNomi.push(supermarketName.name);
      }
    }
    return this.http.post<BestSupermarket>("/api/shoppinglist/cart/best-market", listaNomi).subscribe(
      {
        next: (resp) => this.best = resp,
        error: () => alert("Operazione fallita")
      }
    );
  }
}
