import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService){}
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _CartService=inject(CartService);


  productId!:any;
  productDetails:Iproduct| null=null;
  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100:{
        items:5
      }
    },
    nav: true
  }
ngOnInit(){
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.productId=params.get('id');
      console.log(this.productId);
    }
  });
  

  this._ProductsService.getProductDetails(this.productId).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productDetails=res.data
    },error:(err)=>{
      console.log(err)
    }
})
 
};
addToCart(id:any){
  this._CartService.addItemToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._CartService.cartCount.next(res.numOfCartItems)
    },error:(err)=>{
      console.log(err)
    },complete:()=>{
      
    }
  })
  console.log('add to cart clicked');
}

}
