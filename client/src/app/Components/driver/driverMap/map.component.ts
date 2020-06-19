import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { SharedData } from '../../../services/sharedData';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() transaction: any;
  location: Location;

  constructor(private mapService: MapService, private sharedData: SharedData) {}
  ngOnInit() {
        this.location = {
          latitude: this.transaction.latitude_start,
          longitude: this.transaction.longitude_start,
          mapType: 'hybrid',
          zoom: 14,
          markers: [
            {
              lat: this.transaction.latitude_start,
              lng: this.transaction.longitude_start,
              adress: this.transaction.address_start,
              iconUrl: 'https://i.ibb.co/MMv5Dj1/MARKER222.png',
            },
            {
              lat: this.transaction.latitude_destination,
              lng: this.transaction.longitude_destination,
              adress: this.transaction.address_destination,
              iconUrl: 'https://i.ibb.co/hVN23Nb/Sans-titre-2222666.png'
            }
          ],
        };
}
}

interface Marker {
  lat: number;
  lng: number;
  adress: string;
  iconUrl: string;
}

interface Location {
  latitude: number;
  longitude: number;
  mapType: string;
  zoom: number;
  markers: Array<Marker>;
}
