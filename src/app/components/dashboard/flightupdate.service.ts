import {Injectable} from '@angular/core';
import {StompService} from 'ng2-stomp-service';
import {IFlightRecord} from "./flight.model";
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FlightupdateService {

  flightRecordUpdate: Subject<IFlightRecord> = new Subject<IFlightRecord>();
  flightRecordDelete: Subject<IFlightRecord> = new Subject<IFlightRecord>();
  private subscriptions: any[] = [];

  constructor(private stomp: StompService) {
    console.log('configuring stomp connection');
    this.stomp.configure({
      host: 'http://localhost:8080/ws/flight',
      debug: true,
      queue: {'init': false},
    });

    console.log('attempting to connect to aodb');
    this.stomp.startConnect().then(() => {
      console.log('connected to aodb');
      stomp.done('init');
      this.subscribe();
    });
  }

  public disconnect(): void {
    this.unsubscribe();
    this.stomp.disconnect().then(() => {
      console.log('Disconnecting from aodb')
    })
  }

  private subscribe(): void {
    this.subscriptions.push(this.stomp.subscribe('/topic/flightupdate', (flightRecordUpdate: IFlightRecord) => {
      console.log('flight update received');
      console.log(flightRecordUpdate);
      this.flightRecordUpdate.next(flightRecordUpdate);
    }));

    this.subscriptions.push(this.stomp.subscribe('/topic/flightdelete', (flightRecordDelete: IFlightRecord) => {
      console.log('flight delete received');
      console.log(flightRecordDelete);
      this.flightRecordDelete.next(flightRecordDelete);
    }));
  }

  private unsubscribe(): void {
    this.subscriptions.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }
}
