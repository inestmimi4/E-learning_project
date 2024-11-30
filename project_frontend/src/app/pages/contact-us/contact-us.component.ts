import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private route: ActivatedRoute){}
}
