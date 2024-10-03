// src/index.js
const { generateControllerFile } = require('./controller');
const { generateRouteFile } = require('./routeGenerator');
const fs = require('fs');
const path = require('path');
const createTable = (tableName, fields,db) => {
  
    const columns = fields.map(({ name, type }) => `${name} ${type}`).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT PRIMARY KEY AUTO_INCREMENT, ${columns})`;

    db.query(sql, (err) => {
        if (err) throw err;
        console.log(`Table '${tableName}' created or already exists.`);
    });
};

const crudGenerator = ( db, models, options = {}) => {
   
    
    const baseDir = options.baseDir || process.cwd(); // Use current working directory by default

    // Ensure directories for controllers and routes exist
    const controllersDir = path.join(baseDir, 'controllers');
    const routesDir = path.join(baseDir, 'routes');
    if (!fs.existsSync(controllersDir)) {
        fs.mkdirSync(controllersDir, { recursive: true });
    }

    if (!fs.existsSync(routesDir)) {
        fs.mkdirSync(routesDir, { recursive: true });
    }



 
    // Iterate through models to generate controllers and routes
    models.forEach(model => {
        createTable(model.name, model.fields,db);
        generateControllerFile(model.name, model.fields, controllersDir,db);
        generateRouteFile(model.name, routesDir);
    });


};

module.exports = crudGenerator;
