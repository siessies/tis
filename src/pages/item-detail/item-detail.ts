import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
    open
  }

  /**
   * Navigate to the map page for this item.
   */
  openMap(item: Item) {
    this.navCtrl.push('MapPage', {
      item: item
    });
  }

  /**
   * Navigate to the treeStatus-list page for this item.
   */
  openTreeStatusList(item: Item) {
    this.navCtrl.push('TreeStatusListPage', {
      item: item
    });
  }
}
