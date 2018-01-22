import { AuthorizeStep } from './authorizestep';
import { Router, RouterConfiguration } from 'aurelia-router';  
import {inject} from 'aurelia-framework'; 
import * as URLCONFIG from './custom/urlconfig' ;

export class App {
  // configure the routing settings
  configureRouter(config, router){
    let self = this;
    config.title = 'Aurelia';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: '',              moduleId: 'login',   title: 'Home'},
      { route: 'admindashboard',  moduleId: './users/admin/admindashboard', name:'admindashboard',auth: true },
      { route: 'userdashboard',  moduleId: './users/normalUser/userdashboard', name:'userdashboard', auth: true }, 
      { route: 'admindashboard/uploadaccountbalance',  moduleId: './users/admin/accountbalances/uploadaccountbalance', name:'admindashboard/uploadaccountbalance', nav:true, auth: true },
      { route: 'admindashboard/viewaccountbalance',  moduleId: './users/admin/accountbalances/viewaccountbalance', name:'admindashboard/viewaccountbalance', nav:true, auth: true },
      { route: 'admindashboard/viewaccountbalancesummary',  moduleId: './users/admin/accountbalances/viewaccountbalancesummary', name:'admindashboard/viewaccountbalancesummary', nav:true, auth: true },      
      { route: 'admindashboard/adduser',  moduleId: './users/admin/users/adduser', name:'admindashboard/adduser', nav:true, auth: true },      
      { route: 'admindashboard/deleteuser',  moduleId: './users/admin/users/deleteuser', name:'admindashboard/deleteuser', nav:true, auth: true }      
    
    ]);

    this.router = router;
  }
}
