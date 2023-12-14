import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceServiceService } from './invoice-service.service';

export interface PeriodicElement {
  name_client: string;
  surname_client: string;
  id: number;
  entreprise_name: string;
  creation_date: string;
  mode_payment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name_client: 'Hydrogen', entreprise_name: 'bacaha', creation_date: new Date().toString(), surname_client: 'hi', mode_payment: 'card' }
];

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'name_client', 'surname_client', 'entreprise_name', 'mode_payment', 'action'];
  dataSource: PeriodicElement[] = [];
  private dataArray: PeriodicElement[] = [];

  constructor(private invoiceService: InvoiceServiceService, private router: Router) { }

  ngAfterViewInit() {
    // You can initialize or manipulate the data source after the view is initialized.
  }

  ngOnInit(): void {
    this.getData();
  }

  clickEvent(ele: any) {
    this.router.navigate(['/invoice/details/' + ele]);
  }

  getData() {
    this.invoiceService.getInvoices().subscribe(
      (response: any) => {
        console.log('response received');
        console.log(response);
        response.invoices.forEach((data: any) => {
          console.log(data);
          this.dataArray.push({
            id: data.id,
            creation_date: data.creation_date,
            entreprise_name: data.entreprise_name,
            mode_payment: data.mode_payment,
            name_client: data.name_client,
            surname_client: data.surname_client
          });
        });
        console.log(this.dataArray);
        this.dataSource = this.dataArray;
      },
      (error) => {
        console.error('Request failed with error');
        console.log(error);
      }
    );
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe((data) => {
      console.log(data);
      if (data === 'Deleted successfully') {
        this.dataArray = [];
        this.getData();
      }
    });
  }
}
