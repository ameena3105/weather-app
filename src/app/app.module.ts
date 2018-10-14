import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatChipsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { SearchCityComponent } from './weather/search-city/search-city.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    SearchCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
