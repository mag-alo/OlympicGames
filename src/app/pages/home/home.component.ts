//global olympic countries data
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartDataService } from 'src/app/core/services/PieChartDataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<OlympicCountry[]> = of([]);

  pieChartData: PieChartData[] = [];
  
  //Options for pie chart
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  labelFormatting = (texte: string): string => {
    return `${texte}`;
   };
 
  constructor(
    private olympicService: OlympicService,
    private pieChartDataService: PieChartDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  
    this.olympics$ = this.olympicService.getOlympics();
  
    this.olympicService.getOlympics().subscribe((olympicCountries) => {
      this.pieChartData = this.pieChartDataService.transformToPieChartData(olympicCountries);
    });
   }

   width: number = window.innerWidth / 2; // Ajustez le diviseur selon vos besoins
   height: number = 400; // Une hauteur fixe ou dynamique

   onSelect(event: any): void {
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }
 
   @HostListener('window:resize')
   onResize(event: Event) {
     this.width = window.innerWidth / 2; // Mettez à jour la largeur lors du redimensionnement
   }
 
}
