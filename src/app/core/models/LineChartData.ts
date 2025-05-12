export interface LineChartData {  
  // OlympicCountry.participations.year
  name: string,
  // OlympicCountry.participations
  series: {
    name: number, // OlympicCountry.participations.year
    value: number // OlympicCountry.participations.medals
  }[] 
}