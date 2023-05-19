import {Component, OnInit} from '@angular/core';
import {InputLfsr} from "../../common/input-lfsr";
import {LfsrService} from "../../services/lfsr.service";
import {OutputLfsr} from "../../common/output-lfsr";
import Chart from 'chart.js/auto';
import 'chartjs-plugin-zoom';
import {ChartConfiguration} from "chart.js";


@Component({
  selector: 'app-lfsr',
  templateUrl: './lfsr.component.html',
  styleUrls: ['./lfsr.component.css']
})
export class LfsrComponent implements OnInit {
  polynomials!: InputLfsr[];
  requestPoly!: InputLfsr;
  responsePoly!: OutputLfsr;

  degree!: number;
  octalPoly!: string;
  binPoly!: string;
  polynomialsPerDegree!: InputLfsr[];

  private chartInstance: Chart | null = null;

  constructor(private lfsrService: LfsrService) {
  }

  ngOnInit(): void {
    this.polynomialTable()
  }

  inRange(n: number): number[] {
    let start: number = 2;
    return Array.from({length: n - start + 1}, (_, index) => index + start);
  }

  polynomialTable(): void {
    this.lfsrService.getPolynomialList().subscribe((data: InputLfsr[]) => {
      this.polynomials = data;
    });
  }

  onDegreeChange(selectedDegree: number): void {
    this.degree = selectedDegree
    this.polynomialsPerDegree = []

    for (let poly of this.polynomials) {
      if (poly.degree === selectedDegree)
        this.polynomialsPerDegree.push(poly)
    }
  }

  onSubmit(): void {
    this.lfsrService.sendRequestToApi(this.requestPoly).subscribe(
      (response: OutputLfsr) => {
        this.responsePoly = response
        this.drawChart(response.prbs_indexes, response.acf);
        console.log(this.responsePoly.prbs_indexes);
        console.log(this.responsePoly.acf);
      }
    );
  }

  drawChart(dataX: number[], dataY: number[]): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chartInstance) {
        (this.chartInstance as Chart).destroy();
      }

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
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
              pan: {
                enabled: true,
                mode: 'xy',
              },
            },
          },
        },
      };

      this.chartInstance = new Chart(ctx, chartConfig);
    }
  }
}
