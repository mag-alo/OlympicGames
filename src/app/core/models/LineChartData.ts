export interface LineChartData {  
  name: string, // OlympicCountry.participations.year
  series: { // OlympicCountry.participations
    name: number, // OlympicCountry.participations.year
    value: number // OlympicCountry.participations.medals
  }[]
}