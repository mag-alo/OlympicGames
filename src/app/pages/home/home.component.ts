import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  public nbTotalDeMedaille: number = 0;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Toys', 'Electronics', 'Groceries', 'Furniture'],
    datasets: [{
      data: [14.1, 28.2, 14.4, 43.3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

  
        // getHomeComponentById(homeComponentOlympics$Id: number): OlympicCountry {
        //   if (homeComponentOlympics$Id === this.olympics$.next()){

        //   }
        //   const homeComponentOlympics$ = this.olympics$. //next(HomeComponent => HomeComponent.id === homeComponentOlympics$Id);
        //   if (!homeComponentOlympics$){
        //     throw new Error('homeComponentOlympics$ not found!');
        //   }
        //   return homeComponentOlympics$;  
        // }
}
