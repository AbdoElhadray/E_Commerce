import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './../../components/categories/categories.component';
import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { HomeComponent } from "../../components/home/home.component";
import { ProductsComponent } from "../../components/products/products.component";
import { BrandsComponent } from "../../components/brands/brands.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavMainComponent,RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
