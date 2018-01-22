import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import * as URLCONFIG from './custom/urlconfig' ;


let httpClient = new HttpClient();

export class Login {

  static inject() { return [Router]; }
    
  
  constructor(router) {  
    this.active = false;   
    this.router = router;    
    
  }
 

login (){  
  if (typeof this.username == 'undefined'){
    alert("Please enter a username.");
  }else if(typeof this.password == 'undefined'){
    alert("Please enter a password.");
  }else{
    this.active=true;
    // var userRequest = {"username": this.username,"password":this.password};  
    var userRequest = "grant_type=password&username=" + this.username+ "&password=" + this.password;           
    
    // httpClient.fetch('http://adranew.azurewebsites.net/api/User/Login',
    httpClient.fetch(URLCONFIG.BASE_URL + 'token',    
    {
        method: "POST",
        body: userRequest,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // More options
      }                 
     })
     .then(response => response.json())
     .then(data => {       
      if(data.error){
        alert(data.error_description);
        this.active=false;
      }else if(data.access_token){
        sessionStorage.setItem('accessToken', data.access_token);       
        this.getUserRole();        
      }

      
                       
     });

     

     }
     
        
  }   
  getUserRole(){
      var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');      
      var userRequest = {"Email": this.username};         
      httpClient.fetch(URLCONFIG.BASE_URL + 'api/Account/UserRole',    
      {
          method: "POST",
          body: json(userRequest),
          headers: {
            'Authorization': authorize,
            'Content-Type': 'application/json'
            // More options
        }                 
       })
       .then(response => response.json())
       .then(data => {           
         if(data == "admin"){
          sessionStorage.setItem('userType', "admin");
          this.router.navigate('admindashboard');
         }else{
          sessionStorage.setItem('userType', "normaluser");          
          this.router.navigate('userdashboard');  
         }                         
       });
    
    
}

// getUserType(){

// }
  

  
  
}