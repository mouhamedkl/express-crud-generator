Express CRUD Generator
Overview

The express-crud-generator package automates the creation of RESTful routes and controllers for your Express application. It simplifies setting up CRUD (Create, Read, Update, Delete) operations, allowing you to focus more on your application's core logic instead of repetitive boilerplate code.
Installation

To install the package, run the following command:



npm install express-crud-generator

Usage
Step 1: Define Your Models

Create a directory named models at the root of your repository. Inside this directory, create a file where you define your models array with the required structure:



// models/models.js

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

module.exports = models;

Step 2: Connect to the Database

Create a directory named config at the root of your repository. Inside this directory, create a file db.js to handle your MySQL connection as follows:



// config/db.js

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

module.exports = { connectDB, getDB };

Step 3: Set Up Your Application

In app.js, set up your Express application and integrate the CRUD generator:



// app.js

const express = require('express');
const crudGenerator = require('express-crud-generator');
const models = require('./models/models');
const { connectDB, getDB } = require('./config/db');

const app = express();

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'expressdb',
};

connectDB(dbConfig);

// Generate CRUD routes for the models and ensure tables are created
crudGenerator(getDB(), models, { baseDir: __dirname });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

Conclusion

With express-crud-generator, you can quickly build a RESTful API and manage your database models effortlessly. This tool saves you valuable development time by automating repetitive tasks. Customize your models and CRUD operations to fit your application's specific requirements and enjoy the flexibility it offers!