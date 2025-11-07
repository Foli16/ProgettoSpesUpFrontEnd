import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Interfaccia per il nome e l'ID di un supermercato.
 */
export interface SupermarketName {
  id: string;
  name: string;
  selected?: boolean;
}

/**
 * Tipo helper per rappresentare l'oggetto dei parametri di query.
 */
type QueryParams = { [key: string]: string | string[] };

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  productsMap:Map<string,Product[]>|null=null;
  names: SupermarketName[] = [];
  categoryPageName:string = '';

  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.getSupermarketList();
  }
  //TODO DA MIGLIORARE LA LOGICA
  getFilteredByName(name:string)
  {

    return this.products.filter(p=>p.productName.toLowerCase().includes(name.toLowerCase()));

  }

  /**
      * Raggruppa i prodotti presenti nel servizio per categoria.
      * Per ogni categoria, viene restituito un array contenente al massimo i primi 8 prodotti trovati.
      * @returns Una Map<string, Product[]> dove la chiave è la categoria e il valore è l'array di prodotti.
      */
  public getProductsByCategoryMap(): Map<string, Product[]> {
    const categoryMap = new Map<string, Product[]>();

    for (const product of this.products) {
      const category = product.category;

      // Ottiene l'array di prodotti per la categoria corrente
      const productsInCategory = categoryMap.get(category);

      if (productsInCategory) {
        // Se la categoria esiste già e ha meno di 8 prodotti, aggiunge quello nuovo
        if (productsInCategory.length < 8) {
          productsInCategory.push(product);
        }
      } else {
        // Se la categoria non esiste nella mappa, crea una nuova voce con il prodotto corrente
        categoryMap.set(category, [product]);
      }
    }

    return categoryMap;
  }

  // --- METODI DI GESTIONE URL E FILTRI ---

  /**
   * SOSTITUISCE completamente i filtri nell'URL con un nuovo set e naviga.
   * @param url La rotta di base a cui navigare (es. '/products').
   * @param filters Un oggetto che rappresenta i nuovi filtri da applicare.
   */
  public changePageWithFilter(url: string, filters: QueryParams): void {
    const queryString = this.createQuery(filters);
    const queryParams = queryString ? { query: queryString } : {};
    this.router.navigate([url], { queryParams });
  }

  /**
   * Crea una query partendo da un array di nomi di supermercati e naviga a '/productsofsupermarket'.
   * @param supermarketNames Un array con i nomi dei supermercati da includere nel filtro.
   */
  public navigateToSupermarkets(supermarketNames: string[]): void {
    const filters: QueryParams = {
      supermarkets: supermarketNames
    };
    const queryString = this.createQuery(filters);
    this.router.navigate(['/productsofsupermarket'], {
      queryParams: { query: queryString }
    });
  }

  /**
   * Estrae i supermercati dall'URL attuale e naviga a '/productsofsupermarket' con solo quel filtro.
   * Ignora tutti gli altri filtri presenti nell'URL.
   */
  public refilterByCurrentSupermarkets(): void {
    const currentQuery = this.route.snapshot.queryParamMap.get('query');
    if (currentQuery) {
      const currentFilters = this.parseCustomQuery(currentQuery);
      const supermarkets = currentFilters['supermarkets'];

      // Procede solo se ha trovato dei supermercati nel filtro attuale
      if (supermarkets && supermarkets.length > 0) {
        this.navigateToSupermarkets(supermarkets);
      }
    }
  }

  /**
   * Estrae i supermercati dall'URL attuale, aggiunge la categoria fornita e naviga a '/bycategory'.
   * @param category La stringa della categoria da aggiungere al filtro.
   */
  public addCategoryToCurrentSupermarkets(category: string): void {
    const currentQuery = this.route.snapshot.queryParamMap.get('query');
    const currentFilters = this.parseCustomQuery(currentQuery || '');
    const supermarkets = currentFilters['supermarkets'] || [];

    const newFilters: QueryParams = {
      category: category
    };

    if (supermarkets.length > 0) {
      newFilters['supermarkets'] = supermarkets;
    }

    const queryString = this.createQuery(newFilters);
    this.router.navigate(['/bycategory'], {
      queryParams: { query: queryString }
    });
  }

  /**
   * Aggiunge o aggiorna un filtro a una stringa di query esistente.
   * **Non naviga**, restituisce solo la nuova stringa di query.
   * @param currentQuery La stringa di query attuale (può essere null o vuota).
   * @param key La chiave del filtro da aggiungere/aggiornare.
   * @param value Il nuovo valore per il filtro.
   * @returns La nuova stringa di query con il filtro aggiunto/aggiornato.
   */
  public getUpdatedQueryString(currentQuery: string | null, key: string, value: string | string[]): string {
    const filtersObject = this.parseCustomQuery(currentQuery || '');
    filtersObject[key] = Array.isArray(value) ? value : [value];
    return this.createQuery(filtersObject);
  }

  /**
   * Restituisce i filtri dall'URL corrente, escludendo le chiavi specificate.
   * @param keysToExclude Un array di chiavi da rimuovere dal set di filtri.
   * @returns Un oggetto QueryParams contenente solo i filtri rimanenti.
   */
  public getFiltersExcept(keysToExclude: string[]): QueryParams {
    const currentQuery = this.route.snapshot.queryParamMap.get('query');
    if (!currentQuery) return {};
    const currentFilters = this.parseCustomQuery(currentQuery);
    keysToExclude.forEach(key => delete currentFilters[key]);
    return currentFilters;
  }

  // --- METODI DI RECUPERO DATI --- (invariati)

  public getFilteredProducts(): void {
    const query = this.route.snapshot.queryParamMap.get('query');
    if (!query) {
      this.products = [];
      return;
    }
    const parametri = this.parseCustomQuery(query);
    const supermercati = parametri["supermarkets"];
    if (parametri["category"]) {
      this.getProductsByCategory(parametri["category"][0], supermercati);
    } else {
      this.getProductsBySupermarket(supermercati);
    }
  }

  public getSupermarketList(): void {
    this.http.get<SupermarketName[]>("/api/search/allstores").subscribe(resp => this.names = resp);
  }

  public getProductsBySupermarket(supermarkets: string[]): void {
    this.http.post<Product[]>("/api/search/selectedstores", supermarkets).subscribe({
      next: (resp) => {
        this.products = resp;
        this.products.sort((p1,p2) => p1.price - p2.price);
        this.productsMap = this.getProductsByCategoryMap();
        const sortedEntries = [...this.productsMap.entries()].sort(([a],[b]) => a.localeCompare(b));
        this.productsMap = new Map(sortedEntries);
        },
      error: () => { this.openLoginModal(); }
    });
  }

  public getProductsByCategory(category: string, supermarkets?: string[]): void {
    this.http.post<Product[]>("/api/search/category/" + category, supermarkets || []).subscribe({
      next: (resp) => { this.products = resp; this.products.sort((a, b) => a.price - b.price);},
      error: () => { this.openLoginModal(); }
    });
  }
  openLoginModal() {
    const btn = document.createElement('button');
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#loginModal');
    btn.style.display = 'none'; // opzionale
    document.body.appendChild(btn);
    btn.click(); // 🔹 apre il modal
    document.body.removeChild(btn);
  }

  // --- METODI PRIVATI DI UTILITÀ PER LA QUERY --- (invariati)

  private createQuery(queryParams: QueryParams): string {
    const parts: string[] = [];
    for (const key in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        let values = queryParams[key];
        if (!Array.isArray(values)) values = [values as string];
        if (!values || values.length === 0 || !values.some(v => v)) continue;
        if (values.length === 1) {
          parts.push(`${key}:"${values[0]}"`);
        } else {
          const validValues = values.filter(v => v).map(v => `"${v}"`).join(',');
          if (validValues) parts.push(`${key}[${validValues}]`);
        }
      }
    }
    return parts.join('-');
  }

  private parseCustomQuery(queryString: string): { [key: string]: string[] } {
    const result: { [key: string]: string[] } = {};
    if (!queryString) return result;
    const parts = queryString.split('-');
    for (const part of parts) {
      const singleValueMatch = part.match(/^([^:]+):"(.*?)"$/);
      const arrayValueMatch = part.match(/^(.*?)\[(.*?)\]$/);
      if (singleValueMatch) {
        result[singleValueMatch[1].trim()] = [singleValueMatch[2].trim()];
      } else if (arrayValueMatch) {
        result[arrayValueMatch[1].trim()] = arrayValueMatch[2]
          .split(',').map(v => v.replace(/"/g, '').trim()).filter(Boolean);
      }
    }
    return result;
  }
}
