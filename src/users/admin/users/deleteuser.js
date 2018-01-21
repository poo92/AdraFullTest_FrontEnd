import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import * as URLCONFIG from '../../../custom/urlconfig' ;

let httpClient = new HttpClient();
export class DeleteUser{
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;  
       
      }
    }