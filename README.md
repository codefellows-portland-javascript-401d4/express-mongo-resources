# Express Mongoose Resource with Promises

-I promise the mongoose will work expressly!

This is a RESTful API on nodeJS that delivers content from MongoDB. The API routes to 2 endpoints and a Pug page. *Now with *MORE* database statistical analysis.  _Please see the associated sections for suggested reconfiguration instructions_.


### Authors

[Albert Reel](https://github.com/Waxhoya) and [Chris Bruner](https://github.com/QuantumArchive)

####Version V1.0.0
All restful methods for GET/PUT/POST/DELETE have been implemented for the collections gamechars and gamemaps

### Mongo Database and Mongoose

Persistant data storage is with Mongo database with Mongoose. 

The defaults is designed to catch Heroku env variable MONGODB_URI but you may need to change the /lib/setup-mongoose.js file with your database info. Our database is currently configured to use a mLab.com database.

_/lib/setup-mongoose.js line 4:_
``` Javascript
const dbURI = process.env.MONGODB_URI || 'mongodb://USER:USERPASS@ds141937.mlab.com:41937/gamechars' || 'mongodb://localhost/gamechars'; pizza
```


### Express Router

Routing is handled with Express. Endpoints are abstracted into ./lib/routes/ individually. Accepted queries are covered in the API endpoint section.


### API endpoints

There are 2 API endoints AKA _resource_:
* _site:_/gamechars 
* _site:_/gamemaps

The endpoints offer access to the related database _resource_(s). Additional filters and selections include:
* testingstatistics.js provides a 

* _site_/_resource_/:id  Returns the object with a matching id
* _site_/_resource_/statistics Returns a statistic object based on the _resouce_

Both Endpoints offer full CRUD operation:


#### GET

To query a specific resource, you must pass it an id:
* need to access something like http://localhost:3000/gamechars/:id
To get all resources, simply call gamechars without a trailing /
* http://localhost:3000/gamechars

#### PUT

To update a specific character, you must have the character id and pass valid JSON:

Example using superagent:
```javascript

var request = require('superagent');

request
    .put('/gamechars/<gamecharsidnumber>')
    .send({superpower: 'flying'})
    .end((req, res) => {
        console.log(req)
    });
```

#### DELETE

Delete functions require an /:id or will not function. No example is provided. 


### Testing: End-to-End and Unit Testing

* Comprehensive Unit and End-to-End testing is included. 
* The tests are scripted to npm test and can also be accessed with mocha.
* The tests are located in the /test folder.
* The tests are chai and chai-http based.


### Issues

Please feel free to post issues to github
* https://github.com/QuantumArchive/express-mongo-resources