/**
 * Service responsible for transforming OlympicCountry data into a format
 * suitable for line chart visualization.
 */
import { Injectable } from '@angular/core';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Injectable({
  providedIn: 'root',
})

export class LineChartDataService {

  /**
   * Transforms an OlympicCountry object into a LineChartData object
   * @param {OlympicCountry} olympicCountry
   * @returns {LineChartData}
   */
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