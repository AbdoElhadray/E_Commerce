import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';
import { Iproduct, Subcategory } from '../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit , OnDestroy {
  constructor(private _CategoriesService:CategoriesService){}
   categoryData:ICategory[]=[];
   subcatogeryData:ICategory[]=[];
   categorySub!:Subscription;
  cat_id:string|null='';
CategorSpecific(): void{
  this._CategoriesService.specificCategory(this.cat_id).subscribe({
    next:(res)=>{
      console.log(res.data)
      this.subcatogeryData=res.data
    }
  })
}

ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categoryData=res.data
      }
    })
}
ngOnDestroy(){
  this.categorySub?.unsubscribe();
}
}

