import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { PolymerModule } from '@codebakery/origami';
import { HttpModule }    from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import {
  MdListModule,
  MdIconModule,
  MdLineModule,
} from '@angular/material';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { Ng2OrderModule } from 'ng2-order-pipe';

import { AppRoutingModule } from './app-routing.module';

import { UpdateStreamService } from './update-stream.service';
import { SleepService } from './sleep.service';
import { ModalService } from './modal.service';

import { AppComponent } from './app.component';
import { SleepComponent } from './sleep/sleep.component';
import { SleepItemComponent } from './sleep-item/sleep-item.component';
import { LogComponent } from './log/log.component';
import { GraphComponent } from './graph/graph.component';
import { LogWeekComponent } from './log-week/log-week.component';
import { LogDayComponent } from './log-day/log-day.component';
import { MapEntriesPipe } from './util/map-entries.pipe';
import { MapValuesPipe } from './util/map-values.pipe';
import { DateMomentPipe } from './util/date-moment.pipe';
import { ModalCanvasComponent } from './modal-canvas/modal-canvas.component';
import { ModalComponent } from './modal/modal.component';
import { ModalTranscludeDirective } from './modal-transclude.directive';

// Create the client as outlined above
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'api/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
  	AppComponent,
    LogComponent,
    GraphComponent,
    SleepComponent,
    SleepItemComponent,
    LogWeekComponent,
    LogDayComponent,
    MapEntriesPipe,
    MapValuesPipe,
    DateMomentPipe,
    ModalCanvasComponent,
    ModalComponent,
    ModalTranscludeDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ApolloModule.forRoot(provideClient),
    PolymerModule.forRoot(), // Only import .forRoot() once and at the highest level
    Ng2OrderModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpModule,
    AppRoutingModule,
    MdListModule,
    MdIconModule,
    MdLineModule,
  ],
  providers: [
    UpdateStreamService,
    SleepService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
