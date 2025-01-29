import { Product } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent implements OnInit , OnDestroy {
    private readonly _ProductsService=inject(ProductsService);
    private readonly _CartService=inject(CartService);
    private readonly _ToastrService=inject(ToastrService);
    private readonly _WishlistService=inject(WishlistService);
    private readonly _CategoriesService=inject(CategoriesService);

  categorySub!:Subscription;
  productSub!:Subscription;
  wishlistSub!:Subscription;
  cartSub!:Subscription;
  productData!:Iproduct[];
  productDataPage2!:Iproduct[];
  wishListData!:Iproduct[]

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
  ngOnDestroy(){
    this.categorySub?.unsubscribe();
    this.productSub?.unsubscribe();
    this.wishlistSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }
}
