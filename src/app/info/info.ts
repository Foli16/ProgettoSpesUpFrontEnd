import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {

  errorMessage: string | null = null;
  successMessage: string | null = null;
  passwordForm: FormGroup;
  usernameForm: FormGroup;

  constructor(public serv: AuthService, private fb: FormBuilder) {

    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()[\\]{};:/,._\\-+=<>?]).{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.usernameForm.invalid) {
      this.usernameForm.markAllAsTouched();
      return;
    }

    const username = this.usernameForm.get('username')?.value;
    this.serv.changeUsername(username);
  }

  onSubmitPassword() {
    if (this.passwordForm.invalid || !this.controllaPasswordUguali()) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const password = this.passwordForm.get('password')?.value;

    try {
      this.serv.changePassword(password);

      this.successMessage = 'Password cambiata con successo!';
      this.errorMessage = null;
      this.passwordForm.reset();

      setTimeout(() => (this.successMessage = null), 5000);
    } catch (error) {
      this.errorMessage = 'Errore durante il cambio password.';
      this.successMessage = null;
    }
  }


  controllaPasswordUguali(): boolean {
    const pass = this.passwordForm.get('password')?.value;
    const confirm = this.passwordForm.get('confirmPassword')?.value;
    return pass === confirm;
  }
}
