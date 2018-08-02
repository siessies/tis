import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  item: any;

  myPositionLatitude: any;
  myPositionLongitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, items: Items, public geolocation: Geolocation) {
  	this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    // this.geolocation.getCurrentPosition(/*options*/).then((position) => {
    //  this.myPositionLatitude = position.coords.latitude;
    //  this.myPositionLongitude = position.coords.longitude;

    //  console.log('this.myPositionLatitude', this.myPositionLatitude, this.myPositionLongitude);

    //  this.initMap();
    // });

    this.initMap();
  }

  initMap() {
  	let latLng = new google.maps.LatLng(this.item.latitude, this.item.longitude);
    // let latLng = new google.maps.LatLng(this.myPositionLatitude, this.myPositionLongitude);
    console.log('tthis.item.latitude', this.item.latitude, this.item.longitude);
    console.log('tthis.myPositionLatitude', this.myPositionLatitude, this.myPositionLongitude);
    
    let mapOptions = {
      center: latLng,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker(){
 	let marker = new google.maps.Marker({
 	  map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
  	});
 
    let content = '<b>' + this.item.key + '<b>' +
    				'<p>' + this.item.name + '</p>'  +
    				'<p>' + this.item.treeTypeName + '</p>';         
 
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
  	});
 
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
