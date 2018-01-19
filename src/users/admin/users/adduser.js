import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class AddUser{
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;  
       
      }

      add(){
          console.log(this.username, this.password,this.fname,this.lname,this.userType);
          if (typeof this.username == 'undefined'){
              alert("Please enter a username.");
          }else if(typeof this.password == 'undefined'){
            alert("Please enter a password.");
          }else if(typeof this.fname == 'undefined'){
            alert("Please enter a first name.");
          }else if(typeof this.lname == 'undefined'){
            alert("Please enter a last name.");
          }else if( this.userType == 0){
            alert("Please select a user type.");
          }else{
            var userRequest = {"username": this.username,"password":this.password,"fname":this.fname,"lname":this.lname,"userType":this.userType };           
            httpClient.fetch('http://adranew.azurewebsites.net/api/User/AddUser',
            {
                method: "POST",
                body: json(userRequest)                 
             })
             .then(response => response.json())
             .then(data => {  
                alert(data);      
                               
             });
          }
      }
    }