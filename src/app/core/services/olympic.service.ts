// Olympic service implementation to get './assets/mock/olympic.json' data using Observable
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/OlympicCountry';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
 
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),

      catchError((error) => {
        this.olympics$.next([]);
        return throwError(() => new Error(`Erreur lors du chargement des données initiales : $error.message`))
      })
    );
  }

  getOlympics(){
    return this.olympics$.asObservable();
  }

  getOlympicCountryByName(countryName : string): OlympicCountry { 
    const olympicCountry = this.olympics$.getValue().find(
            (country) => country.country === countryName
          );

    if (olympicCountry) {
      return olympicCountry;
    } else { 
      throw new Error(`olympic.service_Pays "${countryName}" non trouvé.`);
    }
  }
}
