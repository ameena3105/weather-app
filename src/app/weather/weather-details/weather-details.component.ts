import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { WeatherService, WeatherModel, WeatherType } from '../../shared/weather.service';


@Component({
  selector: 'weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnChanges {
  weather: WeatherModel;
  WeatherType = WeatherType;
  _city: string;
  @Input() 
  city: string; 

  

  constructor(private weatherServices: WeatherService) { }

  ngOnInit() {
    this.reset();
    this.getWeather();
  }

  ngOnChanges(changes: SimpleChanges) {
    const city: SimpleChange = changes.city;
    this._city = city.currentValue;
    this.reset();
    this.getWeather();
  }

  getWeather(){
    this.reset();
    this.weatherServices.getCurrentWeather(this._city)
      .subscribe(x =>{ 
        this.weather = x,
        console.log(x)
      });
  }

  getSlectedWeather(city){
    this.reset();
    this.weatherServices.getCurrentWeather(city)
      .subscribe(x =>{ 
        this.weather = x,
        console.log(x)
      });
  }

  reset() {
    this.weather = undefined;
  }

  getWeatherType(type){
    switch (type) {
      case 0:
        return '243px -93px';
      case 1:
        return '239px -23px';
      case 2:
        return '410px -457px';
      case 3:
        return '323px -535px';
      case 4:
        return '323px -821px';
      case 5:
        return '405px -1329px';
      case 6:{
        const now = new Date();
        if (this.weather.sunrise < now)
          return '410px -1104px';
        else if(this.weather.sunset > now)
          return '240px -1104px';
      }
      default:
        return '410px -1104px';
    }
  }
}
