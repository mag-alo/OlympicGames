import { Component, OnInit } from '@angular/core';
import { OlympicCountry } from '../core/models/OlympicCountry';

@Component({
  selector: 'app-pie-charts',
  standalone: true,
  imports: [],
  templateUrl: './pie-charts.component.html',
  styleUrl: './pie-charts.component.scss'
})
export class PieChartsComponent implements OnInit {
  olympicCountry!: OlympicCountry;

  constructor() {Object.assign(this.olympicCountry)};

  ngOnInit(): void {

  }

  // single: any[];
  // view: any[] = [700, 400];

  // // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;
  // legendPosition: string = 'below';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // constructor() {
  //   Object.assign(this, { single });
  // }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

}
