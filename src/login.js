import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
// import {HttpClient, json} from 'aurelia-fetch-client';


// let httpClient = new HttpClient();

export class Login {

    static inject() { return [Router]; }

  constructor(router) {    
    // this.contacts = [];
    // this.accountBalance = null;
    this.router = router;    
  }

login (){
    this.router.navigate('userdashboard')
}

//   created() {
//     httpClient.fetch('http://localhost:25397/api/AccountBalance/GetAccountBalances',
//     {
//         method: "POST"
                 
//     })
//     .then(response => response.json())
//     .then(data => {     
                     
//         this.accountBalance = data[0];                         
//     });
    
//   }

  
  
}