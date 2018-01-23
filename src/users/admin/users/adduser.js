import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as URLCONFIG from '../../../custom/urlconfig';

let httpClient = new HttpClient();
@inject(Router)
export class AddUser {
  constructor(router) {
    this.router = router;
    this.active = false;   //for activity indicator    
  }

  created() {
    // check if user is a admin
    if (sessionStorage.getItem('userType') != "admin") {
      this.router.navigate('userdashboard');
    }
  }

  add() {
    var errorList = []; // ro save errors
    var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');   // set the access token
    if (typeof this.username == 'undefined') { // if username is empty
      alert("Please enter a username.");
    } else if (typeof this.password == 'undefined') {  // if password is empty
      alert("Please enter a password.");
    } else if (typeof this.confirmPassword == 'undefined') { // if confirm password is empty
      alert("Please enter a confirm password.");
    } else if (this.userType == 0) {  // if user typr is empty
      alert("Please select a user type.");
    } else {
      this.active = true; // show activity indicator
      // request body
      var userRequest = { "Email": this.username, "Password": this.password, "ConfirmPassword": this.confirmPassword, "AccountType": this.userType };
      // call the web api method      
      httpClient.fetch(URLCONFIG.BASE_URL + 'api/Account/Register',
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
          this.active = false;  // hide the activity indicator
          if (data.ModelState) { // if web api returns an error
            var ModelStates = data.ModelState;
            for (var key in ModelStates) {
              if (!ModelStates.hasOwnProperty(key)) continue;
              var error = ModelStates[key];
              errorList.push(error); // push error to error list
            }
            var error = errorList[0];
            var errorOne = error[0];
            alert(errorOne);    // show only the first error
          } else { // if user added successfully
            this.active = false;  // hide the activity indicator
            if (data.Message) {
              alert(data.Message);
            } else {
              alert(data);
            }
            this.router.navigate('admindashboard'); // navigate to admindashboard
          }
        }).catch(function (error) {
          console.log();
        });
    }
  }
}