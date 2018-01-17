// export class App {
//   constructor() {
//     this.message = 'Hello World!';
//   }
// }

export class App {
  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: 'login',   title: 'Home'},
      { route: 'admindashboard',  moduleId: './users/admin/admindashboard', name:'admindashboard' },
      { route: 'userdashboard',  moduleId: './users/normalUser/userdashboard', name:'userdashboard' }, 
      { route: 'userdashboard/uploadaccountbalance',  moduleId: './users/admin/accountbalances/uploadaccountbalance', name:'userdashboard/uploadaccountbalance', nav:true },
      { route: 'userdashboard/viewaccountbalance',  moduleId: './users/admin/accountbalances/viewaccountbalance', name:'userdashboard/viewaccountbalance', nav:true },
      { route: 'userdashboard/viewaccountbalancesummary',  moduleId: './users/admin/accountbalances/viewaccountbalancesummary', name:'userdashboard/viewaccountbalancesummary', nav:true }      
    
    ]);

    this.router = router;
  }
}
