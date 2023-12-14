import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {E404Component} from './e404/e404.component';
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {InvoiceDetailsComponent} from "./invoice/invoice-details/invoice-details.component";
import {AddInvoiceComponent} from "./invoice/add-invoice/add-invoice.component";
import { EmployeeRoutingModule } from './employee/Routing/Employee-routing.module';
import { FournisseurComponent } from './Fournisseur/fournisseur/fournisseur.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'Login', component: LoginComponent},
  { path: 'employees', loadChildren: () => import('./employee/Routing/employee.module').then(m => m.EmployeeModule) },
  {path: 'products', component: ProductComponent},
  {path: 'categories', component: CategoryComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'invoice/details/:id', component: InvoiceDetailsComponent},
  { path: 'invoice/add', component: AddInvoiceComponent},
  { path: 'fournisseurs', component: FournisseurComponent },

  {path: '**', component: E404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
