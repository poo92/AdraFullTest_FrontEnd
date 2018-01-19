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
      { route: 'admindashboard/uploadaccountbalance',  moduleId: './users/admin/accountbalances/uploadaccountbalance', name:'admindashboard/uploadaccountbalance', nav:true },
      { route: 'admindashboard/viewaccountbalance',  moduleId: './users/admin/accountbalances/viewaccountbalance', name:'admindashboard/viewaccountbalance', nav:true },
      { route: 'admindashboard/viewaccountbalancesummary',  moduleId: './users/admin/accountbalances/viewaccountbalancesummary', name:'admindashboard/viewaccountbalancesummary', nav:true },      
      { route: 'admindashboard/adduser',  moduleId: './users/admin/users/adduser', name:'admindashboard/adduser', nav:true },      
      { route: 'admindashboard/deleteuser',  moduleId: './users/admin/users/deleteuser', name:'admindashboard/deleteuser', nav:true }      
    
    ]);

    this.router = router;
  }
}
