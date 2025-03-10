import { RegisterComponent } from './../../components/register/register.component';
import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";
import { NavAuthComponent } from '../../components/nav-auth/nav-auth.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NavAuthComponent,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
