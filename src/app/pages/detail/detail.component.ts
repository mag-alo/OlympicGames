// Selected olympic country (in home.component) detail component
import { Component, HostListener, OnInit } from '@angular/core';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartDataService } from 'src/app/core/services/LineChartDataService';
import { ActivatedRoute, Router} from '@angular/router';
import { calculateTotal } from 'src/app/core/utils/Maths-utils';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
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
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals Count';
  timeline: boolean = false;
  width: number =  Math.max(window.innerWidth / 2, 300); // Ajustez le diviseur selon vos besoins
  height: number = 400; // Une hauteur fixe ou dynamique

  constructor(
    private olympicService: OlympicService,
    private lineChartDataService: LineChartDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router, // Uncomment if you need to navigate to NotFoundComponent
  ) {}
  
  ngOnInit(): void {
    const countryName = this.activatedRoute.snapshot.paramMap.get('country');
    if (countryName) {    
      this.olympicCountry = this.olympicService.getOlympicCountryByName(countryName);
      if (this.olympicCountry) {
        this.lineChartData = this.lineChartDataService.transformToLineChartData(this.olympicCountry);
        this.nbJO = this.olympicCountry.participations.length;
        this.nbTotalMedal = calculateTotal(this.olympicCountry.participations, 'medalsCount');
        this.nbTotalAthletes = calculateTotal(this.olympicCountry.participations, 'athleteCount');
      } else{
        throw new Error('Erreur du Line Chart Data.');
      }      
    } else {
      throw new Error('Country parameter is missing in the route.');
      this.router.navigate(['/not-found']);
    }
  }

  @HostListener('window:resize')
  onResize(event: Event) {
    this.width = Math.max(window.innerWidth / 2, 300); // Met à jour la largeur lors du redimensionnement
  }
}