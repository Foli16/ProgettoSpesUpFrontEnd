import { Component, OnInit } from '@angular/core';
import { Supermarket, SupermarketService } from '../../../services/SupermarketService';
import { FormsModule } from '@angular/forms';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import {SelezioneSupermercati} from '../../selezione-supermercati/selezione-supermercati';

@Component({
  selector: 'app-map',
  templateUrl: './map-component.html',
  imports: [
    CommonModule,
    FormsModule,
    GoogleMap,
    MapMarker,
    SelezioneSupermercati,
  ],
  styleUrls: ['./map-component.css']
})
export class MapComponent implements OnInit {

  supermarkets: Supermarket[] = [];
  zoom = 14;
  center: google.maps.LatLngLiteral = { lat: 41.9028, lng: 12.4964 }; // Roma come default
  markers: any[] = [];

  address: string = '';
  selectedMarker: any;

  constructor(private supermarketService: SupermarketService) { }

  ngOnInit(): void {}

  search() {
    if (!this.address) return;

    this.supermarketService.getSupermarkets(this.address).subscribe(results => {
      this.supermarkets = results;

      if (results.length > 0) {
        // Centriamo la mappa sul primo risultato
        this.center = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };

        // Creiamo i marker
        this.markers = results.map(store => ({
          position: {
            lat: store.geometry.location.lat,
            lng: store.geometry.location.lng
          },
          title: store.name,
          info: store.vicinity
        }));
      } else {
        alert('Nessun supermercato trovato!');
      }
    });
  }

  openInfo(marker: any, infoWindow: MapInfoWindow) {
    this.selectedMarker = marker;
    infoWindow.open(marker.mapMarker);
  }
}
