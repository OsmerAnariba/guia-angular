import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  imports: [FormsModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class EstudianteComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';
  mensaje = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionEstudiantes')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('registrosEstudiantes');
    this.estudiantes = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
  }

  guardar() {
    this.mensaje = '';

    if (
      !this.cuenta.trim() ||
      !this.nombre.trim() ||
      !this.carrera.trim() ||
      !this.fechaIngreso
    ) {
      this.mensaje = 'Cuenta, nombre, carrera y fecha de ingreso son obligatorios.';
      return;
    }

    const nuevoId = this.estudiantes.length
      ? Math.max(...this.estudiantes.map((e) => e.id)) + 1
      : 1;

    this.estudiantes.push({
      id: nuevoId,
      cuenta: this.cuenta.trim(),
      nombre: this.nombre.trim(),
      carrera: this.carrera.trim(),
      fechaIngreso: this.fechaIngreso,
    });

    this.guardarEnStorage();
    this.limpiar();
  }

  limpiar() {
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}