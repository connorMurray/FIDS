import {Component, OnInit, OnDestroy} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {IFlightInformation, IFlightRecord} from "./flight.model";
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import {FlightupdateService} from "./flightupdate.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService, FlightupdateService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  clock: Observable<Date>;
  flightInformation: IFlightInformation;

  flightUpdateSubscription: any = this.flightupdateService.flightRecordUpdate.subscribe((flightRecord: IFlightRecord) => {
    console.log('updating flight record with id:' + flightRecord.id);
    this.flightInformation.flightRecord = this.dashboardService.updateFlightRecord(this.flightInformation.flightRecord, flightRecord);
  });

  flightDeleteSubscription: any = this.flightupdateService.flightRecordDelete.subscribe((flightRecord: IFlightRecord) => {
    console.log('deleting flight record with id:' + flightRecord.id);
    this.flightInformation.flightRecord = this.dashboardService.deleteFlightRecord(this.flightInformation.flightRecord, flightRecord);
  });

  constructor(private dashboardService: DashboardService, private flightupdateService: FlightupdateService) {
  }

  ngOnInit() {
    this.clock = this.getTime();
    this.dashboardService.getFlights().subscribe(flightInformation => {
      this.onFlightInformationRetrieved(flightInformation);
    });
  }

  ngOnDestroy() {
    console.log('disconnecting from aodb web socket and un-subscribing from topics ');
    this.flightUpdateSubscription.unsubscribe();
    this.flightDeleteSubscription.unsubscribe();
    this.flightupdateService.disconnect();
  }

  private onFlightInformationRetrieved(flightInformation: IFlightInformation): void {
    if (flightInformation && flightInformation.flightRecord) {
      flightInformation.flightRecord.forEach((flightRecord: IFlightRecord) => {
        if (flightRecord.estimated) {
          flightRecord.estimated = this.formatDateTime(flightRecord.estimated);
        }
        if (flightRecord.scheduled) {
          flightRecord.scheduled = this.formatDateTime(flightRecord.scheduled);
        }
      });
      this.flightInformation = flightInformation
    }
  }

  private formatDateTime(dateTime: string): string {
    return moment(dateTime).format('h:mm:ss a');
  }

  private getTime(): Observable<Date> {
    return Observable.interval(1000).map(()=> new Date());
  }
}
