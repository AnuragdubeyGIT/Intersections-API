const { secretKey } = require('../config');// Import the secret key from the config file
const jwt = require('jsonwebtoken');// Import the jsonwebtoken package


exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;


  // Check if the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, secretKey);
    // For example, check if the user associated with the token is authorized to access the resource


   // Call the next middleware function if authentication is successful
    next();
  }
   catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};