import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

interface Supplier {
  id: number;
  name: string;
  location: string;
  email: string;
}

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  supplierForm: FormGroup;
  isEditMode: boolean = false;
  currentEditingSupplierId: number | null = null;

  @ViewChild('supplierModal') supplierModal: any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchSuppliers();
  }

  fetchSuppliers() {
    const url = `http://localhost:8089/api/supplier`; // Change the URL to your supplier endpoint
    this.http.get<Supplier[]>(url).subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = [...this.suppliers];
      },
      error: (err) => console.error('Error fetching suppliers:', err)
    });
  }

  openSupplierModal(supplier?: Supplier) {
    this.currentEditingSupplierId = supplier?.id || null;
    this.isEditMode = !!supplier;
    this.supplierForm.reset();
    if (supplier) {
      this.supplierForm.patchValue({
        name: supplier.name,
        location: supplier.location,
        email: supplier.email
      });
    }
    this.modalService.open(this.supplierModal);
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      const formData = this.supplierForm.value;
      if (this.isEditMode && this.currentEditingSupplierId) {
        this.updateSupplier(formData, this.currentEditingSupplierId);
      } else {
        this.addSupplier(formData);
      }
    } else {
      console.error('Form is not valid');
    }
  }

  addSupplier(supplierData: any) {
    this.http.post('http://localhost:8089/api/supplier/add', supplierData).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchSuppliers();
      },
      error: (err) => console.error('Error adding supplier:', err)
    });
  }

  updateSupplier(supplierData: any, supplierId: number) {
    this.http.put(`http://localhost:8089/api/supplier/update/${supplierId}`, supplierData).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchSuppliers();
      },
      error: (err) => console.error('Error updating supplier:', err)
    });
  }

  deleteSupplier(supplierId: number) {
    this.http.delete(`http://localhost:8089/api/supplier/${supplierId}`).subscribe({
      next: () => this.fetchSuppliers(),
      error: (err) => console.error('Error deleting supplier:', err)
    });
  }

  filterSuppliers(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredSuppliers = this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchValue) ||
      supplier.location.toLowerCase().includes(searchValue) ||
      supplier.email.toLowerCase().includes(searchValue)
    );
  }
}
