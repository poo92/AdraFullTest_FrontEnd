import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as URLCONFIG from '../../../custom/urlconfig';

let httpClient = new HttpClient();

@inject(Router)
export class ViewAccountBalance {
  constructor(router) {
    this.router = router;
    this.year = 2017;
    this.showmodal = false; // hide result panel
    this.accountBalance = null;
    this.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.active = false; //for activity indicator
  }

  created() {
    // check if user is a admin
    if (sessionStorage.getItem('userType') != "admin") {
      this.router.navigate('userdashboard');
    }
  }

  // to get the name of the month
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
    if (this.year == '') { // if year is not selected
      alert("Please select a year");
    } else if (this.year.length < 4) {
      alert("Please enter a valid  year");
    } else if (this.month == null) { // if month is not selected
      alert("Please select a month");
    } else {
      this.active = true; // show activity indicator
      var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');   // set the access token
      var userRequest = { "year": this.year, "month": this.month };     // request body
      // call the web api method      
      httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewBalance',
        {
          method: "POST",
          body: json(userRequest),
          headers: {
            'Authorization': authorize,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.year == 0) {  // if no record for the month in the db
            this.active = false; // hide the activity indicator
            alert("No account balances are available for this month");
            this.router.navigate('admindashboard/viewaccountbalance'); // navigate to same page
          } else {  // if no record for the month is in the db
            this.active = false; // hide the activity indicator
            if (data.Message) {
              alert(data.Message);
            } else {
              this.accountBalance = data; // set account balance data fron response
              this.accountBalance.month = this.monthsArray[data.month - 1]; // get the month according to month id
              this.showmodal = true; // show the result panel        
            }

          }
        });
    }

  }

}