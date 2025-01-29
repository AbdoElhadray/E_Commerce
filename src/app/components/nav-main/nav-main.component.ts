import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit , OnDestroy{
  cartCounter !:number
  subId !:Subscription
  wishCounter !:number
  subWishlist !:Subscription

  private readonly _CartService=inject(CartService)
  private readonly _WishlistService=inject(WishlistService)
  constructor(private _Router:Router){}
  ngOnInit(){
    
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartCounter= res.numOfCartItems
      }
    })
    this.subId=this._CartService.cartCount.subscribe({
      next:(value)=>{
        console.log(value);
        this.cartCounter=value
        
      }
    })
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishCounter=res.data.length
      },error:(err)=>{
        console.log(err)
      } })
    this.subWishlist= this._WishlistService.wishlistCount.subscribe({
      next:(value)=>{
        this.wishCounter=value
      }
    })

  }
  logout():void{
    sessionStorage.removeItem('token')
      this._Router.navigate(['/login'])
  }
  ngOnDestroy(): void {
    this.subId?.unsubscribe()
    this.subWishlist?.unsubscribe()
  }
}
