import { Component } from '@angular/core';

@Component({
  selector: 'app-bottone-cambio-tema',
  imports: [],
  templateUrl: './bottone-cambio-tema.html',
  styleUrl: './bottone-cambio-tema.css'
})
export class BottoneCambioTema
{
  checked=true;
  toggleTheme(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    document.documentElement.setAttribute('data-bs-theme',  this.checked ? 'dark' : 'light');
  }
}
