import {Component} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/Product';
import {CardProdotto} from '../card-prodotto/card-prodotto';
import {CartService} from '../../services/cart-service';

@Component({
  selector: 'app-pagina-categoria',
  imports: [
    CardProdotto
  ],
  templateUrl: './pagina-categoria.html',
  styleUrl: './pagina-categoria.css'
})
export class PaginaCategoria {
  constructor(public serv:ProductService, public cServ:CartService)
  {

  }

  tornaSupermercati()
  {
    this.serv.refilterByCurrentSupermarkets();
  }

}
