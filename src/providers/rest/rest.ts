import { HttpClient, HttpHeaders  } from '@angular/common/http';
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
  tokenArray: any;
  companyId: integer;
  
  constructor(public http: HttpClient) {
    console.log('Constructor RestProvider');
  }

    /* Alfred 2018
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
  login(accountInfo: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let request = this.http.post(this.apiUrl + '/login', JSON.stringify(accountInfo), headers).share();
    console.log(this.apiUrl+'/login/', accountInfo);

    request.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.token_type == 'Bearer') {
        this.tokenArray = res;
        this.companyId = 1;
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
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.tokenArray.access_token);
      headers.append('Accept', 'application/json');
      
      let request = this.http.get(this.apiUrl + '/company/' + this.companyId + '/trees', {}, headers).share();

      request.subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }


  /*
  loginX(data) {
    return new Promise(resolve => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      console.log(this.apiUrl+'/login/', data);
      
      this.http.post(this.apiUrl+'/login', JSON.stringify(data)) // , headers)
      .subscribe(res => {
        this.tokenArray = res;
        console.log(this.tokenArray);
        resolve(res);
      }, err => {
        console.log('login.Erróneo');
        console.log(err);
      });
    });
  }
  */

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
