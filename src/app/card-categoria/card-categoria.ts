import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/Product';
import { CardProdotto } from '../card-prodotto/card-prodotto';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-card-categoria',
  templateUrl: './card-categoria.html',
  imports: [CardProdotto],
  styleUrls: ['./card-categoria.css']
})
export class CardCategoria {
  @Input() categoryName!: string;
  @Input() products: Product[] = [];

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, public serv: ProductService) {}

  goToCategoryPage() {
    this.serv.addCategoryToCurrentSupermarkets(this.categoryName);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  get displayedProducts() {
    return (this.products || []).slice(0, 8);
  }
}
