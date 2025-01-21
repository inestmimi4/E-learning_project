import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  get alertClass() {
    return this.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  }
}
