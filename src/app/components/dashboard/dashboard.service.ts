import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IFlightInformation, IFlightRecord} from "./flight.model";

export interface IDashboardService {
    getFlights(): Observable<IFlightInformation>;
    updateFlightRecord(flightRecords: IFlightRecord[], updatedFlightRecord: IFlightRecord): IFlightRecord[]
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

    public updateFlightRecord(flightRecords: IFlightRecord[], updatedFlightRecord: IFlightRecord): IFlightRecord[] {
        flightRecords.forEach((flightRecord: IFlightRecord) => {
            if (flightRecord.id === updatedFlightRecord.id) {
                //TODO: if this doesnt work then need to replace each prop
                flightRecord = updatedFlightRecord;
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
