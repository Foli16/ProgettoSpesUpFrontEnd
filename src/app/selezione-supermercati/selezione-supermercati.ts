import { Component } from '@angular/core';
import {SupermarketService} from '../../services/SupermarketService';
import {ProductService} from '../../services/product-service';
import {FormsModule} from '@angular/forms';
import {MapComponent} from "../map/map-component/map-component";

@Component({
  selector: 'app-selezione-supermercati',
    imports: [
        FormsModule,
        MapComponent
    ],
  templateUrl: './selezione-supermercati.html',
  styleUrl: './selezione-supermercati.css'
})
export class SelezioneSupermercati
{
  selectedNames:string[]=[];
  constructor(public serv: ProductService) {
  }

  updateSelectedSupermarkets() {
  this.selectedNames = this.serv.names
      .filter(n => n.selected)
      .map(n => n.name);



  }

  vaiSupermercati()
  {

    this.serv.navigateToSupermarkets(this.selectedNames);
  }




}
