import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
//import { UserAddTransactionComponent } from "../user-add-transaction/user-add-transaction.component";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
//@ViewChild(UserAddTransactionComponent)
export class MapComponent implements OnInit, OnChanges {
  @Input() newLocation: NewLocation;
  @Output() adressDepart = new EventEmitter<number>();

  counter = 1;
  location: Location;
  selectedMarker: Marker;
  adress: string = "From : Pick-up address";
  url: string = "";
  iconUrl: string = "https://i.ibb.co/MMv5Dj1/MARKER222.png";

  constructor() {} //private addTransaction: UserAddTransactionComponent

  ngOnChanges() {
    //  this.setLocation();
  }
  ngOnInit() {
    this.setLocation();
  }
  setLocation() {
    console.log("newloc", this.location);
    this.location = {
      latitude: this.newLocation.latitude, //36.79671626730493,
      longitude: this.newLocation.longitude, //10.18802553773976,
      mapType: "hybrid",
      zoom: 10,
      markers: [
        {
          lat: this.newLocation.latitude,
          lng: this.newLocation.longitude,
          adress: this.adress,
          iconUrl: this.iconUrl,
        },
      ],
    };
  }

  updateMap() {
    // this.location.markers[0].lat = 37.07007538620692;
    // this.location.markers[0].lng = 10.112363560719228;
    // this.adressDepart.emit(this.location.latitude);
  }
  addMarker(lat: number, lng: number, adress: string) {
    if (this.counter === 1) {
      this.location.markers.push({
        lat,
        lng,
        adress:
          "Destination adress here text text text text text text text text text ",
        iconUrl: "https://i.ibb.co/hVN23Nb/Sans-titre-2222666.png",
      });
      this.adressDepart.emit(this.location.latitude);
      console.log("location add marker", lat, lng);
      this.counter++;
    } else {
      console.log("you cannot add a second marker");
    }

    // if (this.location.markers.length === 1) {
    //   this.location.markers[1].adress =
    //     "Destination adress here text text text text text text text text text ";
    //   this.location.markers[1].iconUrl =
    //     "https://icon2.cleanpng.com/20180326/lce/kisspng-google-map-maker-google-maps-computer-icons-pin-5ab9097e1e45d0.617531101522076030124.jpg";
    // }
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      adress: this.adress,
      iconUrl: this.iconUrl,
    };

    this.adressDepart.emit(this.location.latitude);
    console.log("event id", event["_id"]);
    console.log(
      "location when selected",
      event,
      this.selectedMarker.lat,
      this.selectedMarker.lng,
      this.selectedMarker
    );
    //this.location.markers.pop();
    return event;
  }

  markerDragEnd(coords: any, $event: MouseEvent, id) {
    console.log("location end of drag", coords.lat, coords.lng);
    this.location.latitude = coords.lat;
    this.location.longitude = coords.lng;
    this.adressDepart.emit(this.location.latitude);
    console.log("evvv", id);
    //console.log(this.selectMarker(event));
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
interface NewLocation {
  latitude: number;
  longitude: number;
}
