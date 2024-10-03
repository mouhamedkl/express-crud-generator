const fs = require('fs');
const path = require('path');

// Function to generate and save controller to file system
const generateControllerFile = (tableName, fields, directories) => {
    const controllerCode = `
const db = require('../config/db');

// CRUD functions for ${tableName}
const create = (req, res) => {
    const data = req.body;
    const sql = \`INSERT INTO ${tableName} SET ?\`;
    db.query(sql, data, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId });
    });
};

const findAll = (req, res) => {
    const sql = \`SELECT * FROM ${tableName}\`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};

const findById = (req, res) => {
    const { id } = req.params;
    const sql = \`SELECT * FROM ${tableName} WHERE id = ?\`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (!result.length) return res.status(404).send({ message: 'Not found' });
        res.status(200).send(result[0]);
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const sql = \`UPDATE ${tableName} SET ? WHERE id = ?\`;
    db.query(sql, [data, id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Updated successfully' });
    });
};

const remove = (req, res) => {
    const { id } = req.params;
    const sql = \`DELETE FROM ${tableName} WHERE id = ?\`;
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Deleted successfully' });
    });
};

module.exports = { create, findAll, findById, update, remove };
`;

    // Create 'controllers' directory if it doesn't exist
    const controllersDir = path.join(directories, 'controllers');
    if (!fs.existsSync(directories)) {
        fs.mkdirSync(directories, { recursive: true });
    }

    // Define the controller file path
    const controllerPath = path.join(directories, `${tableName}Controller.js`);

    // Check if the controller file already exists
    if (fs.existsSync(controllerPath)) {
        console.log(`Controller for '${tableName}' already exists at ${controllerPath}. Skipping generation.`);
        return; // Exit the function if the file exists
    }

    // Write controller file
    fs.writeFileSync(controllerPath, controllerCode);
    console.log(`Controller for '${tableName}' generated at ${controllerPath}`);
};

module.exports = { generateControllerFile };
