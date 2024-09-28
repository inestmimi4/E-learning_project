import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  constructor() {
    const usernameRegExp: RegExp = new RegExp("^[a-zA-Z][a-zA-Z0-9]+[^ ]$");
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.required, Validators.pattern(usernameRegExp)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator()]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator()]),
    });
  }
  get name() {
    return this.registerForm.controls['name'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get username() {
    return this.registerForm.controls['username'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return value != this.password.value ? {notMatching: true} : null;
    };
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      console.log('value = ', value);
      let valid = new RegExp('[a-z]').test(value);
      valid = valid && new RegExp('[A-Z]').test(value);
      valid = valid && new RegExp('[\\W]').test(value);
      return !valid ? {wrongFormat: true} : null;
    };
  }
  submit() {
    console.log(this.username.errors);
  }
  visited(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }
}
