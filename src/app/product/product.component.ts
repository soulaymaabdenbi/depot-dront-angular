import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchValue = '';
  productForm: FormGroup;
  isEditMode: boolean = false;
  currentEditingProductId: number | null = null;

  @ViewChild('productModal') productModal: any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.getAllCategories();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      reference: ['', Validators.required], // Added reference field
      quantity: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const url = `http://localhost:8091/api/products`;
    this.http.get<Product[]>(url).subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...this.products];
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  getAllCategories() {
    const url = `http://localhost:8091/api/categories`;
    this.http.get<Category[]>(url).subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  openProductModal() {
    this.currentEditingProductId = null;
    this.isEditMode = false;
    this.productForm.reset();
    this.modalService.open(this.productModal);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditMode && this.currentEditingProductId) {
        this.updateProduct(formData, this.currentEditingProductId);
      } else {
        this.addProduct(formData);
      }
    } else {
      console.error('Form is not valid');
    }
  }

  addProduct(productData: any) {
    // Ensuring the productData has the correct structure
    const payload = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      reference: productData.reference, // Include if your backend expects this field
      quantity: productData.quantity,
      category: { id: productData.category } // Assuming category field is just the ID in your form
    };

    this.http.post('http://localhost:8091/api/products', payload).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchProducts();
      },
      error: (err) => console.error('Error adding product:', err)
    });
  }

  updateProduct(productData: any, productId: number) {
    // Ensuring the productData has the correct structure for the PUT request
    const payload = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      reference: productData.reference, // Include if your backend expects this field
      quantity: productData.quantity,
      category: { id: productData.category } // Assuming category field is just the ID in your form
    };

    this.http.put(`http://localhost:8091/api/products/${productId}`, payload).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchProducts();
      },
      error: (err) => console.error('Error updating product:', err)
    });
  }

  openEditModal(product: Product) {
    this.currentEditingProductId = product.id;
    this.isEditMode = true;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      reference: product.reference,
      quantity: product.quantity,
      category: product.category.id
    });
    this.modalService.open(this.productModal);
  }

  deleteProduct(productId: number) {
    this.http.delete(`http://localhost:8091/api/products/${productId}`).subscribe({
      next: () => this.fetchProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });
  }

  filterProducts(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue) ||
      product.reference.toLowerCase().includes(searchValue)
    );
  }
}

interface Product {
  id: number;
  name: string;
  description: string;
  reference: string;
  price: number;
  quantity: number;
  category: Category;
}

interface Category {
  id: number;
  name: string;
}
