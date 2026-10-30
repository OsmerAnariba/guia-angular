import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;
  mensaje = '';
  idEditando: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTienda')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('productosTienda');
    this.productos = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('productosTienda', JSON.stringify(this.productos));
  }

  guardar() {
    this.mensaje = '';

    if (!this.codigo.trim() || !this.nombre.trim()) {
      this.mensaje = 'Código y nombre son obligatorios.';
      return;
    }

    if (this.precio === null || typeof this.precio !== 'number' || this.precio <= 0) {
      this.mensaje = 'El precio debe ser un número mayor que cero.';
      return;
    }

    if (
      this.existencias === null ||
      !Number.isInteger(this.existencias) ||
      this.existencias < 0
    ) {
      this.mensaje = 'Las existencias deben ser un entero mayor o igual que cero.';
      return;
    }

    if (this.idEditando !== null) {
      // Modo actualizar: mismo ID, misma cantidad de filas
      const producto = this.productos.find((p) => p.id === this.idEditando);
      if (producto) {
        producto.codigo = this.codigo.trim();
        producto.nombre = this.nombre.trim();
        producto.precio = this.precio;
        producto.existencias = this.existencias;
      }
    } else {
      // Modo crear: ID automático
      const nuevoId = this.productos.length
        ? Math.max(...this.productos.map((p) => p.id)) + 1
        : 1;

      this.productos.push({
        id: nuevoId,
        codigo: this.codigo.trim(),
        nombre: this.nombre.trim(),
        precio: this.precio,
        existencias: this.existencias,
      });
    }

    this.guardarEnStorage();
    this.limpiar();
  }

  editar(producto: Producto) {
    this.mensaje = '';
    this.idEditando = producto.id;
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.existencias = producto.existencias;
  }

  cancelar() {
    this.mensaje = '';
    this.limpiar();
  }

  limpiar() {
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.idEditando = null;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}