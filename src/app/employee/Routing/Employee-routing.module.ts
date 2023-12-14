import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from '../employee.component';
import { AddEmployeeComponent } from '../AddEmployee/add-employee/add-employee.component';
import { ModifEmployeeComponent } from '../ModifEmployee/modif-employee/modif-employee.component';
import { LayoutComponentComponent } from 'src/app/layout-component/layout-component.component';

const routes: Routes = [
    {
      path: 'listeEmployee',
      component: LayoutComponentComponent,
      children: [
        { path: '', component: EmployeeComponent },
        { path: 'update/:id', component: ModifEmployeeComponent },
        { path: 'create', component: AddEmployeeComponent },
      ],
    },
    { path: '', redirectTo: '/listeEmployee', pathMatch: 'full' },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EmployeeRoutingModule {}