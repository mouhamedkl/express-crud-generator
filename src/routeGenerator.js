const fs = require('fs');
const path = require('path');

// Function to generate and save routes to the file system
const generateRouteFile = (tableName, routesDir) => {
    const routeCode = `
const express = require('express');
const controller = require('../controllers/${tableName}Controller');
const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
`;

    // Create 'routes' directory if it doesn't exist
    if (!fs.existsSync(routesDir)) {
        fs.mkdirSync(routesDir, { recursive: true });
    }

    // Define the route file path
    const routePath = path.join(routesDir, `${tableName}Routes.js`);

    // Check if the route file already exists
    if (fs.existsSync(routePath)) {
        console.log(`Routes for '${tableName}' already exist at ${routePath}. Skipping generation.`);
        return; // Exit the function if the file exists
    }

    // Write route file
    fs.writeFileSync(routePath, routeCode);
    console.log(`Routes for '${tableName}' generated at ${routePath}`);
};

module.exports = { generateRouteFile };
