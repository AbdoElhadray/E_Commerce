import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsComponent } from '../products/products.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,FormsModule,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _ToastrService=inject(ToastrService);
  
  categoriesData !:ICategory[]
  catSub !:Subscription 

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      },
      1100: {
        items: 6
      }
    },
    nav: false
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  
  ngOnInit() : void{
    this.catSub=  this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesData =res.data
      },
    })


  }
  ngOnDestroy() : void{
   this.catSub?.unsubscribe()
  }
}
