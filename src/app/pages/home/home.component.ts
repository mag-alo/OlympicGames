// Global olympic countries data
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
  
  //pie chart options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  labelFormatting = (texte: string): string => {
    return `${texte}`;
   };
   width: number =  Math.max(window.innerWidth / 2, 300); // Ajustez le diviseur selon vos besoins
   height: number = 300; // Une hauteur fixe ou dynamique
 
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

  onSelect(event: any): void {
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }
 
   @HostListener('window:resize')
   onResize(event: Event) {
    this.width = Math.max(window.innerWidth / 2, 300); // Met à jour la largeur lors du redimensionnement
   }
 
}
