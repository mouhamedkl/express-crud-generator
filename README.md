# Express CRUD AUTO

express-crud-gen automates the creation of RESTful routes and controllers for your Express application. This package enables you to easily set up CRUD (Create, Read, Update, Delete) operations with minimal configuration, allowing you to focus on your application logic rather than boilerplate code.

## Installation

To install the package, run:


```bash
npm install express path mysql express-crud-gen

```

## Usage
Step 1: Define Your Models

Create a directory named models at the root of your repository. Inside this directory, create a models array with the desired structure:
```javascript
const models = [
    {
        name: 'users',
        fields: [
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'email', type: 'VARCHAR(100)' },
            { name: 'age', type: 'INT' }
        ]
    },
    {
        name: 'products',
        fields: [
            { name: 'title', type: 'VARCHAR(255)' },
            { name: 'description', type: 'TEXT' },
            { name: 'price', type: 'DECIMAL(10, 2)' }
        ]
    }
];
module.exports=models
```

Step 2: Connect to the Database
Create a directory named config at the root of your repository. Inside this directory,
file named db.js, handle your MySQL connection as follows:
```javascript
const mysql = require('mysql');

let db;

const connectDB = (config) => {
    db = mysql.createConnection(config);
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to MySQL database');
    });
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db;
};

module.exports = {
    connectDB,
    getDB
};

```
Step 3: Set Up Your Application

In app.js, set up your Express app and use the generator:
```javascript
// app.js
const express = require('express');
const crudGenerator = require('express-crud-gen');
const models = require("./models/models")
const { connectDB, getDB } = require("./config/db")
const path = require("path")
const app = express();
app.use(express.json());
// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expressdb'
};
connectDB(dbConfig)
// Generate CRUD routes for the models and ensure tables are created
crudGenerator(getDB(),models, { baseDir: __dirname });
const routesDir = path.join(__dirname, 'routes');
models.forEach(model => {
    const routePath = path.join(routesDir, `${model.name}Routes.js`);
    console.log(`/api/${model.name}`);
    
    app.use(`/api/${model.name}`, require(routePath));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


```
## Conclusion

With express-crud-gen, you can quickly build a RESTful API and manage your database models with ease. This tool saves you time and effort, allowing you to focus on the ultimate functionality of your application. Delve into the customization options for even more control over your CRUD operations!

## License

[MIT](https://choosealicense.com/licenses/mit/)
