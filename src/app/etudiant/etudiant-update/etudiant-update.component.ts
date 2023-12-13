import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../Services/etudiant.service';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.css']
})
export class EtudiantUpdateComponent implements OnInit {
  id!: number;
  etudiantForm: FormGroup;

  
  constructor(
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.etudiantForm = this.formBuilder.group({
      nomEt: ['', [Validators.required, Validators.minLength(2)]], // Au moins 2 caractères
      prenomEt: ['', [Validators.required, Validators.minLength(2)]], // Au moins 2 caractères
      ecole: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]], // 8 chiffres
      dateNaissance: ['', [Validators.required, /* Ajoutez un validateur de date si nécessaire */]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.etudiantService.getEtudiantById(this.id).subscribe(data => {
      this.etudiantForm.patchValue(data); // Initialisez le formulaire avec les valeurs de l'étudiant
    }, error => console.log(error));
  }

  onSubmit() {
    console.log('Submit button clicked!');
    if (this.etudiantForm.valid) {
      const updatedEtudiant = { ...this.etudiantForm.value, idEtudiant: this.id };
      this.etudiantService.updateEtudiant(this.id, updatedEtudiant).subscribe(data => {
        this.goToEtudiantList();
      }, error => console.log(error));
    }
  }

  goToEtudiantList() {
    this.router.navigate(['/liste']);
  }
  
}
