import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import * as URLCONFIG from '../../../custom/urlconfig' ;

let httpClient = new HttpClient();
export class UploadAccountBalance{
    // injecting the router
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;  
       this.filecontent="";  
       this.year =2017;
       this.active = false; //for activity indicator
      }

      created(){
        // check if user is a admin
        if(sessionStorage.getItem('userType') != "admin"){
          this.router.navigate('userdashboard');            
        }
    }

    fileSelected() {
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken'); // set the access token to the header
        // get the file
        var file = document.getElementById("file").files[0]; 

        if (file) {     //if file is not empty
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {            
            this.filecontent = evt.target.result;   // set the file content
        }.bind(this)
        reader.onerror = function (evt) {
           alert("An error occured while reading file. Please try again later.");
        }
    }
    
}

// method to upload the balances
upload(){
    var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');       // set the access token to the header
    if(this.filecontent == ""){ // if file is not selected
        alert("please select a file to upload");
    }else{
        this.active=true; // show activity indicator
        var userRequest = {"year": this.year,"fileContent":this.filecontent };   // requsest body
        // call the web api method 
        httpClient.fetch( URLCONFIG.BASE_URL + 'api/AccountBalance/UploadBalance',
        {
            method: "POST",
            body: json(userRequest),
            headers: {
                'Authorization': authorize
            }                 
         })
         .then(response => response.json())
         .then(data => {       
            this.active=false;  // hide activity indicator                 
            alert(data);   // show the error or the sucess message
            this.router.navigate('admindashboard/uploadaccountbalance'); // navigate to the same page                                                                    
         });
    }
        
   
}
}