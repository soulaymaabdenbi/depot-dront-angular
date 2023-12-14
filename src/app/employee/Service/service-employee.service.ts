import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/Models/Employee';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceEmployeeService {
  apiUrl = "http://localhost:8082/api/employes";

  constructor(private http: HttpClient) { }

  getEmployees() {
      return this.http.get<Employee[]>(this.apiUrl+"/" );
  }
  addEmployee(Employee: Employee) {
      return this.http.post<any>(this.apiUrl + "/add", Employee, httpOptions);
  }
  deleteEmployee(id: number) {
      const url = `${this.apiUrl }/${id}`
      return this.http.delete(url, httpOptions)
  }

  updateEmployee(id: number, Employee: Employee) {
      const url = `${this.apiUrl}/${id}`
      return this.http.put<any>(url, Employee);
  }

  findEmployeeById(id: number): Observable<Employee> {
      const url = `${this.apiUrl + "/employee"}/${id}`;
      return this.http.get<Employee>(url, httpOptions)
  }
}
