import { url } from 'inspector';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _PaymentService=inject(PaymentService)

  cartId !:string |null
  shippingAddress:FormGroup = this._FormBuilder.group({
    details:[null],
    phone:[null],
    city:[null]
  })
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('cart_id')
      }
    })
  }
  payOrder():void{
    console.log(this.shippingAddress.value);
    this._PaymentService.checkoutSession(this.cartId,this.shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res.session.url);
        window.open(res.session.ur, '_self')
        
      }
    })
    
  }

}
