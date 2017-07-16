import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IFlightInformation} from "./flight.model";

export interface IDashboardService {
  getFlights(): void;
}

@Injectable()
export class DashboardService implements IDashboardService {

  //TODO: pull out to config file
  private aodbUrl: string = 'http://localhost:8080';

  constructor(private _http: Http) {
  }

  public getFlights(): Observable<IFlightInformation> {
    let flightRecordUrl: string = '/flightrecords';
    return this._http.get(this.aodbUrl + flightRecordUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body[0] || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); //TODO: replace with logging library
    return Observable.throw(errMsg);
  }
}
