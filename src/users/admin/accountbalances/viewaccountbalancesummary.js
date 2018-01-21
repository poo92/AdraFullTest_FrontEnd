import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import $ from "jquery";
import Hightcharts from "highcharts";
import * as URLCONFIG from '../../../custom/urlconfig' ;

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
              
              if(this.startMonth == null){
                alert("Please select start month");
              }else if(this.endMonth == null){
                alert("Please select end month");
              }else{
                     // check validity of parameters
            if (this.startYear > this.endYear) {
                alert(" Start Year must be eqal or less than the End Year. \n Please enter valid values.");
            } else if (this.startYear == this.endYear) {
                if (this.startMonth > this.endMonth) {
                    alert(" Start Month must be eqal or less than End Month. \n Please enter valid values.");
                } else {
                    // startYear == endYear && startMonth <= endMonth
                    this.showmodal =true;
                    this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth);
                }
            } else {
                // startYear < endYear
                this.showmodal =true;
                this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth);
            }
           

              }

         
        }

        getChart(startYear,startMonth,endYear,endMonth){
            var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');                 
            var userRequest = {"startYear": startYear,"startMonth":startMonth,"endYear": endYear,"endMonth":endMonth };           
            httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewBalanceChart',
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
                var year = [];
                var month = [];
                var rnd = [];
                var canteen = [];
                var ceocar = [];
                var marketing = [];
                var parking = [];
                
                 var i;
                 for(i=0; i<data.length; i++ ){
                    var value = data[i];
                    year.push(value.year);
                    month.push(this.monthsArray[value.month - 1]);
                    rnd.push(value.rnd);
                    canteen.push(value.canteen);
                    ceocar.push(value.ceocar);
                    marketing.push(value.marketing);
                    parking.push(value.parking);
                 }       
                      
                

                 Highcharts.chart('chart', {
                    
                                        title: {
                                            text: 'Account balance summary'
                                        },
                    
                                        subtitle: {
                                            text: 'From ' + month[0] + ' ' + year[0] + ' To ' + month[month.length - 1] + '  ' + year[year.length - 1] + ''
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
                                            categories: month
                                        },
                                        legend: {
                                            layout: 'vertical',
                                            align: 'right',
                                            verticalAlign: 'middle'
                                        },
                                        series: [{
                                            name: 'R&D',
                                            data: rnd
                                        }, {
                                            name: 'Canteen',
                                            data: canteen
                                        }, {
                                            name: 'Ceo\'s car',
                                            data: ceocar
                                        }, {
                                            name: 'Marketing',
                                            data: marketing
                                        }, {
                                            name: 'Parking Fines',
                                            data: parking
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

             });
        }



        HandleViewBalanceModal(){
            this.showmodal =false;
            this.router.navigate('admindashboard');                                                                     
  
        }

        
}