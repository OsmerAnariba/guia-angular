import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css',
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];

  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;
  mensaje = '';

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

  guardarEnStorage() {
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
  }

  guardar() {
    this.mensaje = '';

    if (!this.codigo.trim() || !this.titulo.trim() || !this.autor.trim()) {
      this.mensaje = 'Código, título y autor son obligatorios.';
      return;
    }

    if (
      this.anio === null ||
      !Number.isInteger(this.anio) ||
      this.anio < 1000 ||
      this.anio > 9999
    ) {
      this.mensaje = 'El año debe ser un entero de cuatro cifras (1000 a 9999).';
      return;
    }

    const nuevoId = this.libros.length
      ? Math.max(...this.libros.map((l) => l.id)) + 1
      : 1;

    this.libros.push({
      id: nuevoId,
      codigo: this.codigo.trim(),
      titulo: this.titulo.trim(),
      autor: this.autor.trim(),
      anio: this.anio,
    });

    this.guardarEnStorage();
    this.limpiar();
  }

  limpiar() {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}