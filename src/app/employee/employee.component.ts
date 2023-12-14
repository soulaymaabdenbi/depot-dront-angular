import { Component } from '@angular/core';
import { Employee } from '../Models/Employee';
import { ServiceEmployeeService } from './Service/service-employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees: Employee[] = [];
  recherche: string = '';

  constructor(private service: ServiceEmployeeService, private router: Router) {}

  onDeleteBloc(employee: Employee) {
    if (confirm("Voulez vous supprimer ce employee ?")) {

      this.service.deleteEmployee(employee.id).subscribe(() => {
        this.router.navigate(['/listeEmployee']).then(() => {
          window.location.reload()
        })
      })
    }
  }

  ngOnInit(): void {
    this.loadEployees();
  }
  loadEployees() {
   
      this.service.getEmployees().subscribe(
        data => {
          this.employees = data;
          console.log('Employees:', data);
  
        },
        error => {
          console.error('Erreur lors de la récupération des Employees', error);
        }
      );
    }



  }


