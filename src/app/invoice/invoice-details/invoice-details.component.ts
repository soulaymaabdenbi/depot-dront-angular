import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceServiceService } from '../invoice-service.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceServiceService) { }
  no: number = 0;
  tax: number = 0;
  total_price: any = 0;
  total_price_taxed: any = 0;
  name: string = '';
  surName: string = '';
  company: string = '';
  payment: string = '';
  _id: string = '';
  date: string = "";
  displayedColumns: string[] = ['product_id', 'name', 'category_name', 'price', 'quantity', 'total_price', 'action'];
  dataSource: any[] = [];
  private dataArray: any[] = [];
  product: string = '';
  quant: number = 0;
  products: any[] = [{
    "id": 12,
    "name": "Sfinaria",
    "description": "chay",
    "price": 400,
    "ref": "29",
    "category_name": "food"
  },
    {
      "id": 50,
      "name": "sala9",
      "description": "chay",
      "price": 1500,
      "ref": "30",
      "category_name": "food"
    },
    {
      "id": 51,
      "name": "Kromb",
      "description": "chay",
      "price": 300,
      "ref": "33",
      "category_name": "food"
    },
    {
      "id": 33,
      "name": "Lo7",
      "description": "chay",
      "price": 800,
      "ref": "29",
      "category_name": "object"
    },
    {
      "id": 80,
      "name": "Ma3dnous",
      "description": "chay",
      "price": 100,
      "ref": "51",
      "category_name": "food"
    }
  ];

  ngOnInit(): void {
    this.no = +this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceDetails(this.no).subscribe((response: any) => {
        this.no = response.invoice.details.id;
        this.name = response.invoice.details.name_client;
        this.surName = response.invoice.details.surname_client;
        this.company = response.invoice.details.entreprise_name;
        this.payment = response.invoice.details.mode_payment;
        this.tax = response.invoice.details.tax;
        this._id = response.invoice.details._id;
        this.date = response.invoice.details.creation_date;

        response.invoice.productList.forEach((data: any) => {
          console.log(data);
          this.total_price += data.product.price * data.quantity;
          this.total_price_taxed = this.total_price + (this.total_price * response.invoice.details.tax) / 100;
          this.dataArray.push({
            id: data.product_id,
            name: data.product.name,
            category_name: data.product.category_name,
            price: data.product.price,
            total_price: data.product.price * data.quantity,
            quantity: data.quantity
          });
        });
        console.log(this.dataArray);
        this.dataSource = this.dataArray;
      },
      (error) => {
        console.error('Request failed with error');
        console.log(error);
      },
      () => {
        console.error('Request completed');
      });
  }

  deleteProductFromInvoice(product_id: number) {
    this.invoiceService.deleteProduct(product_id, this.no).subscribe((data) => {
      console.log(data);
      if (data.message === "remove data successfully") {
        console.log('here');
        this.dataArray = this.dataArray.filter((ele) => ele.id !== product_id);
        console.log(this.dataArray);
        this.dataSource = this.dataArray;
      }
    });
  }

  addProductToInvoice() {
    let arrayob: any[] = this.products.filter((data) => data.name == this.product);
    arrayob[0]['quantity'] = +this.quant;
    this.invoiceService.productToInvoice(arrayob, this.no).subscribe((data) => {
      this.invoiceService.getInvoiceDetails(this.no).subscribe((response: any) => {
          this.no = response.invoice.details.id;
          this.name = response.invoice.details.name_client;
          this.surName = response.invoice.details.surname_client;
          this.company = response.invoice.details.entreprise_name;
          this.payment = response.invoice.details.mode_payment;
          this.tax = response.invoice.details.tax;
          this._id = response.invoice.details._id;
          this.date = response.invoice.details.creation_date;
          this.dataArray = [];
          response.invoice.productList.forEach((data: any) => {
            console.log(data);
            this.total_price += data.product.price * data.quantity;
            this.total_price_taxed = this.total_price + (this.total_price * response.invoice.details.tax) / 100;
            this.dataArray.push({
              id: data.product_id,
              name: data.product.name,
              category_name: data.product.category_name,
              price: data.product.price,
              total_price: data.product.price * data.quantity,
              quantity: data.quantity
            });
          });
          this.dataSource = this.dataArray;
        },
        (error) => {
          console.error('Request failed with error');
          console.log(error);
        },
        () => {
          console.error('Request completed');
        });
    });
  }


}
