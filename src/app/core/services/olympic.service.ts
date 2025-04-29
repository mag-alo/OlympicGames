//Implémentation du service pour récupérer les données des pays olympiques
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(){
    return this.olympics$.asObservable();
  }

  getOlympicCountryByName(countryName : string): OlympicCountry { 
   // Utilisation de BehaviorSubject pour obtenir la valeur actuelle
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
