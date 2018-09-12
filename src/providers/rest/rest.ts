import { HttpClientModule, HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import config from '../../assets/config.json';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // apiUrl = "https://ws.kitsti.com/index.php/api";
  // apiUrl = "http://wsApi.localhost/api";
  apiUrl = "/apiServer";
  // apiUrl = config.wsPath;

  tokenArray: any;
  companyId: any;
  configHeaders: any;
  
  constructor(public http: HttpClient) {
    console.log('Constructor RestProvider');
  }

  /* login */

  login(accountInfo: any) {

    const config = {headers: new HttpHeaders().set('Accept', 'application/json') };

    const params = new HttpParams()
      .set('email', accountInfo.email)
      .set('password', accountInfo.password); // params, headers are immutable objects, therefore: sets chain

    console.log('In rest.login', params);

    let request = this.http.post(this.apiUrl + '/login', params, config).share();
    console.log(this.apiUrl+'/login/', accountInfo);

    request.subscribe((res: any) => {
      console.log(res);
      if (res.token_type == 'Bearer') {
        this.tokenArray = res;
        this.companyId = 1;
        this.configHeaders = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenArray.access_token)};

        console.log('OK-login');
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return request;
  }

  /* trees */

  getTrees() {
    console.log('In rest.getTrees');
    return new Promise(resolve => {

      let request = this.http.get(this.apiUrl + '/company/' + this.companyId + '/trees', this.configHeaders).share();

      request.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  postTrees(formData: any) {
  
    const params = new HttpParams()   // params, headers are immutable objects, therefore: sets chain
      .set('key', formData.value.key)
      .set('name', formData.value.name)
      .set('active', '1')
      .set('treeTypeId', formData.value.treeType)
      .set('statusId', formData.value.status)
      .set('picture', formData.value.picture); 

    console.log('In rest.postTrees', params);
    
    let request = this.http.post(this.apiUrl + '/company/' + this.companyId + '/trees', params, this.configHeaders).share();

    request.subscribe((res: any) => {
      //console.log(res);
      if (res.success == 'true') {
        //console.log(res.msg);
      }
    }, err => {
      //console.error('ERROR', err);
    });

    return request;

  }

  /* treeTypes */

  getTreeTypes() {
   return new Promise(resolve => {
      let request = this.http.get(this.apiUrl + '/company/' + this.companyId + '/treeTypes', this.configHeaders).share();

      request.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  /* status */

  getStatus() {
   return new Promise(resolve => {
      let request = this.http.get(this.apiUrl + '/company/' + this.companyId + '/status', this.configHeaders).share();

      request.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  /* users */

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
          });
    });
  }

}
