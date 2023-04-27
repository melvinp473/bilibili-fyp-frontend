import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule} from "@ngrx/effects";
import { TestConnectionComponent } from './test-connection/test-connection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { testConnectionReducers } from './test-connection/store';
import { TestConnectionState } from "../app/test-connection/store/states"
import { DatabaseModel } from './models/store-models/database.model';
import { appReducer, connectionReducer } from './test-connection/store/reducers/test-connection.reducer';
import { TestConnectionEffects} from './test-connection/store/effects/test-connection.effects'
import { MaterialModule } from './material/material.module';
import { NavigationTemplateComponentComponent } from './navigation-template-component/navigation-template-component.component';
import { HomeComponent } from './components/home/home.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { PreprocessingComponent } from './components/preprocessing/preprocessing.component';
import { AgGridModule } from 'ag-grid-angular';
import { MachineLearningComponent } from './components/machine-learning/machine-learning.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    TestConnectionComponent,
    NavigationTemplateComponentComponent,
    HomeComponent,
    DatasetComponent,
    PreprocessingComponent,
    MachineLearningComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ applicationState:  appReducer}),
    EffectsModule.forRoot([TestConnectionEffects]),
    MaterialModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
