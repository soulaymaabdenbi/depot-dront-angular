import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];

  searchValue = '';
  clientForm: FormGroup;
  isEditMode: boolean = false;
  currentEditingClientId: number | null = null;

  @ViewChild('clientModal') clientModal: any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', Validators.required],
      entreprise: ['', Validators.required],
      dob: ['', Validators.required],
      tel: ['', Validators.required],
      postcard: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    const url = `http://localhost:8091/api/clients`;
    this.http.get<Client[]>(url).subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = [...this.clients];
      },
      error: (err) => console.error('Error fetching clients:', err)
    });
  }

  openClientModal() {
    this.currentEditingClientId = null;
    this.isEditMode = false;
    this.clientForm.reset();
    this.modalService.open(this.clientModal);
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;
      if (this.isEditMode && this.currentEditingClientId) {
        this.updateClient(formData, this.currentEditingClientId);
      } else {
        this.addClient(formData);
      }
    } else {
      console.error('Form is not valid');
    }
  }

  addClient(clientData: any) {
    const payload = {
      name: clientData.name,
      surname: clientData.surname,
      sex: clientData.sex,
      location: clientData.location,
      email: clientData.email,
      entreprise: clientData.entreprise,
      dob: clientData.dob,
      tel: clientData.tel,
      postcard: clientData.postcard
    };

    this.http.post('http://localhost:8091/api/clients', payload).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchClients();
      },
      error: (err) => console.error('Error adding client:', err)
    });
  }

  updateClient(clientData: any, clientId: number) {
    const payload = {
      name: clientData.name,
      surname: clientData.surname,
      sex: clientData.sex,
      location: clientData.location,
      email: clientData.email,
      entreprise: clientData.entreprise,
      dob: clientData.dob,
      tel: clientData.tel,
      postcard: clientData.postcard
    };

    this.http.put(`http://localhost:8091/api/clients/${clientId}`, payload).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.fetchClients();
      },
      error: (err) => console.error('Error updating client:', err)
    });
  }

  openEditModal(client: Client) {
    this.currentEditingClientId = client.id;
    this.isEditMode = true;
    this.clientForm.patchValue({
      name: client.name,
      surname: client.surname,
      sex: client.sex,
      location: client.location,
      email: client.email,
      entreprise: client.entreprise,
      dob: client.dob,
      tel: client.tel,
      postcard: client.postcard
    });
    this.modalService.open(this.clientModal);
  }

  deleteClient(clientId: number) {
    this.http.delete(`http://localhost:8091/api/clients/${clientId}`).subscribe({
      next: () => this.fetchClients(),
      error: (err) => console.error('Error deleting client:', err)
    });
  }

  filterClients(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(searchValue) ||
      client.location.toLowerCase().includes(searchValue)
    );
  }
}

interface Client {
  id: number;
  name: string;
  surname: string;
  sex: string;
  location: string;
  email: string;
  entreprise: string;
  dob: string;
  tel: string;
  postcard: string;
}

