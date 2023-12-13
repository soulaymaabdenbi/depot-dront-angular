import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

interface Category {
  id: number;
  name: string;
  reference: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  currentEditingCategoryId: number | null = null;

  @ViewChild('categoryModal') categoryModal: any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    const url = `http://localhost:8091/api/categories`;
    this.http.get<Category[]>(url).subscribe({
      next: (categories) => {
        this.categories = categories;
        this.filteredCategories = [...this.categories];
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  openCategoryModal(category?: Category) {
    this.currentEditingCategoryId = category?.id || null;
    this.isEditMode = !!category;
    this.categoryForm.reset();
    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        reference: category.reference
      });
    }
    this.modalService.open(this.categoryModal);
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      if (this.isEditMode && this.currentEditingCategoryId) {
        this.updateCategory(formData, this.currentEditingCategoryId);
      } else {
        this.addCategory(formData);
      }
    } else {
      console.error('Form is not valid');
    }
  }

  addCategory(categoryData: any) {
    this.http.post('http://localhost:8091/api/categories', categoryData).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchCategories();
      },
      error: (err) => console.error('Error adding category:', err)
    });
  }

  updateCategory(categoryData: any, categoryId: number) {
    this.http.put(`http://localhost:8091/api/categories/${categoryId}`, categoryData).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchCategories();
      },
      error: (err) => console.error('Error updating category:', err)
    });
  }

  deleteCategory(categoryId: number) {
    this.http.delete(`http://localhost:8091/api/categories/${categoryId}`).subscribe({
      next: () => this.fetchCategories(),
      error: (err) => console.error('Error deleting category:', err)
    });
  }

  filterCategories(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(searchValue) ||
      category.reference.toLowerCase().includes(searchValue)
    );
  }
}
