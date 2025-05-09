// PieChart Implementation to transform OlympicCountry data into a suitable format for pie chart representation. 
import { Injectable } from '@angular/core';
import { PieChartData } from 'src/app/core/models/PieChartData';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { calculateTotal } from 'src/app/core/utils/Maths-utils';

@Injectable({
  providedIn: 'root',
})
export class PieChartDataService {
  
  transformToPieChartData(olympicCountry: OlympicCountry[]): PieChartData[] {
    return olympicCountry.map(country => ({
        name: country.country, // Nom du pays
        value: calculateTotal(country.participations, 'medalsCount'), // Nombre total de médailles
        id: country.id // ID du pays
      }));
  }
}