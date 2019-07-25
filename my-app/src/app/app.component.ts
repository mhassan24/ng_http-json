import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { Data } from './Data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-dream-app';

    //fetch data
    httpdata;
  

  data: Data[];
  // url = 'http://localhost:4000/results';
  url =  'http://jsonplaceholder.typicode.com/users';    

  username = [];
  id = [];
  chart = [];

  constructor(private http: HttpClient) { }

  showdata() {  
    this.http.get('http://jsonplaceholder.typicode.com/users')    
    .pipe(map(res => res ))
    .subscribe(data => {  
      this.displaydata(data);
    });
  }
  displaydata(data) {this.httpdata = data;}
  

  ngOnInit() {

    this.http.get(this.url).subscribe((res: Data[]) => {
      this.showdata();
      res.forEach(y => {
        this.username.push(y.username);
        this.id.push(y.id);
      });
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.username,
          datasets: [
            {
              data: this.id,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}