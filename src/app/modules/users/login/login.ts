import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  message: string = '';
  emailError: string = '';
  passwordError: string = '';


  constructor(private userService: UserService, private router: Router) { }

  validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = regex.test(this.email) ? '' : '⚠️ Ingresa un email válido';
  }

  validatePassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    this.passwordError = regex.test(this.password)
      ? ''
      : '⚠️ La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número';
  }

  login() {
    this.userService.loginUser({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {

          if (response.success && response.user) {

            const userData = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));

            // Redirección por rol
            if (response.user.role === 'ENTREPRENEUR') {
              this.router.navigate(['/home']);
            } else if (response.user.role === 'CONSULTANT') {
              this.router.navigate(['/consultant-dashboard']);
            }

          } else {
            this.message = '❌ ' + response.message;
          }
        },
        error: () => {
          this.message = '❌ Error al iniciar sesión';
        }
      });
  }

  isFormValid(): boolean {
    return this.email !== '' &&
      this.password !== '' &&
      !this.emailError &&
      !this.passwordError &&
      this.rememberMe;
  }
}