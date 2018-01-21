import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class AdminDashboard {

    static inject() { return [Router]; }
    constructor(router) {     
        this.router = router;    
      }

      created(){
          if(sessionStorage.getItem('userType') != "admin"){
            this.router.navigate('userdashboard');            
          }
      }

      logout(){
        sessionStorage.removeItem('accessToken');
        this.router.navigate('');
      }
}