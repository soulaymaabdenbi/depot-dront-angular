// etudiant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Etudiant } from '../Models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private baseURL = "http://localhost:8081/PremierProjetTest/api/v1/etudiants";



  constructor(private httpClient: HttpClient) { }

  getEtudiantsList(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>(this.baseURL).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching etudiants:', error);
        throw error;
      })
    );
  }
  deleteEtudiant(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
 
  updateEtudiant(id: number, etudiant: Etudiant): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, etudiant);
  }
 /* getEtudiantById(id: number): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>(`${this.baseURL}/${id}`);
  }*/
  getEtudiantById(id: number): Observable<Etudiant> {
    const url = `${this.baseURL}/${id}`;
    return this.httpClient.get<Etudiant>(url);
  }
  
  createEtudiant(etudiant: Etudiant): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, etudiant);
  }

}