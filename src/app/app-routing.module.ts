import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { E404Component } from './e404/e404.component';
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Login', component: LoginComponent },
  {path: 'products', component: ProductComponent},
  {path: 'categories', component: CategoryComponent},
   { path: '**', component: E404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
