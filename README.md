Express CRUD Generator Overview

express-crud-generator automates the creation of RESTful routes and
controllers for your Express application. This package enables you to
easily set up CRUD (Create, Read, Update, Delete) operations with
minimal configuration, allowing you to focus on your application logic
rather than boilerplate code. Installation

To install the package, run:

npm install express-crud-generator

Usage Step 1: Define Your Models

Create a directory named models at the root of your repository. Inside
this directory, create a models array with the desired structure: const
models = \[ { name: 'users', fields: \[ { name: 'name', type:
'VARCHAR(100)' }, { name: 'email', type: 'VARCHAR(100)' }, { name:
'age', type: 'INT' } \] }, { name: 'products', fields: \[ { name:
'title', type: 'VARCHAR(255)' }, { name: 'description', type: 'TEXT' },
{ name: 'price', type: 'DECIMAL(10, 2)' } \] }\]; module.exports=models

Step 2: Connect to the Database Create a directory named config at the
root of your repository. Inside this directory, file named db.js, handle
your MySQL connection as follows: const mysql = require('mysql');

let db;

const connectDB = (config) =\> { db = mysql.createConnection(config);
db.connect((err) =\> { if (err) { console.error('Error connecting to the
database:', err.stack); return; } console.log('Connected to MySQL
database'); }); };

const getDB = () =\> { if (!db) { throw new Error('Database not
connected. Call connectDB first.'); } return db; };

module.exports = { connectDB, getDB };

Step 3: Set Up Your Application

In app.js, set up your Express app and use the generator: // app.js
const express = require('express'); const crudGenerator =
require('express-crud-generator'); const models =
require("./models/models") const { connectDB, getDB } =
require("./config/db") const app = express();

// MySQL database configuration const dbConfig = { host: 'localhost',
user: 'root', password: '', database: 'expressdb' }; connectDB(dbConfig)
// Generate CRUD routes for the models and ensure tables are created
crudGenerator(getDB(),models, { baseDir: \_\_dirname });
app.listen(3000, () =\> { console.log('Server running on port 3000');
});

Conclusion

With express-crud-generator, you can quickly build a RESTful API and
manage your database models with ease. This tool saves you time and
effort, allowing you to focus on the ultimate functionality of your
application. Delve into the customization options for even more control
over your CRUD operations!
