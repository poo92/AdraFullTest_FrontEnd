import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class AddUser{
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;  
       
      }

      add(){
        var errorList = [];
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');   
        if (typeof this.username == 'undefined'){
              alert("Please enter a username.");
          }else if(typeof this.password == 'undefined'){
            alert("Please enter a password.");
          }else if(typeof this.confirmPassword == 'undefined'){
            alert("Please enter a confirm password.");
          }else if( this.userType == 0){
            alert("Please select a user type.");
          }else{
            // var userRequest = {"username": this.username,"password":this.password,"fname":this.fname,"lname":this.lname,"userType":this.userType };           
            var userRequest = {"Email": this.username,"Password": this.password,"ConfirmPassword": this.confirmPassword,"AccountType":this.userType};
            console.log(userRequest);
            httpClient.fetch('http://localhost:25882/api/Account/Register',
            {
                method: "POST",
                body: json(userRequest),
                headers: {
                  'Authorization': authorize,
                  'Content-Type': 'application/json'
                  // More options
              }                  
             })
             .then(response => response.json())
             .then(data => { 
              if(data.ModelState){
                var  ModelStates = data.ModelState;         
                for(var key in ModelStates){   
                  if (!ModelStates.hasOwnProperty(key)) continue;                
                  var error = ModelStates[key];                                
                  errorList.push(error);
                }
                var error = errorList[0];  
                console.log(error);              
                var errorOne = error[0];
                console.log(errorOne);
                
                alert(errorOne);
              }else{
                alert(data);
                this.router.navigate('admindashboard');
                

              }
              
                               
             });
          }
      }
    }