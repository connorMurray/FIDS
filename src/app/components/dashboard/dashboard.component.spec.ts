import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let DashboardServiceMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataTableModule],
      declarations: [DashboardComponent],
      providers: [
        {provide: DashboardService, useValue: DashboardServiceMock},
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should construct', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should set clock', () => {
  //   component.ngOnInit();
  //   expect(component.clock).toBeDefined();
  // });
  //
  // it('should ensure flight information is undefined until retrieved from aodb', () => {
  //   expect(component.flightInformation).toBe(undefined);
  // });
});
