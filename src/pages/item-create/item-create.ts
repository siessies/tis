import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { TreeType } from '../../models/treeType';
import { TreeTypes } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;

  currentTreeTypes: TreeType[];
  treeTypes: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,
              public restProvider: RestProvider) {
    this.form = formBuilder.group({
      profilePic: [''],
      key: ['', Validators.required],
      name: ['', Validators.required],
      treeType: ['']
    });

    this.getTreeTypes();

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
    });
  }

  getTreeTypes() {
    this.restProvider.getTreeTypes()
      .then(data => {
        this.treeTypes = data;
        this.currentTreeTypes = this.treeTypes;
        console.log(this.currentTreeTypes);
      });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }

    // Call rest to create
    this.restProvider.postTrees(this.form)
    .subscribe((res) => {
      //this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to process
      let toast = this.toastCtrl.create({
        message: 'this.loginErrorString',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });


    this.viewCtrl.dismiss(this.form.value);
  }
  
}
