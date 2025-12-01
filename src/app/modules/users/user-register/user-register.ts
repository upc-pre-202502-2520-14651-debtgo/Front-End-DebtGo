import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';
  role: 'ENTREPRENEUR' | 'CONSULTANT' = 'ENTREPRENEUR';

  message = '';

  showPassword = false;
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  constructor(private userService: UserService, private router: Router) { }

  validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = regex.test(this.email)
      ? ''
      : '⚠️ Ingresa un email válido';
  }

  validatePassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    this.passwordError = regex.test(this.password)
      ? ''
      : '⚠️ La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número';
  }

  validateConfirmPassword() {
    this.confirmPasswordError =
      this.password === this.confirmPassword
        ? ''
        : '⚠️ Las contraseñas no coinciden';
  }

  isFormValid(): boolean {
    return (
      this.email !== '' &&
      this.password !== '' &&
      this.confirmPassword !== '' &&
      !this.emailError &&
      !this.passwordError &&
      !this.confirmPasswordError
    );
  }

  register() {
    if (!this.isFormValid()) {
      this.message = '⚠️ Completa correctamente todos los campos antes de continuar';
      return;
    }

    const request = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.userService.registerUser(request).subscribe({
      next: (response) => {
        const userData = {
          id: response.id,
          email: response.email,
          role: response.role
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        if (response.role === 'ENTREPRENEUR') {
          this.router.navigate(['/home']);
        } else if (response.role === 'CONSULTANT') {
          this.router.navigate(['/consultant/home']);
        }
      },
      error: () => {
        this.message = '❌ Error al registrar usuario';
      }
    });
  }
}