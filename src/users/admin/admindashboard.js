import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class AdminDashboard {

    static inject() { return [Router]; }
    constructor(router) {     
        this.router = router;    
      }

      logout(){
        sessionStorage.removeItem('accessToken');
        this.router.navigate('');
      }
}