import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import $ from "jquery";
import Hightcharts from "highcharts";
import * as URLCONFIG from '../../../custom/urlconfig';
import * as CONSTANTS from '../../../custom/constants';

let httpClient = new HttpClient();

@inject(Router)
export class ViewAccountBalanceSummary {
    constructor(router) {
        this.router = router;
        this.startYear = 2017;
        this.endYear = 2017;
        this.showmodal = false;  // hide result panel
        this.accountBalance = null;
        this.monthsArray = CONSTANTS.MONTHS_ARRAY;
        this.active = false;    //for activity indicator
    }

    created() {
        // check if user is a admin
        if (sessionStorage.getItem('userType') != "admin") {
            this.router.navigate('userdashboard');
        }
    }
    // to get the name of the month
    months = CONSTANTS.MONTHS;

    view() {
        if (this.startYear == '') { // if year is not selected
            alert("Please select a start year");
        } else if (this.endYear == '') { // if year is not selected
            alert("Please select a end year");
        } else if (this.startYear.length < 4) {
            alert("Please enter a valid start year");
        } else if (this.endYear.length < 4) {
            alert("Please enter a valid end year");
        } else if (this.startMonth == null) { // if start month is not elected
            alert("Please select start month");
        } else if (this.endMonth == null) {  // if start month is not elected
            alert("Please select end month");
        } else {
            // check validity of parameters
            if (this.startYear > this.endYear) {
                alert(" Start Year must be eqal or less than the End Year. \n Please enter valid values.");
            } else if (this.startYear == this.endYear) {
                if (this.startMonth > this.endMonth) {
                    alert(" Start Month must be eqal or less than End Month. \n Please enter valid values.");
                } else {
                    // startYear == endYear && startMonth <= endMonth
                    this.showmodal = true;
                    this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth); // method to create chart
                }
            } else {
                // startYear < endYear
                this.showmodal = true;
                this.getChart(this.startYear, this.startMonth, this.endYear, this.endMonth);    // method to create chart
            }


        }


    }

    getChart(startYear, startMonth, endYear, endMonth) {
        this.active = true;   // show activity indicator
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken'); // set the access token                
        var userRequest = { "startYear": startYear, "startMonth": startMonth, "endYear": endYear, "endMonth": endMonth }; // request body          
        // call the web api method      
        httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewBalanceChart',
            {
                method: "POST",
                body: json(userRequest),
                headers: {
                    'Authorization': authorize
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) { // if no account balances for that period
                    this.active = false;  // hide the activity indicator
                    alert("No account balances are available for this time period");
                } else if (data.Message) {
                    this.active = false;  // hide the activity indicator
                    alert(data.Message);
                } else { // if balances exists
                    this.active = false;  // hide the activity indicator

                    var year = [];
                    var month = [];
                    var rnd = [];
                    var canteen = [];
                    var ceocar = [];
                    var marketing = [];
                    var parking = [];

                    var i;
                    for (i = 0; i < data.length; i++) { // set account balance values to arrays
                        var value = data[i];
                        year.push(value.year);
                        month.push(this.monthsArray[value.month - 1]);
                        rnd.push(value.rnd);
                        canteen.push(value.canteen);
                        ceocar.push(value.ceocar);
                        marketing.push(value.marketing);
                        parking.push(value.parking);
                    }

                    // create the chart
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
                }
            });
    }

}