import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class ViewAccountBalanceSummary{
    static inject() { return [Router]; }

    constructor(router) {  
        this.router = router;         
        this.startYear =2017;
        this.endYear =2017;
        this.showmodal =false;
        this.accountBalance=null; 
        this.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
              console.log(this.startYear,this.startMonth,this.endYear,this.endMonth);
            var userRequest = {"startYear": this.startYear,"startMonth":this.startMonth,"endYear": this.endYear,"endMonth":this.endMonth };           
            httpClient.fetch('http://localhost:58967/api/AccountBalance/ViewBalanceChart',
            {
                method: "POST",
                body: json(userRequest)                 
             })
             .then(response => response.json())
             .then(data => {  
                 console.log(data);
                //  if(data.year==0){
                //   alert("No account balances are available for this month");
                //   this.router.navigate('admindashboard');
                //  }else{
                //   this.accountBalance = data;
                //   this.accountBalance.month = this.monthsArray[data.month - 1];
                //   this.showmodal =true;
                //  }
                 
             });
        }
        HandleViewBalanceModal(){
            this.showmodal =false;
            this.router.navigate('admindashboard');                                                                     
  
        }
}