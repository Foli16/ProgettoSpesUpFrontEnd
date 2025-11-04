import {Component} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/Product';
import {CardProdotto} from '../card-prodotto/card-prodotto';

@Component({
  selector: 'app-pagina-categoria',
  imports: [
    CardProdotto
  ],
  templateUrl: './pagina-categoria.html',
  styleUrl: './pagina-categoria.css'
})
export class PaginaCategoria {
  constructor(public serv:ProductService)
  {

  }

  tornaSupermercati()
  {
    this.serv.refilterByCurrentSupermarkets();
  }

}
