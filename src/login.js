import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as URLCONFIG from './custom/urlconfig';


let httpClient = new HttpClient();

export class Login {
  // injecting the router
  static inject() { return [Router]; }


  constructor(router) {
    this.active = false; //for activity indicator
    this.router = router;

  }


  login() {
    if (typeof this.username == 'undefined') { // if username is empty
      alert("Please enter a username.");
    } else if (typeof this.password == 'undefined') { // if password is empty
      alert("Please enter a password.");
    } else {
      this.active = true; // show activity indicator
      var userRequest = "grant_type=password&username=" + this.username + "&password=" + this.password;      // requsest body     
      // call the web api method to authenticate the user and get access token
      httpClient.fetch(URLCONFIG.BASE_URL + 'token',
        {
          method: "POST",
          body: userRequest,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error_description);
            this.active = false;  // hide activity indicator 
          } else if (data.access_token) { // if login is successful
            sessionStorage.setItem('accessToken', data.access_token); // set the access token
            this.getUserRole(); // get user role 
          }
        });



    }


  }
  getUserRole() {
    var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');   // set the access token to the header
    var userRequest = { "Email": this.username }; // requsest body
    // call the web api method to get the role of user 
    httpClient.fetch(URLCONFIG.BASE_URL + 'api/Account/UserRole',
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
        if (data == "admin") { // if user type is admin
          sessionStorage.setItem('userType', "admin"); // set user type to admin
          this.router.navigate('admindashboard'); // navigate to admindashboard
        } else {  // if user type is normal user
          sessionStorage.setItem('userType', "normaluser"); // set user type to normal user
          this.router.navigate('userdashboard');  // navigate to userdashboard
        }
      });
  }
}