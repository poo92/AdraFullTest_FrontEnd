import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import $ from "jquery";
import Hightcharts from "highcharts";

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
      
        this.year = [];
        this.month = [];
        this.rnd = [];
        this.canteen = [];
        this.ceocar = [];
        this.marketing = [];
        this.parking = [];
    
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

            // check validity of parameters
            if (this.startYear > this.endYear) {
                alert(" Start Year must be eqal or less than the End Year. \n Please enter valid values.");
            } else if (this.startYear == this.endYear) {
                if (this.startMonth > this.endMonth) {
                    alert(" Start Month must be eqal or less than End Month. \n Please enter valid values.");
                } else {
                    // startYear == endYear && startMonth <= endMonth
                    this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth);
                }
            } else {
                // startYear < endYear
                this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth);
            }



           
        }

        getChart(startYear,startMonth,endYear,endMonth){

            var userRequest = {"startYear": startYear,"startMonth":startMonth,"endYear": endYear,"endMonth":endMonth };           
            httpClient.fetch('http://adratest.azurewebsites.net/api/AccountBalance/ViewBalanceChart',
            {
                method: "POST",
                body: json(userRequest)                 
             })
             .then(response => response.json())
             .then(data => {  
                 console.log(data);
                 var i;
                 for(i=0; i<data.length; i++ ){
                    var value = data[i];
                    this.year.push(value.year);
                    this.month.push(this.monthsArray[value.month - 1]);
                    this.rnd.push(value.rnd);
                    this.canteen.push(value.canteen);
                    this.ceocar.push(value.ceocar);
                    this.marketing.push(value.marketing);
                    this.parking.push(value.parking);
                 }

                 
                

                 Highcharts.chart('chart', {
                    
                                        title: {
                                            text: 'Account balance summary'
                                        },
                    
                                        subtitle: {
                                            text: 'From ' + this.month[0] + ' ' + this.year[0] + ' To ' + this.month[this.month.length - 1] + '  ' + this.year[this.year.length - 1] + ''
                                        },
                    
                                        yAxis: {
                                            title: {
                                                text: 'Amount'
                                            }
                                        },
                    
                                        xAxis: {
                                            title: {
                                                text: 'Time Period'
                                            },
                                            categories: this.month
                                        },
                                        legend: {
                                            layout: 'vertical',
                                            align: 'right',
                                            verticalAlign: 'middle'
                                        },
                                        series: [{
                                            name: 'R&D',
                                            data: this.rnd
                                        }, {
                                            name: 'Canteen',
                                            data: this.canteen
                                        }, {
                                            name: 'Ceo\'s car',
                                            data: this.ceocar
                                        }, {
                                            name: 'Marketing',
                                            data: this.marketing
                                        }, {
                                            name: 'Parking Fines',
                                            data: this.parking
                                        }],
                    
                                        responsive: {
                                            rules: [{
                                                condition: {
                                                    maxWidth: 500
                                                },
                                                chartOptions: {
                                                    legend: {
                                                        layout: 'horizontal',
                                                        align: 'center',
                                                        verticalAlign: 'bottom'
                                                    }
                                                }
                                            }]
                                        }
                                        
                                    });

                               


                //  if(data.length==0){
                //     alert("No account balances are available for this time period");
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