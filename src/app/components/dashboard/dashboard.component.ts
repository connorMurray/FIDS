import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {IFlightInformation, IFlightRecord} from "./flight.model";
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  clock: Observable<Date>;
  flightInformation: IFlightInformation;

  constructor(private _dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.clock = this.getTime();
    this._dashboardService.getFlights().subscribe(flightInformation => {
      this.onFlightInformationRetrieved(flightInformation);
    });
  }

  private onFlightInformationRetrieved(flightInformation: IFlightInformation): void {
    flightInformation.flightRecord.forEach((flightRecord: IFlightRecord) => {
      flightRecord.estimated = this.formatDateTime(flightRecord.estimated);
      flightRecord.scheduled = this.formatDateTime(flightRecord.scheduled);
    });
    this.flightInformation = flightInformation
  }

  private formatDateTime(dateTime: string): string {
    return moment(dateTime).format('h:mm:ss a');
  }

  private getTime(): Observable<Date> {
    return Observable.interval(1000).map(()=> new Date());
  }
}
