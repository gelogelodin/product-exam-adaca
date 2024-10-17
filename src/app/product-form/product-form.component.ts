import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId = id ? +id : null;
      if (this.productId) {
        const product = this.productService.getProductById(this.productId);
        if (product) {
          this.productForm.patchValue(product);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.productId ?? 0,
        ...this.productForm.value
      };

      if (this.productId) {
        this.productService.updateProduct(product);
        this.router.navigate(['/products']);
      } else {
        this.productService.addProduct(product);
        this.router.navigate(['/products']);
      }
    }
  }
}
