import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent }
];

@NgModule({
  declarations:[
    ProductFormComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
})

export class AppRoutes { }