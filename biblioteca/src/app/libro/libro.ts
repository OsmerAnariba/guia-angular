import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  imports: [],
  templateUrl: './libro.html',
  styleUrl: './libro.css',
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionBiblioteca')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('librosBiblioteca');
    this.libros = datos ? JSON.parse(datos) : [];
  }

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}