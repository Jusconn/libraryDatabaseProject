# Overview
This is a fullstack application designed to interface with a library database. The purpose of this application is to serve as an admin tool to be used by library staff for simple tasks such as checking out and returning books. Searching inventory, loaning out devices etc. The fronted was built in React using NextJS and Material UI. The backend uses NestJS to build out an API that interfaces with a mySQL database hosted on port 3000.

# Setup Instructions
If you want to run this application locally on your device I have created some simple setup instructions to help you get it running. 

First you'll want to copy this repo to your local machine. You will need docker installed. 
Create a docker container for the mySQL database using the following lines:


`docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=mydb -p 3306:3306 -d mysql:latest`

Then (replace /path with actual path):

`docker cp /path/to/libraryDump.sql mysql-container:/dumpfile.sql`

Finally:

`docker exec -i mysql-container mysql -u root -p yourpassword mydb < /path/to/dumpfile.sql`

Now you should be able to boot up the container and then enter the `library-backend` folder and run `npm run start` to boot up the nestJS server. Finally go to your `library-frontend` file and run `npm run dev` to get the GUI working on localhost:3001. You should now be able to use the application.