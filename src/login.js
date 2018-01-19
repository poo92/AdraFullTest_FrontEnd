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
  console.log(this.username,this.password);
  if (typeof this.username == 'undefined'){
    alert("Please enter a username.");
  }else if(typeof this.password == 'undefined'){
    alert("Please enter a password.");
  }else{
    var userRequest = {"username": this.username,"password":this.password};           
    httpClient.fetch('http://adranew.azurewebsites.net/api/User/Login',
    {
        method: "POST",
        body: json(userRequest)                 
     })
     .then(response => response.json())
     .then(data => {  
       if(data == 0){
         alert("invalid Credentials. Please check again");
       }else if(data == 1){
        this.router.navigate('admindashboard');        
       }else{
        this.router.navigate('userdashboard')

       }
                       
     });
        
  }

    
    
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