import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import * as URLCONFIG from '../../../custom/urlconfig' ;

let httpClient = new HttpClient();
export class ViewAccountBalance{
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;         
       this.year =2017;
       this.showmodal =false;
       this.accountBalance=null; 
       this.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       this.active = false;
      }

      created(){
        if(sessionStorage.getItem('userType') != "admin"){
          this.router.navigate('userdashboard');            
        }
    }

      months = [
        { id: 1, name: 'January' },
        { id: 2, name: 'February' },
        { id: 3, name: 'March' },
        { id: 4, name: 'April' },
        { id: 5, name: 'May' },
        { id: 6, name: 'June' },
        { id: 7, name: 'July' },
        { id: 8, name: 'August' },
        { id: 9, name: 'September' },
        { id: 10, name: 'October' },
        { id: 11, name: 'November' },
        { id: 12, name: 'December' },
      ];

      view() {         
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');   
          if(this.month == null){
            alert("Please select a month");
          }  else{
            this.active=true;
            var userRequest = {"year": this.year,"month":this.month };           
        //   httpClient.fetch('http://adratest.azurewebsites.net/api/AccountBalance/ViewBalance',
        httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewBalance',
        
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
               if(data.year==0){
                this.active=false;                
                alert("No account balances are available for this month");
                this.router.navigate('admindashboard/viewaccountbalance');
               }else{
                this.active=false;
                this.accountBalance = data;
                this.accountBalance.month = this.monthsArray[data.month - 1];
                this.showmodal =true;
               }               
           });
          }    
          
      }
      HandleViewBalanceModal(){
          this.showmodal =false;
          this.router.navigate('admindashboard');                                                                     

      }
}