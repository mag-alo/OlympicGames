export interface LineChartData {  
  name: string,   //Nom du pays = olympicCountry.country
  series: {name: number, value: number}[] //Année Jo {name = olympicCountry.participations.year, value = olympicCountry.participations.medalsCount}
}