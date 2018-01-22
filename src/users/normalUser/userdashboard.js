import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as URLCONFIG from '../../custom/urlconfig';

let httpClient = new HttpClient();
export class UserDashboard {
    // injecting the router
    static inject() { return [Router]; }

    constructor(router) {
        this.router = router;
        this.year = 2017;
        this.showmodal = false; // hide result panel
        this.accountBalance = null;
        this.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.active = false;    //for activity indicator

    }
    created() {
        // check if user is a normal user
        if (sessionStorage.getItem('userType') != "normaluser") {
            this.router.navigate('admindashboard');
        }
    }
    view() {         
        if (typeof (this.accountType) == 'undefined') { // if account type is not selected
            alert("Please select an account type.");
        } else {
            this.active = true;   // show activity indicator
            var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');  // set the access token
            var userRequest = { "accountType": this.accountType };
            httpClient.fetch(URLCONFIG.BASE_URL + 'api/AccountBalance/ViewCurrentBalance',
                {
                    method: "POST",
                    body: json(userRequest),
                    headers: {
                        'Authorization': authorize
                    }
                })
                .then(response => response.json())
                .then(data => {
                    var isEmptyDb = data[0];
                    // if db is empty
                    if (isEmptyDb == 1) {
                        this.active = false;  // hide the activity indicator
                        alert("no account balances are uploaded yet");
                    } else {
                        this.active = false;  // hide the activity indicator
                        // show current balance
                        this.currentBalance = data[1];
                        this.showmodal = true;
                    }
                });
        }

    }
    // method to log out
    logout() {
        sessionStorage.removeItem('accessToken');   // remove access token
        this.router.navigate('');   // navigate to login page
    }

}
