import { Component } from '@angular/core';
import {AiAssistantComponent} from "./pages/ai-assistant/ai-assistant.component";
import {HeaderComponent} from "./components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./components/footer/footer.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AiAssistantComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NgIf
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'elearning';
  isChatVisible = false;

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
