import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class AdminDashboard {
  // injecting the router
  static inject() { return [Router]; }

  constructor(router) {
    this.router = router;
  }

  created() {
    // check if user is a admin
    if (sessionStorage.getItem('userType') != "admin") {
      this.router.navigate('userdashboard');
    }
  }

  // function to logout
  logout() {
    sessionStorage.removeItem('accessToken'); // remove access token
    this.router.navigate(''); // navigate to login page
  }
}