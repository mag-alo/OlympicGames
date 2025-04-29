//selected (in home.component) olympic country detail component
import { Component, OnInit } from '@angular/core';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartDataService } from 'src/app/core/services/LineChartDataService';
import { ActivatedRoute} from '@angular/router';
import { calculateTotal } from 'src/app/core/utils/Maths-utils';

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

  //Options for line chart
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
  width: number = window.innerWidth / 2; // Ajustez le diviseur selon vos besoins
  height: number = 400; 

  constructor(
    private olympicService: OlympicService,
    private lineChartDataService: LineChartDataService,
    private activatedRoute: ActivatedRoute
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
    }
  }
}