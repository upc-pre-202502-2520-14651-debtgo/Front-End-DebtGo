import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';
import { RegisterResponse } from '../user-models/user.model';

@Component({
  selector: 'app-user-register',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  role = 'ENTREPRENEUR';
  message = '';

  showPassword: boolean = false;
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

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

  validateConfirmPassword() {
    this.confirmPasswordError =
      this.password === this.confirmPassword ? '' : '⚠️ Las contraseñas no coinciden';
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
      name: this.email.split('@')[0],
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.userService.registerUser(request).subscribe({
      next: (response) => {

        const name = this.email.split('@')[0];

        const userData = {
          id: response.id,
          name: name,
          email: response.email,
          role: response.role
        };

        // Guardar usuario
        localStorage.setItem('currentUser', JSON.stringify(userData));


        if (response.role === 'ENTREPRENEUR') {
          this.router.navigate(['/home']);
        } else if (response.role === 'CONSULTANT') {
          this.router.navigate(['/payment-plan']);
        }
      },
      error: () => {
        this.message = '❌ Error al registrar usuario';
      }
    });
  }
}