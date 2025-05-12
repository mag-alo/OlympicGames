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
/**
 * The `HomeComponent` is responsible for displaying the home page of the Olympic Games application.
 * It fetches Olympic data, processes it into a format suitable for a pie chart, and handles user interactions.
 * 
 * @remarks
 * This component uses Angular's lifecycle hooks to manage data fetching and cleanup.
 * It also listens to window resize events to dynamically adjust the dimensions of the pie chart.
 */
export class HomeComponent implements OnInit {
  private destroy$ = new Subject<void>();
  
  public olympics$: Observable<OlympicCountry[]> = of([]);

  pieChartData: PieChartData[] = [];
  
  //pie chart options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  width: number =  Math.max(window.innerWidth / 2, 300);
  height: number = Math.max(window.innerHeight / 2, 500);
 
  constructor(
    private olympicService: OlympicService,
    private pieChartDataService: PieChartDataService,
    private router: Router,
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a component.
   * 
   * In this implementation:
   * - Initializes the `olympics$` observable by fetching Olympic data from the `OlympicService`.
   * - Subscribes to the Olympic data stream, processes it into pie chart data using the `PieChartDataService`,
   *   and assigns the result to `pieChartData`.
   * - Ensures proper cleanup of the subscription by using the `takeUntil` operator with the `destroy$` subject.
   */
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  
    this.olympicService.getOlympics()
    .pipe(takeUntil(this.destroy$))
    .subscribe((olympicCountries) => {
      this.pieChartData = this.pieChartDataService.transformToPieChartData(olympicCountries);
    });
   }

  /**
   * Handles the selection event from a pie chart.
   * Navigates to the detail page corresponding to the selected item's name.
   *
   * @param event - The data associated with the selected pie chart segment.
   *                 Contains information such as the name of the selected segment.
   */
  onSelect(event: PieChartData): void {
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }
 
   @HostListener('window:resize')
  /**
   * Handles the resize event and adjusts the component's width and height
   * based on the current window dimensions. Ensures that the width and height
   * do not fall below specified minimum values.
   */
   onResize() {
    this.width = Math.max(window.innerWidth / 2, 300);
    this.height= Math.max(window.innerHeight / 2, 500);
   }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Completes the `destroy$` subject to clean up any subscriptions
   * and prevent memory leaks.
   */
   ngOnDestroy(): void {
    this.destroy$.next();    
    this.destroy$.complete();
  }   
}
