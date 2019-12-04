import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SinginComponent } from './components/singin/singin.component';


const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full'},
  { path: 'lista', component: ProductsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'singin', component: SinginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
