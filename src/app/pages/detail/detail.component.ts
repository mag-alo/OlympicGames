// Selected olympic country (in home.component) detail component to display a line chart of medals won by the country in the Olympics over the years.
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartDataService } from 'src/app/core/services/LineChartDataService';
import { ActivatedRoute, Router} from '@angular/router';
import { calculateTotal } from 'src/app/core/utils/Maths-utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  olympicCountry!: OlympicCountry;
  lineChartData!: LineChartData;
  nbJO: number = 0;
  nbTotalMedal: number = 0;
  nbTotalAthletes: number = 0;

  // line chart Options
  gradient: boolean = true;
  legend: boolean = false;
  showRefLines: boolean = true;
  showRefLabels: boolean = true;
  showGridLines: boolean = true;  
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals Count';
  timeline: boolean = false;
  width: number =  Math.max(window.innerWidth / 2, 300);
  height: number = Math.max(window.innerHeight / 2, 500);

  constructor(
    private olympicService: OlympicService,
    private lineChartDataService: LineChartDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    const countryName = this.activatedRoute.snapshot.paramMap.get('country');
    if (countryName) {
      this.olympicService.getOlympics()
      .pipe(takeUntil(this.destroy$)) // Se désabonne automatiquement lors de la destruction
      .subscribe(data => {
        this.olympicCountry = this.olympicService.getOlympicCountryByName(countryName);
        if (this.olympicCountry) {
          this.lineChartData = this.lineChartDataService.transformToLineChartData(this.olympicCountry);
          this.nbJO = this.olympicCountry.participations.length;
          this.nbTotalMedal = calculateTotal(this.olympicCountry.participations, 'medalsCount');
          this.nbTotalAthletes = calculateTotal(this.olympicCountry.participations, 'athleteCount');
        } else {
          throw new Error('Erreur du Line Chart Data.');
        }
      });     
    } else {
      this.router.navigateByUrl('not-found');
    }
  }

  @HostListener('window:resize')
  onResize(event: Event) {
    this.width = Math.max(window.innerWidth / 2, 300); // Met à jour la largeur du lineChart lors du redimensionnement
    this.height = Math.max(window.innerHeight / 2, 500); // Met à jour la hauteur du lineChart lors du redimensionnement
  }

  ngOnDestroy(): void {
    this.destroy$.complete(); // Complète le Subject pour libérer les ressources
  }
}