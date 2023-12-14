import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceEmployeeService } from '../../Service/service-employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  BlocForm: FormGroup;

  constructor(
    private services: ServiceEmployeeService,
    private router: Router,
    private fb: FormBuilder
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


  addNewEmployee() {
    let data = this.BlocForm.value;
    console.log(data);
    
    
      let employee = new Employee(
        undefined, 
        data.name, 
        data.surname, 
        data.salary, 
        data.position, 
        data.hiringDate,
        data.active, 
 
        
      );
    
      console.log(employee);
    
      this.services.addEmployee(employee).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/listeEmployee']);
        },
        err => {
          console.log(err);
        }
      );
    
  }
  
}
