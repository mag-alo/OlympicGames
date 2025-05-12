// PieChart Implementation to transform OlympicCountry data into a suitable format for pie chart representation. 
import { Injectable } from '@angular/core';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { calculateTotal } from 'src/app/core/utils/Maths-utils';

@Injectable({
  providedIn: 'root',
})
export class PieChartDataService {
  
  /**
   * Transforms an array of OlympicCountry objects into an array of PieChartData objects.
   * Each PieChartData object contains the country name, the total medal count, and the country ID.
   *
   * @param olympicCountry - An array of OlympicCountry objects representing countries and their participation data.
   * @returns An array of PieChartData objects formatted for use in a pie chart.
   */
  transformToPieChartData(olympicCountry: OlympicCountry[]): PieChartData[] {
    return olympicCountry.map(country => ({
        name: country.country,
        value: calculateTotal(country.participations, 'medalsCount'),
        id: country.id
      }));
  }
}