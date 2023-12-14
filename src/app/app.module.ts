import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ModifComponent } from './modif/modif.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { E404Component } from './e404/e404.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {AddInvoiceComponent} from "./invoice/add-invoice/add-invoice.component";
import {InvoiceDetailsComponent} from "./invoice/invoice-details/invoice-details.component";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    ModifComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponentComponent,
    E404Component,
    ProductComponent,
    CategoryComponent,
    InvoiceComponent,
    AddInvoiceComponent,
    InvoiceDetailsComponent,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
