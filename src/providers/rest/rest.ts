import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // apiUrl = 'http://ws.kitsti.com';
  // apiUrl = 'http://ws.kitsti.com/wsApi/public/api';
  apiUrl = 'http://wsApi.localhost/api';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

    /*
      let serialize = function(obj, prefix) {
            var str = [];
            for(var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    var item = '';
                    if (typeof v === "object") {
                        item = serialize(v, k);
                    }
                    else {
                        item = encodeURIComponent(k)+"="+encodeURIComponent(v);
                    }

                    if (item !== '') {
                        str.push(item);
                    }
                }
            }
            return str.join("&");
        };
        Using:
        this.http.post(this.apiUrl+'/login', serialize({email:"admin@admin.com",password:"1234"}), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}})
    */

  /* login */

  login(data) {
    return new Promise(resolve => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      console.log(this.apiUrl+'/login/', data);
      
      this.http.post(this.apiUrl+'/login', JSON.stringify(data), headers)
      .subscribe(res => {
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
