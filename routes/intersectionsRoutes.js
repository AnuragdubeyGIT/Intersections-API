const express = require('express');//importing the Express framework.
const intersectionsController = require('../controllers/intersectionsController');// Importing the intersections controller module that contains the logic for generating tokens and finding intersections.
const { authenticate } = require('../middlewares/authMiddleware');//Importing the authentication middleware for route protection.

//Creating an instance of the Express router.
const router = express.Router();

// Defining a GET route for generating a token.
router.get('/generate-token', (req, res) => {
  const token = intersectionsController.generateToken();
  return res.json({ token });
});

//Defining a POST route for finding intersections with authentication middleware applied.
router.post('/', authenticate, intersectionsController.findIntersections);

//Exporting the router for use in other parts of the application.
module.exports = router;
