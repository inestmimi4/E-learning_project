import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';


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
        title: 'Product Deetails'
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Not Found',
    }
];
