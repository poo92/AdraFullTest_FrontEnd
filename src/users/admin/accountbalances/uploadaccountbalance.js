import {inject} from 'aurelia-framework';
import{Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class UploadAccountBalance{
    static inject() { return [Router]; }

    constructor(router) {  
       this.router = router;  
       this.filecontent="";  
       this.year =2017;
      }

    fileSelected() {
        var authorize = 'Bearer ' + sessionStorage.getItem('accessToken'); 
        var file = document.getElementById("file").files[0];
        if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            this.filecontent = evt.target.result;
        }.bind(this)
        reader.onerror = function (evt) {
           alert("An error occured while reading file. Please try again later.");
        }
    }
    
}

upload(){
    var authorize = 'Bearer ' + sessionStorage.getItem('accessToken');       
    if(this.filecontent == ""){
        alert("please select a file to upload");
    }else{
        var userRequest = {"year": this.year,"fileContent":this.filecontent };           
        httpClient.fetch('http://localhost:25882/api/AccountBalance/UploadBalance',
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
             alert(data);   
             this.router.navigate('admindashboard');                                                                     
         });
    }
        
   
}
}