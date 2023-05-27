import {Component, OnInit} from '@angular/core';
import 'chartjs-plugin-zoom';
import {InputMsr} from "../../common/input-msr";
import {MsrService} from "../../services/msr.service";
import {ApiInputMsr} from "../../common/api-input-msr";
import {OutputMsr} from "../../common/output-msr";
import Chart from 'chart.js/auto';
import {ChartConfiguration, CategoryScale} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styleUrls: ['./msr.component.css']
})
export class MsrComponent implements OnInit {
  polynomials!: InputMsr[]
  polynomialsPerDegreeA!: InputMsr[]
  polynomialsPerDegreeB!: InputMsr[]

  apiRequest!: ApiInputMsr
  apiResponse!: OutputMsr

  statesCounter: number = 0
  statesLength!: number

  private chartInstance: Chart | null = null;

  constructor(private msrService: MsrService) {
    this.apiRequest = new ApiInputMsr()
  }

  ngOnInit(): void {
    this.polynomialTable()
  }

  inMatrixLength(n: number) {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  inRange(n: number): number[] {
    let start: number = 2;
    return Array.from({length: n - start + 1}, (_, index) => index + start);
  }

  polynomialTable(): void {
    this.msrService.getPolynomialList().subscribe((data: InputMsr[]) => {
      this.polynomials = data;
    });
  }

  onDegreeChangeA(selectedDegree: number): void {
    this.apiRequest.rankA = selectedDegree
    this.polynomialsPerDegreeA = []

    for (let poly of this.polynomials) {
      if (poly.degree === selectedDegree)
        this.polynomialsPerDegreeA.push(poly)
    }
  }
  onDegreeChangeB(selectedDegree: number): void {
    this.apiRequest.rankB = selectedDegree
    this.polynomialsPerDegreeB = []

    for (let poly of this.polynomials) {
      if (poly.degree === selectedDegree)
        this.polynomialsPerDegreeB.push(poly)
    }
  }

  onSubmit(): void {
    this.msrService.sendRequestToApi(this.apiRequest).subscribe(
      (response: OutputMsr) => {
        this.apiResponse = response
        this.statesLength = response.stateMatrixS.length
        this.drawChart(response.prbsIndexes, response.acf);

        console.log(this.apiResponse.prbsIndexes);
        console.log(this.apiResponse.acf);
      }
    );
  }

  resetState(): void {
    this.statesCounter = 0
  }

  getNextState(): void {
    if(this.statesCounter > this.statesLength) this.statesCounter = 0
    ++this.statesCounter
  }

  drawChart(dataX: number[], dataY: number[]): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chartInstance) {
        (this.chartInstance as Chart).destroy();
      }

      Chart.register(CategoryScale);
      Chart.register(zoomPlugin);
      const chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: dataX.map((value) => value.toString()),
          datasets: [
            {
              label: 'ACF',
              data: dataY,
              borderColor: 'green',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              display: true,
              title: {
                display: true,
                text: 'X Axis',
              },
              min: 0,
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Y Axis',
              },
              min: 0,
            },
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                  speed: 0.1,
                  modifierKey: 'alt'
                },
                mode: 'xy'
              },
              pan: {
                enabled: true,
              },
            },
          },
        },
      };

      this.chartInstance = new Chart(ctx, chartConfig);
    }
  }
}
