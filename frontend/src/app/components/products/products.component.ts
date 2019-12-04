import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product';

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
    this.getProducts();
  }

  addProduct(form?: NgForm){
    if(form.value._id){
      this.productService.putProduct(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getProducts();
        M.toast({html: 'Producto editado'});
      })
    } else{
      this.productService.postProduct(form.value)
      .subscribe(res =>{
        this.resetForm(form);
        this.getProducts();
        M.toast({html:"Producto añadido"});
      });
    }
    
  }

  getProducts(){
    this.productService.getProducts().subscribe(res =>{
      this.productService.productsList = res as Product[];
    })
  }

  editProduct(product: Product){
    this.productService.selectedProduct = product;
  }

  deleteProduct(_id: string){
    if(confirm('¿Borrar?')){
      this.productService.deleteProduct(_id).subscribe(res =>{
        this.getProducts();
        M.toast({html: 'Borrado'});
      })
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.productService.selectedProduct = new Product();
  }


}
