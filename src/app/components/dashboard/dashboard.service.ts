import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IFlightInformation, IFlightRecord} from "./flight.model";
import * as _ from 'underscore';

export interface IDashboardService {
  getFlights(): Observable<IFlightInformation>;
  updateFlightRecord(flightRecords: IFlightRecord[], updatedFlightRecord: IFlightRecord): IFlightRecord[];
  deleteFlightRecord(flightRecords: IFlightRecord[], updatedFlightRecord: IFlightRecord): IFlightRecord[];
}

@Injectable()
export class DashboardService implements IDashboardService {

  private aodbUrl: string = 'http://localhost:8080';

  constructor(private _http: Http) {
  }

  public getFlights(): Observable<IFlightInformation> {
    console.info('Attempting to retrieve flights from aodb');
    let flightRecordUrl: string = '/flightrecords';
    return this._http.get(this.aodbUrl + flightRecordUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public deleteFlightRecord(flightRecords: IFlightRecord[], flightRecordToDelete: IFlightRecord): IFlightRecord[] {
    flightRecords = _.reject(flightRecords, (record: IFlightRecord) => {
      return record.id === flightRecordToDelete.id;
    });
    return flightRecords;
  }

  public updateFlightRecord(flightRecords: IFlightRecord[], updatedFlightRecord: IFlightRecord): IFlightRecord[] {
    flightRecords.forEach((matchingRecord: IFlightRecord) => {
      if (matchingRecord.id === updatedFlightRecord.id) {
        matchingRecord.airportCode = updatedFlightRecord.airportCode;
        matchingRecord.scheduled = updatedFlightRecord.scheduled;
        matchingRecord.estimated = updatedFlightRecord.estimated;
        matchingRecord.gate = updatedFlightRecord.gate;
        matchingRecord.status = updatedFlightRecord.status;
        matchingRecord.statusText = updatedFlightRecord.statusText;
        matchingRecord.city = updatedFlightRecord.city;
        matchingRecord.remark = updatedFlightRecord.remark;
        matchingRecord.operatingCarrier = updatedFlightRecord.operatingCarrier;
        matchingRecord.operatingCarrier.airlineCode = updatedFlightRecord.operatingCarrier.airlineCode;
        matchingRecord.operatingCarrier.flightNumber = updatedFlightRecord.operatingCarrier.flightNumber;
        matchingRecord.operatingCarrier.airline = updatedFlightRecord.operatingCarrier.airline;
      }
    });
    return flightRecords;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body[0] || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
