import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StompService} from 'ng2-stomp-service';

import {
    DataListModule,
    ButtonModule,
    DataGridModule,
    PanelModule,
    DataTableModule,
    SharedModule
} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    imports: [ //TODO: remove unrequired pirmeng modules
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        DataListModule,
        ButtonModule,
        DataGridModule,
        PanelModule,
        DataTableModule,
        SharedModule
    ],
    providers: [
        StompService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
