import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://ws.kitsti.com';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  /* login */

  login(data) {
    return new Promise(resolve => {
      console.log(this.apiUrl+'/login/', JSON.stringify(data));
      this.http.post(this.apiUrl+'/login', JSON.stringify(data)).subscribe(res => {
        console.log(res);
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  /* t0 */

  getT0() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/t0').subscribe(res => {
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
