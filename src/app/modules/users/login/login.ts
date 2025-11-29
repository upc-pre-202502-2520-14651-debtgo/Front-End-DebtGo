import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  message = '';

  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  // -----------------------
  // VALIDACIONES
  // -----------------------

  validateEmail() {
    if (!this.email) {
      this.emailError = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.emailError = 'Correo inválido';
    } else {
      this.emailError = null;
    }
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria';
    } else if (this.password.length < 6) {
      this.passwordError = 'Debe tener mínimo 6 caracteres';
    } else {
      this.passwordError = null;
    }
  }

  isFormValid() {
    return (
      this.email !== '' &&
      this.password !== '' &&
      !this.emailError &&
      !this.passwordError
    );
  }

  // -----------------------
  // LOGIN
  // -----------------------

  login() {
    if (!this.isFormValid()) return;

    this.userService.loginUser({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {

        if (!response.success || !response.user) {
          this.message = '❌ ' + response.message;
          return;
        }

        // Normalizar rol
        let role = (response.user.role ?? '').toUpperCase().trim();

        // Mapeo de roles del backend hacia roles del frontend
        if (role === 'BUYER') role = 'ENTREPRENEUR';
        if (role === 'ADVISOR') role = 'CONSULTANT';

        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role
        };

        this.auth.setUser(userData);

        // Navegación por rol
        if (role === 'ENTREPRENEUR') {
          this.router.navigate(['/home']);
        }
        else if (role === 'CONSULTANT') {
          this.router.navigate(['/consultant/dashboard']);
        }
        else {
          this.message = '❌ Rol no permitido: ' + role;
          this.auth.clearUser();
        }

      },
      error: () => {
        this.message = '❌ Error al iniciar sesión';
      }
    });
  }
}