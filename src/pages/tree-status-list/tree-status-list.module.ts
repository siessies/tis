import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TreeStatusListPage } from './tree-status-list';

@NgModule({
  declarations: [
    TreeStatusListPage,
  ],
  imports: [
    IonicPageModule.forChild(TreeStatusListPage),
    TranslateModule.forChild()
  ],
})
export class TreeStatusListPageModule {}
