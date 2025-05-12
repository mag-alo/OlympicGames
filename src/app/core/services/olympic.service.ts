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

  /**
   * Loads the initial data for Olympic countries from the server.
   * 
   * This method sends an HTTP GET request to fetch an array of `OlympicCountry` objects
   * from the specified URL. The retrieved data is then emitted to the `olympics$` subject.
   * 
   * In case of an error during the HTTP request, an empty array is emitted to the `olympics$`
   * subject, and an error is thrown with a descriptive message.
   * 
   * @returns An observable that emits the HTTP response or an error if the request fails.
   */
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
