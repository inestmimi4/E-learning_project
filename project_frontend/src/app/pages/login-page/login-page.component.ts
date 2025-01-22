import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  ngOnInit() {
    this.loginService.loginStatus.subscribe((status: boolean) => {
      if (status) {
        this.router.navigate(['']);
      }
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
  submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Form submitted:', email, password);

      this.loginService.login(email, password).subscribe(
        (response: any) => {
          console.log('Login response:', response);
          const user = {
            userId: response.userId,
            name: response.name,
            email: response.email,
            username: response.username
          };
          this.router.navigate(['']);  // Adjust the redirect URL
        },
        (error: any) => {
          console.error('Login failed', error);
          alert('Invalid email or password');
        }
      );
    }
  }

  visited(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }
}
