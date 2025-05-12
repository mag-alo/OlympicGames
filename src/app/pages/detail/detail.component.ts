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
/**
 * The `DetailComponent` is responsible for displaying detailed information about a specific Olympic country,
 * including its participation data, total medals, and total athletes. It also renders a line chart to visualize
 * the medal counts over time.
 */
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

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * 
   * This method performs the following actions:
   * 1. Retrieves the country name from the route parameters and checks if it exists in the Olympic service.
   * 2. If the country exists:
   *    - Fetches the corresponding Olympic country data.
   *    - Subscribes to the Olympic data stream and processes it to:
   *      - Transform the data into a format suitable for a line chart.
   *      - Calculate the total number of participations (nbJO).
   *      - Calculate the total number of medals (nbTotalMedal).
   *      - Calculate the total number of athletes (nbTotalAthletes).
   * 3. If the country does not exist, navigates to the 'not-found' page.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    if(this.olympicService.getOlympicCountryByName(this.activatedRoute.snapshot.paramMap.get('country')!)){
      this.olympicCountry = this.olympicService.getOlympicCountryByName(this.activatedRoute.snapshot.paramMap.get('country')!);
      this.olympicService.getOlympics()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.lineChartData = this.lineChartDataService.transformToLineChartData(this.olympicCountry);
          this.nbJO = this.olympicCountry.participations.length;
          this.nbTotalMedal = calculateTotal(this.olympicCountry.participations, 'medalsCount');
          this.nbTotalAthletes = calculateTotal(this.olympicCountry.participations, 'athleteCount');
        });
    } else {
      this.router.navigateByUrl('not-found');
    }
  }  

  @HostListener('window:resize')
  /**
   * Handles the resize event and adjusts the component's width and height
   * based on the current window dimensions. Ensures that the width and height
   * do not fall below specified minimum values.
   */
  onResize() {
    this.width = Math.max(window.innerWidth / 2, 300);
    this.height = Math.max(window.innerHeight / 2, 500);
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Completes the `destroy$` subject to clean up any subscriptions
   * or resources tied to it, preventing memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}