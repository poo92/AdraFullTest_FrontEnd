import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ValidationRules} from 'aurelia-validation';
import * as URLCONFIG from '../../custom/urlconfig' ;

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

       created(){
        if(sessionStorage.getItem('userType') != "normaluser"){
          this.router.navigate('admindashboard');            
        }
    }


       view(){
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');         
           if (typeof(this.accountType) == 'undefined') {
            alert( "Please select an account type.");
            
          }else{
            var userRequest = {"accountType": this.accountType};           
            httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewCurrentBalance',
            {
                method: "POST",
                body: json(userRequest),
                headers: {
                    'Authorization': authorize
                    // 'Content-Type': 'application/json'
                    // More options
                }                 
             })
             .then(response => response.json())
             .then(data => { 
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
         logout(){
        sessionStorage.removeItem('accessToken');
        this.router.navigate('');
      }
         
       }
