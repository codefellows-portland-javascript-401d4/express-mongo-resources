# http hello/goodbye lab1 for CodeFellows 401

### Creator
 - Tim Combs

### Project Functionality
  - This is a Code Fellows Lab Assignment to create an http express server that uses mongoDB for persistent storage and retrieval - it is a faux database for notes
  - The http server runs on localhost:3333

  - server.js acts as a server
  - app.js acts as request handler & router
  - dataStore.js accesses the the file system
  - readBody.js asynchronously builds the requestbody from the chunked database
  - resHandler.js writes the response and errors back to the user 

  - User will be able to read the directory of the notes, read specific notes, create new notes, update existing notes and delete notes dependent on specific path and request method
  - The dataStore.js module implements the file system methods
    - dataStore.retrieveDir implements GET requests for the /notes directory
    - dataStore.retrieveFile implements GET requests for specific notes in the directory
    - dataStore.stash implements POST requests for new specific notes for the directory
    - dataStore.update implements PUT requests to overwrite existing specific notes in the directory
    - dataStore.remove implments DELETE requests for existing specific notes in the directory
  
  - Different responses and errors will be written to the browser and/or logged to the console dependent on specific path &/or request method
  - Notes are stored as JSON files

### How To Use Codebase
  - This module uses Node, npm and the following modules:
    - net, http, path modules from node
    - express & mongoose
    - eslint, mocha, chai, chai-http for testing
  - Make sure to run npm install from the directory root to install dependencies
  - Please refer to the package.json for more info
  
  - A notes directory currently exists in the root of the project directory
  - The notes directory includes test1.json & test2.json files
    - These files do not affect the functionality of the app
    - They must be in the notes directory when starting the tests.
    - See the testing section for more details

  - To use this module as it stands, from the command line at the root of the project directory type:
    ```
    $ npm start
    ``` 
  - Then open a browser window and navigate to the address localhost:8080/

  - app is a back end app, so to implement functionality project should be "wired" to a front end using the methods in the dataStore object encapsulated in dataStore.js

  - specific notes are JSON

  - testing can be done using a browser for GET requests or an app like Postman [https://www.getpostman.com/] for the other request methods


### Use Cases

  - navigating to localhost:8080/ serves index.html to the browser, which displays 'Serving pages for you using node!'

  - navigating to localhost:8080/notes displays the directory list for the /notes directory
  - navigating to localhost:8080/notes/<specific_note>.json displays the file

  - sending a POST request to localhost:8080/notes/<specific_note>.json with the note in JSON in the body writes the note into the file directory and displays 'Your file has been written'

  - sending a PUT request to localhost:8080/notes/<specific_note>.json with the note in JSON in the body overwrites the note in the file directory if it exists, creates it if it doesn't exist and displays 'Your file has been updated'

  - NOTE: PUT & POST both overwrite files if they already exist

  - sending a DELETE request to localhost:8080/notes/<specific_note>.json deletes the note from the file directory and displays 'Your file has been deleted'

  - navigating to other localhost:8080/<something_else> console.logs a 404 status code and displays 'there is no path at /<something_else> please check your map'
  

### Testing
  - Set Up
    - To run the test suite, from the command line at the root of the project directory type:
      ```
      $ mocha
      ```
    - you will see 2 unit tests & 7 E2E tests

    - As stated above, both test1.json & test2.json must be in /notes folder to run tests
    - Feel free to delete for normal usage
    - If you need to remake the test files:
      - test1.json
        ```
        {
          "title": "test1.json",
          "text": "Dinner is consistent, the chicken comes out golden every time"
        }
        ```

      - test2.json
        ```
        {
          "title": "test2.json",
          "text": ""
        }
        ```

### Code Shape
  - This code has been vetted using Eslint and was reviewed by Code Fellows using Travis-CI

### Collborations/Questions/issues
  - Not currently looking for collaborators at this time
  - Any questions and concerns can be handled by opening an issue on the codebase

### License
  - Licensed under the MIT license - see LICENSE.md for more info
