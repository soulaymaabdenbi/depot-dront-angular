import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer, SafeHtml, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-chambre',
    templateUrl: './chambre.component.html',
    styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {

    rows: Chambre[] = [];
    filteredRows: Chambre[] = [];

    blocs: Bloc[] = [];
    searchValue = '';
    ColumnMode = {force: 'force'};

    @ViewChild('addCertificateModal') addCertificateModal: any;
    certificateForm: FormGroup;
    isEditMode: boolean = false;
    currentEditingId: null | undefined;
    showModal = false;
    modalVirtualTourURL: SafeResourceUrl | undefined;
    visualViewport: boolean =  false;
    visualUrl: SafeHtml | undefined;
    constructor(private http: HttpClient, private modalService: NgbModal, private fb: FormBuilder,
                private sanitizer: DomSanitizer) {
        this.getAllBlocs();

        this.certificateForm = this.fb.group({
            numeroChambre: ['', Validators.required],
            type: ['', Validators.required],
            virtualTourURL: ['', Validators.required],
            bloc: ['', Validators.required],
        })
        console.log("hello from constructor")
    }


    ngOnInit(): void {
        console.log("hello from ng on init")
        this.fetchData();
    }

    fetchData() {
        const url = `http://localhost:8081/PremierProjetTest/api/chambres`;
        this.http.get<any>(url).subscribe({
            next: (response) => {
                this.rows = response;
                this.filteredRows = [...this.rows];
                console.log(response);
            },
            error: (err) => console.error(err),
        });
    }

    getAllBlocs() {
        const url = `http://localhost:8081/PremierProjetTest/api/blocs`;
        this.http.get<any>(url).subscribe({
            next: (response) => {
                this.blocs = response;
                console.log("blocs");
                console.log(response);
            },
            error: (err) => console.error(err),
        });
    }


    openAddCertificateModal() {
        this.visualViewport = false;
        this.currentEditingId = null;
        this.isEditMode = false;
        this.certificateForm.reset();
        this.modalService.open(this.addCertificateModal, {ariaLabelledBy: 'modal-basic-title'});
    }

    // @ts-ignore
    onSubmit(modal) {
        if (this.certificateForm.valid) {
            const formData = {
                numeroChambre: this.certificateForm.value.numeroChambre,
                type: this.certificateForm.value.type,
                virtualTourURL: this.certificateForm.value.virtualTourURL,
                bloc: {
                    idBloc: this.certificateForm.value.bloc
                }
            };
            console.log("formData");
            console.log(formData);
            if (this.isEditMode) {
                const updateUrl = `http://localhost:8081/PremierProjetTest/api/chambres/${this.currentEditingId}`;
                this.http.put(updateUrl, formData).subscribe({
                    next: (response) => {
                        console.log('Formation mise à jour :', response);
                        modal.close();
                        this.fetchData();
                    },
                    error: (error) => {
                        console.error('Error updating certificate:', error);

                    }
                });
            } else {
                this.http.post('http://localhost:8081/PremierProjetTest/api/chambres', formData).subscribe({
                    next: (response) => {
                        console.log('Certificate added:', response);
                        modal.close();
                        this.fetchData();
                    },
                    error: (error) => {
                        console.error('Error adding certificate:', error);
                    }
                });

            }

        } else {
            // Handle form validation error
            console.error('Form is not valid');
        }
    }

    openEditModal(rowData: any, b: boolean) {
        this.visualViewport = b;
        this.visualUrl = this.sanitizer.bypassSecurityTrustHtml(rowData.virtualTourURL);
        console.log("visualViewport");
        console.log(this.visualViewport);
        console.log("row");
        console.log(rowData);
        this.currentEditingId = rowData.idChambre;
        this.isEditMode = true;
        this.certificateForm.patchValue({
            numeroChambre: rowData.numeroChambre,
            type: rowData.type,
            virtualTourURL: rowData.virtualTourURL,
            bloc: rowData.bloc.idBloc
        });
        this.modalService.open(this.addCertificateModal);
    }

    deleteFormation(row: any) {
        const chambre_id = row.idChambre;
        const url = `http://localhost:8081/PremierProjetTest/api/chambres/${chambre_id}`;
        this.http.delete(url).subscribe({
            next: (response) => {
                console.log('Certificate deleted:', response);
                this.fetchData();

            },
            error: (error) => {
                console.error('Error adding certificate:', error);
                ;

            }
        });
    }

    filterUpdate(event: any) {
        const searchValue = event.target.value.toLowerCase();
        console.log(searchValue);

        if (this.searchValue) {
            this.filteredRows = this.rows.filter((row) =>
                row.numeroChambre.toString().includes(searchValue.toLowerCase()) ||
                row.type.toLowerCase().includes(searchValue.toLowerCase())
            );
        } else {

            this.filteredRows = [...this.rows];
        }
    }

    openVirtualTourModal() {
        this.visualViewport = true;
    }

    closeModal() {
        this.showModal = false;
    }


}

export interface Chambre {
    idChambre: number;
    numeroChambre: string;
    type: string;
    virtualTourURL: string;
    bloc: Bloc;
}

export interface Bloc {
    idBloc: number;
    nomBloc: string;
    capaciteBloc: number;
    foyer: any;
}
