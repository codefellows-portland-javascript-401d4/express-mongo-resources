#Express Mongoose Resource with Promises

-I promise the mongoose will work expressly!

###Author

Albert Reel and Chris Bruner

###Version

V1.0.0

-All restful methods for GET/PUT/POST/DELETE have been implemented for the collections gamechars and gamemaps

####GET

-To query a specific resource, you must pass it an id:

*need to access something like http://localhost:3000/gamechars/:id

-To get all resources, simply call gamechars without a trailing /

*http://localhost:3000/gamechars

####PUT

-To update a specific character, you must have the character id and pass valid JSON:

*Example using superagent:

```javascript

var request = require('superagent');

request
    .put('/gamechars/<gamecharsidnumber>')
    .send({superpower: 'flying'})
    .end((req, res) => {
        console.log(req)
    });

