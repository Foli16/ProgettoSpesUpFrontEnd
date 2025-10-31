import {Component} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-pagina-categoria',
  imports: [],
  templateUrl: './pagina-categoria.html',
  styleUrl: './pagina-categoria.css'
})
export class PaginaCategoria {
  constructor(public serv:ProductService)
  {
    this.serv.getFilteredProducts();
  }

  tornaSupermercati()
  {
    this.serv.refilterByCurrentSupermarkets();
  }

}
