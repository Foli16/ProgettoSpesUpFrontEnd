import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart-service';
import {ProductService} from '../../services/product-service';
import {CardProdotto} from '../card-prodotto/card-prodotto';

@Component({
  selector: 'app-pagina-categoria',
  imports: [
    CardProdotto
  ],
  templateUrl: './pagina-categoria.html',
  styleUrl: './pagina-categoria.css'
})
export class PaginaCategoria implements OnInit{
  constructor(public serv:ProductService, public cServ:CartService)
  {
    this.serv.getFilteredProducts();
  }

  ngOnInit(): void {
    this.serv.getFilteredProducts();
  }

  tornaSupermercati()
  {
    this.serv.refilterByCurrentSupermarkets();
  }

}
