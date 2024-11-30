import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
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

      // Call the backend API directly here
      this.http.get<any>(`http://localhost:3002/login?email=${email}&password=${password}`).subscribe(
        (response) => {
          // If login is successful, save user info to local storage
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Redirect user to dashboard or home page
          this.router.navigate(['']);  // Adjust the redirect URL
        },
        (error) => {
          // Handle error if login failed
          console.error('Login failed', error);
          alert('Invalid email or password');
        }
      );
    }
  }

  // Check if the field has been visited (touched or dirty)
  visited(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }
}
