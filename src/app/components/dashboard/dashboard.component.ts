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

    //TODO: could also allow them to edit all the other properties on the aodb also
    _subscription = this.flightupdateService.flightRecordUpdate.subscribe((updatedFlightRecord: IFlightRecord) => {
        //TODO: update record by id
        console.log('updating flight record with id:' + updatedFlightRecord.id);

        //TODO: test if this works first thing in the morning
        this.flightInformation.flightRecord = this.dashboardService.updateFlightRecord(this.flightInformation.flightRecord, updatedFlightRecord);
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
        this._subscription.unsubscribe();
        console.log('disconnecting from aodb web socket and un-subscribing from topics ');
        this.flightupdateService.disconnect();
    }

    private onFlightInformationRetrieved(flightInformation: IFlightInformation): void {
        if (flightInformation && flightInformation.flightRecord) {
            flightInformation.flightRecord.forEach((flightRecord: IFlightRecord) => {
                flightRecord.estimated = this.formatDateTime(flightRecord.estimated);
                flightRecord.scheduled = this.formatDateTime(flightRecord.scheduled);
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
