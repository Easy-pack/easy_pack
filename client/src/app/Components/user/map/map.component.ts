import { Component, OnInit } from "@angular/core";
import { MapService } from "../../../services/map.service";
import { SharedData } from "../../../services/sharedData";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  counter = 1;
  location: Location;
  selectedMarker: Marker;
  departureAddress: string;
  CityDeparture: string;
  ZipDeparture: number;
  url = "";
  iconUrl = "https://i.ibb.co/MMv5Dj1/MARKER222.png";

  // tslint:disable-next-line:max-line-length
  constructor(private mapService: MapService, private sharedData: SharedData) {}
  ngOnInit() {
    this.mapService
      .getLocation(
        this.sharedData.addMapTransactionData.address_start,
        this.sharedData.addMapTransactionData.city_start,
        this.sharedData.addMapTransactionData.zip_start
      )
      .subscribe((data) => {
        console.log("jeya mel database", data);
        this.sharedData.addMapTransactionData.latitude_start =
          data["results"][0]["geometry"]["location"]["lat"];
        this.sharedData.addMapTransactionData.longitude_start =
          data["results"][0]["geometry"]["location"]["lng"];
        const lat = data["results"][0]["geometry"]["location"]["lat"];
        const lng = data["results"][0]["geometry"]["location"]["lng"];
        this.departureAddress =
          data["results"][0]["address_components"][0]["long_name"];
        this.ZipDeparture = this.sharedData.addMapTransactionData.zip_start;
        this.CityDeparture =
          data["results"][0]["address_components"][4]["long_name"];
        console.log("meloul", lat, lng);
        this.location = {
          latitude: lat,
          longitude: lng,
          mapType: "hybrid",
          zoom: 12,
          markers: [
            {
              lat: lat,
              lng: lng,
              adress: this.sharedData.addMapTransactionData.address_start,
              iconUrl: this.iconUrl,
            },
          ],
        };
      });
  }
  setLocation(latitude, longitude) {
    console.log("ba3d", latitude, longitude);
    this.mapService
      .getLocationByCoords(latitude, longitude)
      .subscribe((data) => {
        this.location.markers[0].adress = data["results"][0][
          "formatted_address"
        ].split(",")[0];
      });
    this.location = {
      latitude: latitude,
      longitude: longitude,
      mapType: "hybrid",
      zoom: 12,
      markers: [
        {
          lat: latitude,
          lng: longitude,
          adress: "",
          iconUrl: this.iconUrl,
        },
      ],
    };
    this.getAddressFromLocation(
      this.location.markers[0].lat,
      this.location.markers[0].lng,
      "0"
    );
  }
  getAddressFromLocation(latitude, longitude, id) {
    this.mapService
      .getLocationByCoords(latitude, longitude)
      .subscribe((data) => {
        console.log("hhh", data);
        if (id === 0) {
          this.location.markers[0].adress = data["results"][0][
            "formatted_address"
          ].split(",")[0];
          this.sharedData.addMapTransactionData.address_start = `${
            data["results"][0]["formatted_address"].split(",")[0]
          }, ${data["results"][0]["address_components"][2]["long_name"]}`;
          this.sharedData.addMapTransactionData.city_start =
            data["results"][0]["address_components"][3]["long_name"];
          this.sharedData.addMapTransactionData.latitude_start =
            data["results"][0]["geometry"]["location"]["lat"];
          this.sharedData.addMapTransactionData.longitude_start =
            data["results"][0]["geometry"]["location"]["lng"];
        } else {
          this.location.markers[1].adress = data["results"][0][
            "formatted_address"
          ].split(",")[0];
          this.sharedData.addMapTransactionData.address_destination = `${
            data["results"][0]["formatted_address"].split(",")[0]
          }, ${data["results"][0]["address_components"][2]["long_name"]}`;
          this.sharedData.addMapTransactionData.city_destination =
            data["results"][0]["address_components"][3]["long_name"];
          this.sharedData.addMapTransactionData.latitude_destination =
            data["results"][0]["geometry"]["location"]["lat"];
          this.sharedData.addMapTransactionData.longitude_destination =
            data["results"][0]["geometry"]["location"]["lng"];
        }
      });
  }
  updateMap() {
    console.log(this.sharedData.addMapTransactionData);
    this.mapService
      .getLocation(
        this.sharedData.addMapTransactionData.address_start,
        this.sharedData.addMapTransactionData.city_start,
        this.sharedData.addMapTransactionData.zip_start
      )
      .subscribe((data) => {
        this.location.markers[0].lat =
          data["results"][0]["geometry"]["location"]["lat"];
        this.sharedData.addMapTransactionData.latitude_start = this.location.markers[0].lat;
        this.location.markers[0].lng =
          data["results"][0]["geometry"]["location"]["lng"];
        this.sharedData.addMapTransactionData.longitude_start = this.location.markers[0].lng;
      });
    this.mapService
      .getLocation(
        this.sharedData.addMapTransactionData.address_destination,
        this.sharedData.addMapTransactionData.city_destination,
        this.sharedData.addMapTransactionData.zip_destination
      )
      .subscribe((data) => {
        if (this.counter === 1) {
          this.addMarker(
            data["results"][0]["geometry"]["location"]["lat"],
            data["results"][0]["geometry"]["location"]["lng"]
          );
        }
        this.location.markers[1].lat =
          data["results"][0]["geometry"]["location"]["lat"];
        this.sharedData.addMapTransactionData.latitude_start = this.location.markers[1].lat;
        this.location.markers[1].lng =
          data["results"][0]["geometry"]["location"]["lng"];
        this.sharedData.addMapTransactionData.longitude_start = this.location.markers[1].lng;
      });
  }

  addMarker(lat: number, lng: number) {
    if (this.counter === 1) {
      this.location.markers.push({
        lat,
        lng,
        adress: "",
        iconUrl: "https://i.ibb.co/hVN23Nb/Sans-titre-2222666.png",
      });
      this.getAddressFromLocation(
        this.location.markers[1].lat,
        this.location.markers[1].lng,
        "1"
      );
      console.log("location add marker", lat, lng);
      this.counter++;
    } else {
      console.log("you cannot add a second marker");
    }
  }
  markerDragEnd(coords: any, event, markerId) {
    console.log("location end of drag", coords.lat, coords.lng);
    this.location.latitude = coords.lat;
    this.location.longitude = coords.lng;
    this.getAddressFromLocation(
      this.location.latitude,
      this.location.longitude,
      markerId
    );
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
