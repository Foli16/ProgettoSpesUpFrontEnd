import { Component } from '@angular/core';
import {SupermarketService} from '../../services/SupermarketService';
import {ProductService} from '../../services/product-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-selezione-supermercati',
  imports: [
    FormsModule
  ],
  templateUrl: './selezione-supermercati.html',
  styleUrl: './selezione-supermercati.css'
})
export class SelezioneSupermercati
{
  constructor(public serv: ProductService) {
  }

  updateSelectedSupermarkets() {
    this.serv.selectedNames = this.serv.names
      .filter(n => n.selected)
      .map(n => n.name);
  }


}
