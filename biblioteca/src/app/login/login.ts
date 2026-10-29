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
    if (this.usuario === 'bibliotecario' && this.contrasena === 'biblio123') {
      localStorage.setItem('sesionBiblioteca', 'true');
      this.router.navigate(['/libros']);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}
