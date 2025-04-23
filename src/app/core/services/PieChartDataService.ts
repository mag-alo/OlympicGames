import { Injectable } from '@angular/core';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Injectable({
  providedIn: 'root',
})
export class PieChartDataService {
  
  transformToPieChartData(olympicCountry: OlympicCountry[]): PieChartData[] {
    return olympicCountry.map(
      olympicCountry => ({
        name: olympicCountry.country as string,
        value: olympicCountry.participations.reduce(
          (total, participation) => total + participation.medalsCount,
          0
        ),
      })
    );
  }
  
}