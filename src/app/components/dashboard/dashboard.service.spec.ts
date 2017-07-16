import {async, TestBed, inject} from '@angular/core/testing';

import {DashboardService} from './dashboard.service';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject([DashboardService, MockBackend], (service: DashboardService, mockBackend: MockBackend) => {
    expect(service).toBeDefined();
  })));

  describe('getFlights', () => {
    const mockResponse = [{
      airportCode: 'airportCode',
      adi: 'adi',
      flightDate: 'flightDate',
      flightRecord: 'flightRecord'
    }];

    it('should return parsed flight information from aodb', async(inject([DashboardService, MockBackend], (service: DashboardService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponse)})));
      });

      service.getFlights().subscribe(res => {
        expect(res).toEqual(mockResponse[0]);
      });
    })));

    it('should catch error if http call fails', async(inject([DashboardService, MockBackend], (service: DashboardService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(conn => {
        conn.mockError(new Response(new ResponseOptions({
          body: JSON.stringify({error: 'Internal Server Error'}),
          status: 500,
        })));
      });

      service.getFlights().subscribe(res => {
        },
        err => {
          expect(err).toEqual('500 - null');
        });
    })));
  });
});
