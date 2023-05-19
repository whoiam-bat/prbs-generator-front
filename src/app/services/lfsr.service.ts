import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from 'rxjs';
import {InputLfsr} from "../common/input-lfsr";
import {OutputLfsr} from "../common/output-lfsr";

@Injectable({
  providedIn: 'root'
})
export class LfsrService {

  private dbUrl: string = 'https://prbs-generator-default-rtdb.europe-west1.firebasedatabase.app/polynomials.json'

  private lfsrEndpoint: string = 'http://127.0.0.1:8000/lfsr'

  constructor(private httpClient: HttpClient) { }

  getPolynomialList(): Observable<InputLfsr[]> {
    return this.httpClient.get(this.dbUrl).pipe(
      map((response: any) => {
        return response.map((item: any) => {
          const inputLfsr = new InputLfsr();
          inputLfsr.degree = item.degree;
          inputLfsr.polynomial = item.binPoly;
          inputLfsr.polynomial_gf2 = item.octalPoly;
          return inputLfsr;
        })
      })
    )
  }

  sendRequestToApi(request: InputLfsr): Observable<OutputLfsr> {
    let jsonString = JSON.stringify(request);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<OutputLfsr>(this.lfsrEndpoint, jsonString, { headers })
  }

}
