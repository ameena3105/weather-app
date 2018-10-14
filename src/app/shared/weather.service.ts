import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class WeatherModel {
  constructor(readonly city: string, readonly type: WeatherType, readonly description: string,
    readonly tempature: number, readonly sunrise: Date, readonly sunset: Date) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherModels: WeatherModel[] = [];
  unit = 'metric';

  constructor(private http: HttpClient) { }
  url: string =  `https://api.openweathermap.org/data/2.5/`;
  apiID: string = '45f4dd45e0f724512ba044c5a2caf4bc';

  getCurrentWeather(city): Observable<WeatherModel>{
    return this.http.get(`${this.url}weather?q=${city}&units=${this.unit}&APPID=${this.apiID}`)
      .pipe(
        map((res:any) => {
          console.log('Response', res);
          const weather = res.weather[0];
          const temp = res.main.temp;
          const sunrise = res.sys.sunrise * 1000;
          const sunset = res.sys.sunset * 1000;
          const model = new WeatherModel(city, getWeatherType(weather.id), weather.description, temp,
          new Date(sunrise), new Date(sunset));
          this.weatherModels.push(model);
          return model;
        }),
        catchError(this.formatErrors)
      )
  }

  getWeatherTest(lat,lon){
    return this.http.get(this.url+`?lat=${lat}&lon=${lon}`+this.apiID)
      .pipe(
        tap(res => console.log(res)),
        catchError(this.formatErrors)
      )
  }


  private formatErrors(error: any) {
    return  throwError(error.error);
  }
}


function getWeatherType(weatherId: number): WeatherType {
  if (weatherId >= 200 && weatherId < 300) {
    return WeatherType.lightning;
  }

  if (weatherId >= 300 && weatherId < 600) {
    return WeatherType.rain;
  }

  if (weatherId >= 600 && weatherId < 700) {
    return WeatherType.snow;
  }

  if (weatherId >= 700 && weatherId < 800) {
    return WeatherType.fog;
  }

  if (weatherId === 800) {
    return WeatherType.clear;
  }

  if (weatherId === 801) {
    return WeatherType.partialClear;
  }


  if (weatherId >= 801 && weatherId < 900) {
    return WeatherType.cloud;
  }

  return WeatherType.unknown;
}
export enum WeatherType {
  cloud,
  fog,
  clear,
  rain,
  partialClear,
  lightning,
  snow,
  unknown
}