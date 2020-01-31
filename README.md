# On-Site Drapery

The project exists because the client, OnSite Drapery, isn’t fully satisfied with the current business logistics. A combination of paid and free software/services led to unnecessary overhead and potential loss of sales or client satisfaction. The goals of this project are to optimize business logistics for OnSite Drapery Cleaning. Help the company to become more efficient, faster, less error-prone, and more satisfying to customers. Specifically, the web application should help OnSite Drapery Cleaning to solve these main problems: scheduling, billing, certifications, and web interface.

# Getting started
### Running the Server

This server is created with Express.js

#### Installing:

1. Clone the repository `git clone`
2. Install dependencies `npm install`

#### Running express server:

1) run `npm run start` 

Messages should appear on the console with confirmations that your server is up and running.

### Running the React App

#### Installing: 
1. Navigate into client `cd onSiteDrpaery/client`
  
2. Install dependencies `npm install`

#### Running React:
1. `npm start`

#### Login:
A sample login has been creating in order to demostrate the OAuth feature

username: `testemail@email.com`
password: `passwordy`

Note: Google OAuth is also implemented, but it is restricted to those who already have an account. 

#### Warranty: 

Navigate to "http://localhost:3000" to view the React and Express application.

Last tested on a macOS Mojave system on November 13, 2019 by Elise Dixon.

# Testing

In order to run the test, install Jest. This is a testing framework that will execute .test.js files and yield the corresponding test results.
1) npm i jest superagent supertest
2) add the following script to package.json
    {"test: "jest"}
* if you want to watch jest to watch for changes, put {"test":"jest --watch"} instead.
3) run
    {npm run test}
* if you want to get a full test coverage report, put the following script in your package.json {"testCoverge": "jest --coverage"} and run {npm run testCoverage} in your terminal.

Jest can cover both unit and integration tests, simply putting them in separate files for structure will suffice.

Remember that in order for this to work, the test files have to be written according the jest api.

# Deployment

The production system live on Heroku. A new developer can gain access by join the developer team. We recommend developers to install the Heroku Command Line Interface to deploy the project. This would allow the user to login to heroku, clone the repository, and deploy back to the reposiroty. With Heroku, the only addon that we use is PostgreSQL that allows us to store the data in the database. Developers can use this method to continue to deploy projects to the Heroku host. 

# Technologies used
This application is built using a React frontend with a Node server and Express backend. The database is built using PostgresQL and it, as well as the rest of the application, is hosted using Heroku.

#### React
The React app is stored within the `/client` folder
#### Node.js and Express
This can be found within the `index.js` file
#### PostgresQL and Heroku
Heroku is used for hosting the web application and the PostgresQL database.

# Contributing

The only thing necessary to contribute is access to this Github repository. Please note that all Javascript is written using ES6. For more information about the project, see the project website: [COMP 523 R Team](http://comp523teamr.web.unc.edu/)

# Authors
Tian Liu - Front-end and Design Lead

Elise Dixon - Full-stack Developer

Arturo Schmidt - Project Manager, Back-end Lead

# License
### WTFPL

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE

Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.

# Acknowledgements

We really appreciate Dr. Terrell's helps on this project. He's being a great source for us whenever we need help. 
