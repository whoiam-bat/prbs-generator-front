import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {InputLfsr} from "../common/input-lfsr";
import {InputMsr} from "../common/input-msr";
import {OutputMsr} from "../common/output-msr";
import {ApiInputMsr} from "../common/api-input-msr";

@Injectable({
  providedIn: 'root'
})
export class MsrService {
  private dbUrl: string = 'https://prbs-generator-default-rtdb.europe-west1.firebasedatabase.app/polynomials.json'

  //private msrEndpoint: string = 'https://generatorapi-1-a7624134.deta.app/msr'
  private msrEndpoint: string = 'https://oleksii-drabchak-prbs-generator.azurewebsites.net/msr'

  constructor(private httpClient: HttpClient) {}

  getPolynomialList(): Observable<InputMsr[]> {
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

  sendRequestToApi(request: ApiInputMsr): Observable<OutputMsr> {
    let jsonString = JSON.stringify(request);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<OutputMsr>(this.msrEndpoint, jsonString, { headers })
  }


}
