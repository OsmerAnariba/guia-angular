import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  imports: [FormsModule],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css',
})
export class MascotaComponent implements OnInit {
  mascotas: Mascota[] = [];

  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';
  mensaje = '';
  idEditando: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionVeterinaria')) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('mascotasVeterinaria');
    this.mascotas = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
  }

  guardar() {
    this.mensaje = '';

    if (!this.nombre.trim() || !this.especie.trim() || !this.propietario.trim()) {
      this.mensaje = 'Nombre, especie y propietario son obligatorios.';
      return;
    }

    if (
      this.edad === null ||
      !Number.isInteger(this.edad) ||
      this.edad < 0
    ) {
      this.mensaje = 'La edad debe ser un entero mayor o igual que cero.';
      return;
    }

    if (this.idEditando !== null) {
      // Modo actualizar: se busca por ID, así solo cambia esa mascota
      const mascota = this.mascotas.find((m) => m.id === this.idEditando);
      if (mascota) {
        mascota.nombre = this.nombre.trim();
        mascota.especie = this.especie.trim();
        mascota.edad = this.edad;
        mascota.propietario = this.propietario.trim();
      }
    } else {
      // Modo crear: ID automático
      const nuevoId = this.mascotas.length
        ? Math.max(...this.mascotas.map((m) => m.id)) + 1
        : 1;

      this.mascotas.push({
        id: nuevoId,
        nombre: this.nombre.trim(),
        especie: this.especie.trim(),
        edad: this.edad,
        propietario: this.propietario.trim(),
      });
    }

    this.guardarEnStorage();
    this.limpiar();
  }

  editar(mascota: Mascota) {
    this.mensaje = '';
    this.idEditando = mascota.id;
    this.nombre = mascota.nombre;
    this.especie = mascota.especie;
    this.edad = mascota.edad;
    this.propietario = mascota.propietario;
  }

  cancelar() {
    this.mensaje = '';
    this.limpiar();
  }

  limpiar() {
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.idEditando = null;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }
}