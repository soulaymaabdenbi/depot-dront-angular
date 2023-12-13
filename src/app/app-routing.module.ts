import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { AjoutComponent } from './ajout/ajout.component';
import { ModifComponent } from './modif/modif.component';
import { UniversiteRoutingModule } from './Universite/Components/Routing/Universite-routing.module';
import { EtudiantRoutingModule } from './etudiant/etudiant/etudiant-routing.module';
import { E404Component } from './e404/e404.component';
import {ChambreComponent} from "./chambre/chambre.component";
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Table', component: TableComponent },
  { path: 'Ajouter', component: AjoutComponent },
  {path: 'products', component: ProductComponent},
  {path: 'categories', component: CategoryComponent},
  { path: 'Modifier', component: ModifComponent },
  { path: 'etudiants', loadChildren: () => import('./etudiant/etudiant/etudiant.module').then(m => m.EtudiantModule) },
  { path: 'universites', loadChildren: () => import('./Universite/Components/Routing/universite.module').then(m => m.UniversiteModule) },
  { path: '**', component: E404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), EtudiantRoutingModule, UniversiteRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
