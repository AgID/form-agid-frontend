import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { an, B } from 'chart.js/dist/chunks/helpers.core';
import { timeStamp } from 'console';
import { elementAt } from 'rxjs';
import { ElencoFormService } from '../elenco-form/elenco-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private elencoFormService: ElencoFormService) {}

  //Struttura grafico
  public pieChart: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          align: 'start',
        },
      },
    },
  };
  statistiche: any[] = [];

  ngOnInit(): void {
    let colors = new Array<any>();
    let labels = new Array<any>();
    this.elencoFormService
      .getStatistichePubblicati()
      .subscribe((result) => {
        this.statistiche = result;
      })
      .add(() => {
        if (this.statistiche.length > 0) {
          this.statistiche.forEach((elem) => {
            //TODO: da rimuovere
            labels.push(elem.titolo);
          });

          //Creazione colori
          for (let i = 0; i < labels.length; i++) {
            let color = this.random_rgba();
            colors.push(color);
          }

          //Recupero dei valori delle statistiche
          let statsArray = this.statistiche.map(
            (elem) => elem.sottomissioniPubblicateCount
          );

          //Crezione dataset
          let statsDatasets = {
            backgroundColor: colors,
            data: statsArray,
          };

          //Creazione del grafico
          this.pieChart.data.datasets.splice(0, 1);
          this.pieChart.data.datasets.push(statsDatasets);
          this.pieChart.data.labels = labels;
          new Chart('statsPie', this.pieChart);
        }
      });
  }

  private random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      'rgba(' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      o(r() * s) +
      ',' +
      r().toFixed(1) +
      ')'
    );
  }
}
