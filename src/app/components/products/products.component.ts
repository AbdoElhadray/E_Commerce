import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { forkJoin, Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe,CarouselModule ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _WishlistService=inject(WishlistService);
  
  productSub!:Subscription;
  productData!:Iproduct[];
  productDataPage2!:Iproduct[];
  wishListData!:Iproduct[]
  wishListsub !:Subscription
  searchInputValue:string=" "



  addFav(productId: string): void {
    this._WishlistService.addItemToWishlist(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.wishlistCount.next(response.data.length);
      },
/*       error: (error) => {
        console.log(error);
      }, */
    });
  }

  removeFav(productId: string): void {
    this._WishlistService.removeItemFromWishlist(productId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishListData = res.data;
        this._WishlistService.wishlistCount.next(res.data.length);
      },
/*       error: (error) => {
        console.log(error);
      }, */
    });
  }

  ngOnInit(){
    this.productSub=  this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
/*         this._NgxSpinnerService.hide()
*/        console.log(res.data.slice(0,20));
      this.productData =res.data.slice(0,20)
      
    },
/*     error:(err)=>{console.log(err);
    } */
  })
  this._WishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.wishListData = res.data

    },
/*       error:(err)=>{console.log(err)} */
  })
  }


  addCartItem(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems);
        this._WishlistService.wishlistCount.next(res.numOfCartItems);
        console.log(this._CartService.cartCount);
        this._ToastrService.info(res.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})
      }
        ,
/*       error:(err)=>{
        console.log(err)
        this._ToastrService.error(err.message,'Fresh Cart', {timeOut:1000 ,closeButton:true})
      } */
    })
  }
  addToCart(id:any){
    this._CartService.addItemToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems)
        // console.log(res.numOfCartItems)
        this._ToastrService.success(res.message,'Fresh Cart',{closeButton:true})
      },/* 
      error:(err)=>{
        console.log(err);
        this._ToastrService.warning(err.message,'Fresh Cart',{closeButton:true})

      } */
      complete:()=>{
        
      }
    })
  }

  ngOnDestroy() : void{
    this.productSub?.unsubscribe()
    this.wishListsub?.unsubscribe()
   }
}
