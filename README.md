TOUCHLESS ORDERING APP

### `npm install`

Install the dependencies in the local node_modules folder.

Installation Instructions : 
1) Create a folder to hold your installation: mkdir my-app
2) FTP/Copy the contents of the zip to your newly created folder
3) Enter folder: cd my-app
4) Install dependencies: npm install
5) Start application: npm start 

If the server runs on the local machine, it runs at the port 8090. It is specified in my-app/app.js file.
my-app/app.js is the entry point for all the routes.

## Folder Structure

After creation, your project should look like this:

```
my-app/
    node_modules/
    controller/
        items.js
        order.js
        owner.js
        token.js
    routes/
        items.js
        order.js
        owner.js
        token.js
    app.js
    db_firebase.js
    package.json
    README.md
```

The database configurations are specified in my-app/db_firebase.js

The 'routes' folder consists of different files seperated basaed on functionalities, with different possible APIs.

The 'controller' folder consists of actions to be done, when a route is visited.




