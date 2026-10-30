import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];

  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente';
  mensaje = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTareas')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('agendaTareas');
    this.tareas = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  }

  guardar() {
    this.mensaje = '';

    if (!this.titulo.trim() || !this.descripcion.trim() || !this.fechaLimite) {
      this.mensaje = 'Título, descripción y fecha límite son obligatorios.';
      return;
    }

    if (this.estado !== 'Pendiente' && this.estado !== 'Completada') {
      this.mensaje = 'El estado debe ser Pendiente o Completada.';
      return;
    }

    const nuevoId = this.tareas.length
      ? Math.max(...this.tareas.map((t) => t.id)) + 1
      : 1;

    this.tareas.push({
      id: nuevoId,
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fechaLimite: this.fechaLimite,
      estado: this.estado,
    });

    this.guardarEnStorage();
    this.limpiar();
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}