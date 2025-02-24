import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";
import { CourseSearchComponent } from './pages/coursesearch/coursesearch.component';



export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        title: 'Home',
    },
    {
        path: 'login',
        component: LoginPageComponent,
        title: 'Login',
    },
    {
        path: 'register',
        component: RegisterPageComponent,
        title: 'Register',
    },
    {
        path: 'cart',
        component: CartPageComponent,
        title: 'Cart',
    },
    {
        path: 'product/:id',
        component: ProductPageComponent,
        title: 'Course Deetails'
    },

  { path: 'contact', component: ContactUsComponent, title: 'contact' },
  {path:'search',component:CourseSearchComponent,title:'Search'},
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Not Found',
  }
];
