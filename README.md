# AdraFullTest_FrontEnd
This is the front end development for Adra Development test deloped using Aurelia framework.

To set up in development environment :
  Prerequities: 
  1. NodeJs with npm istalled (Version 5.6.0)
  2. jspm installed : npm install jspm -g (Version 0.16.53)
  3. Aurelia CLI installed : npm install aurelia-cli -g
  
  Project setup
  1. Clone or download the project
  2. Go to the folder and run npm install in command line.
  3. To run the project : au run
  4. To check the frontend with locally running backend change the BASE_URL in /src/custom/urlconfig.js file.
  5. To build and deploy the project : au build --env prod 
                                       Then copy the file index.html and the scripts folder to the main deployment folder on your server.
