import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {NgIf} from '@angular/common';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-card-prodotto',
  imports: [
    NgIf
  ],
  templateUrl: './card-prodotto.html',
  styleUrl: './card-prodotto.css'
})
export class CardProdotto implements OnInit{

  chiaveNome="";
  ricerca = "";
  @Input() product!: Product;

  constructor(public serv: ProductService)
  {

  }


  ngOnInit() {

  }

}
