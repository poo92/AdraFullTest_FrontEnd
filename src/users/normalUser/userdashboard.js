import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ValidationRules} from 'aurelia-validation';

let httpClient = new HttpClient();


export class UserDashboard{
    static inject() { return [Router]; } 
    constructor(router) {  
        this.router = router;      
        this.year =2017;
        this.showmodal =false;
        this.accountBalance=null; 
        this.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       
       }


       view(){
           
           if (typeof(this.accountType) == 'undefined') {
            alert( "Please select an account type.");
            
          }else{
            var userRequest = {"accountType": this.accountType};           
            httpClient.fetch('http://adrafulltest.azurewebsites.net/api/AccountBalance/ViewCurrentBalance',
            {
                method: "POST",
                body: json(userRequest)                 
             })
             .then(response => response.json())
             .then(data => {  
                 
                console.log(data);
                var isEmptyDb = data[0];
                // if db is empty
                if (isEmptyDb == 1) {
                    alert("no account balances are uploaded yet");
                } else {
                    // show current balance
                    this.currentBalance = data[1];
                    this.showmodal = true;
                }          
                 
             });
          }
        
       }
         
       }
