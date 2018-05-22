

# Running the application

#### 1. Download & extract the zip
#### 2. [Install MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) and run the mongodb daemon (mongod)
  - Should listen on default port (27017)

#### 3. In project's folder, run:

```sh
  npm install
```
- may take a minute (or two  😴)

It's recommended (but optional) to install dev dependencies as well:
```sh
  npm i --only-dev
```


#### 4. Run:
```sh
  npm run dev
```
  - This will setup a Webpack dev server which will listen on port 3001 and will hot reload the application upon **client** changes in jsx, js, css (etc...) files. Nodemon will restart the **server** upon back-end changes.
  - The main application will run on port 3000
  - The webpack dev server communicates to the real server via proxy

# Features
  ### [Task 'Build an API'](https://github.com/holidayextras/culture/blob/master/recruitment/developer-API-task.md)

Get entire user's collection:
````  
GET /api/user
````

Get user by ID:
````  
GET /api/user/{userId}
````

Create new user:
````  
POST /api/user/create
Headers: { Content-Type: 'application/json'}
Request body:
{
  "forename": "ExampleForename",
  "surname": "ExampleSurname",
  "email": "example@email.com"
}
````
  - This can be sent using the User's api view coming with the application (localhost:3000/users).
  - User validations can be found in **server\models\user.model\user.model.js**
  - Server provides an API for create/read operations over the users, however there are working update/delete methods existing in the **data layer** as well
  See: **server\data\user.data\users.data.js**
  - Upon creation of new user, the server check's for an already existing email - if such is found, the user is not created.

### [Task 'Flickr Photo Stream'](https://github.com/holidayextras/culture/blob/master/recruitment/developer-flickr-task.md)

- Available on localhost:3000

### Technologies used:
* Back-end:
 - NodeJS, ExpressJS, MongoDB, RxJS
* Front-end:
  -  React, Redux, Redux-Observable
* Tools:
  * Webpack, npm scripts
