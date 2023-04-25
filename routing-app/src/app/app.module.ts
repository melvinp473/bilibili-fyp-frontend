import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TestConnectionComponent } from './test-connection/test-connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { testConnectionReducers } from './test-connection/store';
import { TestConnectionState } from "../app/test-connection/store/states"
import { DatabaseModel } from './models/store-models/database.model';
import { appReducer } from './test-connection/store/reducers/test-connection.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TestConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ applicationState:  appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
