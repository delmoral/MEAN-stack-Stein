import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';

declare var M: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addProduct(form?: NgForm){
    this.productService.postProduct(form.value)
    .subscribe(res =>{
      console.log(res);
      this.resetForm(form);
      M.toast({html:"saved"});
    });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.productService.selectedProduct = new Product();
  }
}
