import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';


let httpClient = new HttpClient();

export class Login {

    static inject() { return [Router]; }

  constructor(router) {    
    // this.contacts = [];
    // this.accountBalance = null;
    this.router = router;    
  }

login (){
  var year =2017; var month=1;
    // var UserRequest = {"year":2016,"month":1};
    //   httpClient.fetch('http://localhost:58967/api/AccountBalance/ViewBalance',
    //   {
    //       method: "POST",
    //       body: json(UserRequest)
                   
    //   })
    //   .then(response => response.json())
    //   .then(data => {     
    //         console.log(data);           
    //       // this.accountBalance = data[0];                         
    //   });
      
    
    this.router.navigate('admindashboard')
}

  // created() {
  //   httpClient.fetch('http://localhost:25397/api/AccountBalance/GetAccountBalances',
  //   {
  //       method: "POST"
                 
  //   })
  //   .then(response => response.json())
  //   .then(data => {     
                     
  //       this.accountBalance = data[0];                         
  //   });
    
  // }

  
  
}