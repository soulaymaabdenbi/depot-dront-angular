import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from '../employee.component';
import { AddEmployeeComponent } from '../AddEmployee/add-employee/add-employee.component';
import { ModifEmployeeComponent } from '../ModifEmployee/modif-employee/modif-employee.component';
import { LayoutComponentComponent } from 'src/app/layout-component/layout-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './Employee-routing.module';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [ 
    EmployeeComponent,
    AddEmployeeComponent,
    ModifEmployeeComponent,
    LayoutComponentComponent,
  ],
  imports: [
    AppModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,

  ]
})
export class EmployeeModule { }
