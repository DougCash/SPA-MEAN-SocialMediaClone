# Daily Image Upload Web App
Node.js, Express, Angular and MongoDB Web App  
Goal was to create a web app with CRUD functionality, that implemented user authentication and authorization, to allow the upload of images/text for multiple users.   
Currently not live.

# Technologies Used
Web-App follows general MVC architecture  
Frontend rendered through Angular components  
Node.js backend using Express.js    
Data persists through NoSQL cloud database on MongoDB Atlas  
Supports creating, reading, updating and deleting of data  
Sign-up and Login required to create  
Utilized middleware to handle authorization and authentication  
Images are stored on Node.js server, and then references/link are stored in MongoDB 
Used bcrypt to handle encryption of user sensitive information  
JWT to let users remain signed in for an hour through cookies  
Services/Subscriptions to handle communication of data for the components  (observer)

## Running Locally
cd backend  
node server.js: starts up the backend and connects to the Mongo DB  
cd..  
ng serve: starts up angular server  
