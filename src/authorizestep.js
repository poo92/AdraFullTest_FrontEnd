import {Redirect} from 'aurelia-router';

export class AuthorizeStep {  
  run(routingContext, next) {
    var isLoggedIn = sessionStorage.getItem('accessToken') != null; 
    var loginRoute = '';      

    if (routingContext.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {  // check if user is logged in
        return next.cancel(new Redirect(loginRoute));
      }
    }
    return next();
  }
}