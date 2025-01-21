import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {AlertComponent} from "../../shared/alert/alert.component";


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    AlertComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      emailjs.sendForm('service_h0vxkyh', 'template_iquoj8i', '#contactForm', '2PGHd4fNYUTEl5To9')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.alertMessage = 'Email sent successfully';
          this.alertType = 'success';
        }, (error) => {
          console.error(error.text);
          this.alertMessage = 'Failed to send email';
          this.alertType = 'error';
        });
    }
  }
}
