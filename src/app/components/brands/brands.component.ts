import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy {
  private readonly _BrandService=inject(BrandService);
  brandsSub!:Subscription;
  BarndData:IBrands[]=[]
  BrandDetails:IBrands={} as IBrands;
  id:string|null='';

  click(event: any): void {
    this.id = event.target.dataset.id;
    this._BrandService.getBranddetails(this.id).subscribe({
      next: (res) => {
        this.BrandDetails = res.data;
      },
    });}
  ngOnInit(): void {
      this._BrandService.getAllBrands().subscribe({
        next:(res)=>{
          console.log(res)
          //this.barndData=res.data
          this.BarndData=res.data
        }
      })}

  ngOnDestroy(){
    this.brandsSub?.unsubscribe();
  }
 
}
