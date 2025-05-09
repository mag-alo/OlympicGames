// Global olympic countries data component to display a pie chart of medals won by each country in the Olympics.
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject<void>();
  
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
   width: number =  Math.max(window.innerWidth / 2, 300);
   height: number = Math.max(window.innerHeight / 2, 500);
 
  constructor(
    private olympicService: OlympicService,
    private pieChartDataService: PieChartDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  
    this.olympicService.getOlympics()
    .pipe(takeUntil(this.destroy$)) // Se désabonne automatiquement lors de la destruction
    .subscribe((olympicCountries) => {
      this.pieChartData = this.pieChartDataService.transformToPieChartData(olympicCountries);
    });
   }

  onSelect(event: PieChartData): void {
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }
 
   @HostListener('window:resize')
   onResize(event: Event) {
    this.width = Math.max(window.innerWidth / 2, 300); // Met à jour la largeur du lineChart lors du redimensionnement
    this.height= Math.max(window.innerHeight / 2, 500); // Met à jour la hauteur du lineChart lors du redimensionnement
   }

   ngOnDestroy(): void {
    this.destroy$.complete(); // Complète le Subject pour libérer les ressources
  }   
}
