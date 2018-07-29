import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';

/**
 * Generated class for the TreeStatusListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tree-status-list',
  templateUrl: 'tree-status-list.html',
})
export class TreeStatusListPage {
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, items: Items) {
  	this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreeStatusListPage');
    console.log(this.item.treeStatus)
  }

}
