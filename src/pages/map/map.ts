import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  /*
  start = 'los angeles, ca';
  end = 'los angeles, ca';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  */

  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, items: Items) {
  	this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.initMap();
  }

  /*	
  initMap() {
  	let location = {'lat': this.item.latitude, 'lng': this.item.longitude};
  	console.log(location);
  	
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      'zoom': 18,
      'center': {'lat': 34.1047938, 'lng': -118.3333819}
    });

    // this.directionsDisplay.setMap(this.map);
  }*/

  initMap() {
  	let latLng = new google.maps.LatLng(this.item.latitude, this.item.longitude);
 
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
