import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreeStatusListPage } from './tree-status-list';

@NgModule({
  declarations: [
    TreeStatusListPage,
  ],
  imports: [
    IonicPageModule.forChild(TreeStatusListPage),
  ],
})
export class TreeStatusListPageModule {}
