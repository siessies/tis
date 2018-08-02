import { Injectable } from '@angular/core';

import { TreeType } from '../../models/treeType';
import { Api } from '../api/api';

@Injectable()
export class TreeTypes {
treeTypes
  constructor(public api: Api) { }

  query(params?: any) {
  console.log('Query to bring TreeTypes? Not passing here...');
    return this.api.get('/treeTypes', params);
  }

  add(treeType: TreeType) {
  }

  delete(treeType: TreeType) {
  }

}
