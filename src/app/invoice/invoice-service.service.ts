import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InvoiceServiceService {
  baseURL: string = "http://localhost:4040/";

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any> {
    return this.http.get(this.baseURL + 'invoice/get/all')
  }

  getInvoiceDetails(id: number): Observable<any> {
    return this.http.get(this.baseURL + 'invoice/get/details/' + id)
  }

  deleteProduct(id_product: number, id_invoice: number): Observable<any> {
    return this.http.post(this.baseURL + 'invoice/remove/product', {
      "product_id": id_product,
      "invoice_id": id_invoice
    })
  }

  addInvoice(client:any, tax: any, methode: any): Observable<any> {
    console.log(methode);
    return this.http.post(this.baseURL + 'invoice/add', {
      "client": client,
      "tax": tax,
      "method": methode
    })
  }

  deleteInvoice(id: number){
    return this.http.delete(this.baseURL + 'invoice/delete/'+id)
  }

  productToInvoice(products: any[], id:any){
    return this.http.post(this.baseURL + 'invoice/add/products', {
      "products": products,
      "invioce_id": id
    })
  }
}
