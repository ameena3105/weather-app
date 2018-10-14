import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
//import { default as CityData } from '../shared/cities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl();
  //cities = CityData;
  options: string[] = ['Bangalore', 'London', 'New York', 'Las Vegas', 'California', 'Jaipr', 'Bhopal', 'Rajkot', 'Surat', 'Ranchi', 'Chandigarh'];
  filteredOptions: Observable<string[]>;
  lat: any;
  lon: any;
  city: string;
  
  ngOnInit() {
    this.geoFindMe();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  geoFindMe() {
    if (!navigator.geolocation){
      alert("Geolocation is not supported by your browser");
      return;
    }
    function success(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //this.lat = lat;
      //this.lon = lon;
      console.log(lat,lon);
      //this.city = 'bangalore';
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  getCity(val){
    console.log(val.option.value);
    this.city = val.option.value.toLowerCase();
  }
  
  getSlectedWeather(city){
    this.city = city;
  }
}
