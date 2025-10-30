import { Component, OnInit } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-bottone-cambio-tema',
  templateUrl: './bottone-cambio-tema.html',
  imports: [
    NgClass
  ],
  styleUrl: './bottone-cambio-tema.css'
})
export class BottoneCambioTema implements OnInit {
  checked = false; // false = light, true = dark

  ngOnInit() {
    // Mantiene il tema scelto anche dopo il refresh
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.checked = (savedTheme === 'dark');
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }
  }

  toggleTheme() {
    this.checked = !this.checked;
    const newTheme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
