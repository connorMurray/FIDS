import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {IFlightInformation} from "./flight.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    flightInformation: IFlightInformation;

    constructor(private _dashboardService: DashboardService) {
    }

    ngOnInit() {
        this._dashboardService.getFlights()
            .subscribe(
                flightInformation => this.flightInformation = flightInformation);
    }
}
