import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { RestProvider } from '../../providers/rest/rest';

import { TreeType } from '../../models/treeType';
import { Status } from '../../models/status';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  form: FormGroup;

  currentTreeTypes: TreeType[];
  treeTypes: any;
  currentStatus: Status[];
  statuses: any;

  // Our translated text strings
  private msgString: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, 
              public toastCtrl: ToastController, public translateService: TranslateService,
              formBuilder: FormBuilder, public camera: Camera,
              public restProvider: RestProvider) {
    this.form = formBuilder.group({
      picture: [''],
      key: ['', Validators.required],
      name: ['', Validators.required],
      treeType: [''],
      status: [''],
      photo: [''],
      id: [0],
      treeTypeId: [0],
      
    });

    this.getTreeTypes();
    this.getStatus();

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
      });
  }

  getStatus() {
    this.restProvider.getStatus()
      .then(data => {
        this.statuses = data;
        this.currentStatus = this.statuses;
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
        this.form.patchValue({ 'picture': 'data:image/jpg;base64,' + data });
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
      this.form.patchValue({ 'picture': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['picture'].value + ')'
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
    console.log(this.form);

    let saved = false;

    // Call rest to create
    this.restProvider.postTrees(this.form)
    .subscribe((res) => {
      this.translateService.get(res['msg']).subscribe((value) => {
      console.log(res);
        this.form.patchValue({ 'id': res['tree']['id'] });
        this.form.patchValue({ 'treeTypeId': res['tree']['treeType'] });
        this.form.patchValue({ 'photo': res['tree']['photo'] });
        this.msgString = value;
        saved = true;
      })
      this.toast(this.msgString, saved);
      //this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to process
      console.log(err.error);
      this.translateService.get(err.error['message']).subscribe((value) => {
        this.msgString = value;
        if(err.error['errors']['key']) {
          this.msgString = this.msgString + ' (' + err.error['errors']['key'] + ')';
        }
     })
      this.toast(this.msgString, saved);
    });
  }

  /**
   * Send messages through the toaster.
   */
  toast(msg, saved) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();

    if(saved) {
      this.viewCtrl.dismiss(this.form.value);
    }
  }


  
}
