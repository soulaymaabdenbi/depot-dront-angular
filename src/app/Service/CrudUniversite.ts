import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Universite } from '../Models/Universite';
import { Observable } from 'rxjs';
import { Foyer } from '../Models/Foyer';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})
export class CrudUniversite {
    apiUrl = "http://localhost:8081/PremierProjetTest/Universite";
    foyerApiUrl = "http://localhost:8081/PremierProjetTest/Foyer/retrieve-all-Foyers";
    constructor(private http: HttpClient) { }

    getUniversites() {
        return this.http.get<Universite[]>(this.apiUrl + "/retrieve-all-Universites");
    }
    addUniversite(Universite: Universite) {
        return this.http.post<any>(this.apiUrl + "/add-Universite", Universite, httpOptions);
    }
    deleteUniversite(id: number) {
        const url = `${this.apiUrl + "/remove-Universite"}/${id}`
        return this.http.delete(url, httpOptions)
    }

    updateUniversite(id: number, universite: Universite) {
        const url = `${this.apiUrl+"/modify-Universite"}`
        return this.http.put<any>(url, universite);
    }

    findUniversiteById(id: number): Observable<Universite> {
        const url = `${this.apiUrl + "/getUniversiteById"}/${id}`;
        return this.http.get<Universite>(url, httpOptions)
    }
    
    getFoyers() {
        return this.http.get<Foyer[]>(this.foyerApiUrl);
    }

    exportUniversitesPdf(): Observable<Blob> {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
          responseType: 'blob' as 'json' // Spécifiez le type de réponse en tant que blob
        };
      
        return this.http.get<Blob>(this.apiUrl + '/pdf', httpOptions);
    }

    searchUniversite(nom: string): Observable<Universite[]> {
        return this.http.get<Universite[]>(`${this.apiUrl}/search/by-nom/${nom}`);
    }

    getUniversitesTrieesParAdresse() {
        return this.http.get<Universite[]>(this.apiUrl + '/retrieve-all-Universites/par-adresse');
      }
    
      getUniversitesTrieesParNom() {
        return this.http.get<Universite[]>(this.apiUrl + '/retrieve-all-Universites/par-nom');
      }

}
