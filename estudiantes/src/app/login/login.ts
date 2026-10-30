import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  mensaje = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'registro' && this.contrasena === 'alumnos123') {
      localStorage.setItem('sesionEstudiantes', 'true');
      this.router.navigate(['/estudiantes']);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}
