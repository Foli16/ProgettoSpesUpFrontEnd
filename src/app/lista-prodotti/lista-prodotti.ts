import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-lista-prodotti',
  imports: [],
  templateUrl: './lista-prodotti.html',
  styleUrl: './lista-prodotti.css'
})
export class ListaProdotti {

  constructor(public serv: ProductService) {}
}
