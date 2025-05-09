# OlympicGames
  OlympicGames provides a dashboard 'Medals per Country' based on 'assets/mock/olympic.json' data.
 
  . HomeComponent is the initial page describing the first data level : Number of JOs, Numbers of participating countries and a pie graph showing the total of medals by participating country for the  total number of JOs.
  Hover mouse on part of the pie shows the total number of medals for the concerned coutry.
  Click mouse on part of the pie sends on a new application page, giving details of the selected country.

  . DetailComponent is the second page describing the second data level contained for the selected country : Total number of JOs, Total number of medals, Total number of athletes for the total number of JOs and a A line graph showing the number of medals by JO year. Hover mouse somewhere on this line graph shows the concerned year and total of medals. 
  A button on the bottom allows to come back on initial page.

  . NonFoundComponent is a third page displayed in case of error during loading detail country data.
  A button on the bottom allows to come back on initial page.

## Technologies
- Angular CLI 18.0.3
- Bootstrap 5.3.5
- CSS

## Author
Magali Ducrot

## Run
npm start