# express-mongo-resource: coded by [Drew Stock] (https://github.com/DrewStock)
==================================================
This app launches a local HTTP server which is backed by a persistent data store. The server responds to GET, POST, PUT and DELETE requests to the resource '/tacos'. It's a taco store! :stuck_out_tongue_winking_eye:

...and now with the added bonus of being powered by Express! :bullettrain_side:

The following are command line instructions for using the app.

* After cloning the repo:
    * type 'npm install'
* To launch the app and run tests:
    * type 'npm start'
* To launch the app:
    * type 'node index.js'
    * this creates a local HTTP server, which will be listening on port 5000
* Overview of functionality:
    * GET request to '/tacos', where resources are stored - server writes response text, a list of resources in the directory
    * GET request for resource at '/tacos/pollo' - server writes response text, which is the contents of the resource
    * POST request for resource at '/tacos/pescado' - server writes response text and creates a new resource, whose contents are the parsed body of the request
    * PUT request for resource at 'tacos/pescado' - server writes response text and creates a new resource (if not already existing) or updates an existing resource. The updated contents of the resource are the parsed body of the request
    * DELETE request to 'tacos/pescado' - server writes response text and deletes resource
* NEW functionality:
    * GET request to root '/' serves up static file (index.html)
