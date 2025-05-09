// LineChart implementation to transform OlympicCountry data into a suitable format for line chart representation.
import { Injectable } from '@angular/core';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Injectable({
  providedIn: 'root',
})
export class LineChartDataService {
  
  transformToLineChartData(olympicCountry: OlympicCountry): LineChartData{
    return {
        name: olympicCountry.country,
        series: olympicCountry.participations.map(participation => ({
            name: participation.year,
            value: participation.medalsCount
          })
        )
      };
  }
}