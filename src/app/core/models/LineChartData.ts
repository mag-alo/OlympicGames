// This file defines the structure of the data used in the line chart component.
export interface LineChartData {  
  name: string,   //Nom du pays = olympicCountry.country
  series: {name: number, value: number}[] //Année Jo name = olympicCountry.participations.year / value = olympicCountry.participations.medalsCount 
}