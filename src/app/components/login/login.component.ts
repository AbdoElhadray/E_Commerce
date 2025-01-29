import { Subscription } from 'rxjs';
import { AuthService } from './../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loginSub !:Subscription
/*   constructor(private _AuthService:AuthService){}
 */   loading:boolean=false   
      resText!:string
      intervalId:any;
/*    loginForm :FormGroup= new FormGroup( {
      email :new FormControl(null,[Validators.required,Validators.email]),
      password :new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    }
   ) */
  constructor( private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router){}
  
  loginForm :FormGroup = this._FormBuilder.group({
    email :new FormControl(null,[Validators.required,Validators.email]),
    password :new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })
   loginUser():void{
    if(this.loginForm.valid){
      console.log(this.loginForm);
      this.loading = true
      this.loginSub=  this._AuthService.loginUser(this.loginForm.value).subscribe({
          next:(res)=>{
            console.log(res)
            this.resText=res.message
            this.loading=false
            /* Hold */
            sessionStorage.setItem('token',res.token)
            /* decoded */
            this._AuthService.saveDecodedUser()
            this.intervalId= setInterval(()=>{
              this._Router.navigate(['/home'])
            }, 2000 )
          },
/*           error: (error)=>{
            console.log(error.error.message)
            this.resText=error.error.message
            this.loading=false
          }, */
          complete:()=>{}
        })
    }else{
      this.loginForm.markAllAsTouched()
    }
   }
   ngOnDestroy(): void {
    clearInterval(this.intervalId);
     this.loginSub?.unsubscribe()
   }


}
