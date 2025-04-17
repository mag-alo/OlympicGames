import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>;

  constructor(private olympicService: OlympicService) {}
  
  ngOnInit(): void {
    // Charger les données initiales si nécessaire
    // this.olympicService.loadInitialData().subscribe();

    // Obtenir les données observables
    this.olympics$ = this.olympicService.getOlympics();

            // Manipuler les données
            // this.olympics$.subscribe((data) => {
            //   console.log(data);
            //   // Effectuer des manipulations sur les données ici
            // });


  }
  
  // Exemple de méthode pour obtenir un pays olympique par ID
  getOlympicCountryById(id: number): OlympicCountry | undefined {
    let olympicCountry: OlympicCountry | undefined;
    this.olympics$.subscribe((data) => {
      olympicCountry = data.find((country) => country.id === id);
    });
    return olympicCountry;
  }

  onButtonClick(countryId: number): void {
    const country = this.getOlympicCountryById(countryId);
    if (country) {
      console.log('Pays trouvé:', country);
      // Effectuer d'autres actions avec le pays trouvé
    } else {
      console.log('Pays non trouvé');
    }
  }
}

// export class HomeComponent implements OnInit {
//   public olympics$: Observable<OlympicCountry[]> = of([]);
//   public nbTotalDeMedaille: number = 0;
  
//   constructor(private olympicService: OlympicService) {}

//   ngOnInit(): void {
//     this.olympics$ = this.olympicService.getOlympics();
//   }
// }
