import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {MainComponent} from "./components/main/main.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductPageComponent, MainComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
