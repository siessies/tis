import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  trees: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
              public restProvider: RestProvider) {
    // this.currentItems = this.items.query();
    this.getTrees();
  }

  getTrees() {
    this.restProvider.getTrees()
      .then(data => {
        this.trees = data;
        this.currentItems = this.trees;
        //console.log(this.currentItems);
      });
  }


  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        item['picture'] = '';
        item['treeStatus'] = '';
        this.currentItems.push(item);
        console.log(this.currentItems);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
