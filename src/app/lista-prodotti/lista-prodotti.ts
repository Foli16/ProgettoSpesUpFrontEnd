import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../services/product-service';
import {FormsModule} from '@angular/forms';
import {Product} from '../../model/Product';
import {SelezioneSupermercati} from '../selezione-supermercati/selezione-supermercati';
import {CartService} from '../../services/cart-service';
import {CardCategoria} from '../card-categoria/card-categoria';
import {CardProdotto} from '../card-prodotto/card-prodotto';

@Component({
  selector: 'app-lista-prodotti',
  imports: [
    FormsModule,
    CardCategoria,
    CardProdotto
  ],
  templateUrl: './lista-prodotti.html',
  styleUrl: './lista-prodotti.css'
})
export class ListaProdotti implements OnInit{

  chiaveNome="";
  ricerca = "";

  constructor(public serv: ProductService, public cServ: CartService)
  {
    this.serv.getFilteredProducts();
  }


  prendiProdotti(key:string)
  {
    return this.serv.productsMap?.get(key);
  }

  ngOnInit() {

  }

  vaiCategoria(category: string)
  {
    this.serv.addCategoryToCurrentSupermarkets(category);
  }


}
