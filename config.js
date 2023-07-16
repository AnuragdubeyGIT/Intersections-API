// Import the 'crypto' module for generating a random secret key
const crypto = require('crypto');

// Generate a random secret key of 32 bytes and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');

// Export the secret key for other modules to use
module.exports = {
  secretKey,
};

