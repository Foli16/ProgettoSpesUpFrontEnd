import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  miaForm: FormGroup;

  constructor(private fb: FormBuilder, private serv: AuthService) {
    this.miaForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()[\\]{};:/,._\\-+=<>?]).{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  controllaPasswordUguali(): boolean {
    const pass = this.miaForm.get('password')?.value;
    const confirm = this.miaForm.get('confirmPassword')?.value;
    return pass === confirm;
  }

  registra() {
    if (this.miaForm.valid && this.controllaPasswordUguali()) {
      const valori = this.miaForm.value;
      this.serv.registration(valori.username, valori.password, valori.email);
    } else {
      this.miaForm.markAllAsTouched();
    }
  }
}
