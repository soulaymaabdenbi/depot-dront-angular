import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceEmployeeService } from '../../Service/service-employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-modif-employee',
  templateUrl: './modif-employee.component.html',
  styleUrls: ['./modif-employee.component.css']
})
export class ModifEmployeeComponent {
  id: number
  BlocForm: FormGroup

  constructor(
    private services: ServiceEmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    let formControls = {
      name: new FormControl('', [
        Validators.required,
      ]),
      surname: new FormControl('', [
        Validators.required,
      ]),
      salary: new FormControl('', [
        Validators.required,
      ]),
      position: new FormControl('', [
        Validators.required,
      ]),
      hiringDate: new FormControl('', [
        Validators.required,
      ]),
      active: new FormControl('', [
        Validators.required,
      ]),
    };
    this.BlocForm = this.fb.group(formControls);
  }

  get name() { return this.BlocForm.get('name'); }
  get surname() { return this.BlocForm.get('surname'); }
  get salary() { return this.BlocForm.get('salary'); }
  get position() { return this.BlocForm.get('position'); }
  get hiringDate() { return this.BlocForm.get('hiringDate'); }
  get active() { return this.BlocForm.get('active'); }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    console.log('ID:', id);

    this.services.findEmployeeById(id).subscribe((result) => {
      let event = result;
      console.log(event);
      this.BlocForm.patchValue({
        name: event.name,
        surname: event.surname,
        salary: event.salary,
        position: event.position,
        hiringDate: event.hiringDate,
        active: event.active,
      });
    });
  }

  updateEmployee() {
    let data = this.BlocForm.value;

    let employee = new Employee(
      this.id,
      data.name, 
      data.surname, 
      data.salary, 
      data.position, 
      data.hiringDate,
      data.active
    );
    console.log(employee);
    console.log(data);
    this.services.updateEmployee(this.id, employee).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/listeEmployee']);
    });
  }
}