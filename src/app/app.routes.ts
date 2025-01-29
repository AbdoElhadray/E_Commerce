import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes =[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'',component:AuthComponent,children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent,title:'Login'},
        {path:'register',component:RegisterComponent,title:'Register'},
    ]},
    {path:'',component:MainComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Home'},
        {path:'products',component:ProductsComponent,title:'Products'},
        {path:'categories',component:CategoriesComponent,title:'Categories'},
        {path:'brands',component:BrandsComponent,title:'Brands'},
        {path:'cart',component:CartComponent,title:'Cart'},
        {path:'wishlist',component:WishlistComponent,title:'WishList'},
        {path:'product-details/:id',component:ProductDetailsComponent,title:'ProductDetails'},
        {path:'checkout/:id',component:CheckoutComponent,title:'CheckOut'},
        {path:'allorders',component:AllordersComponent,title:'All Orders'},
    ]},
    {path:'**',component:NotFoundComponent,title:'Error 404'}
];
