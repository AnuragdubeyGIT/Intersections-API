// Import the required modules
const express = require('express');
// Import the routes for handling intersection-related requests
const intersectionsRoutes = require('./routes/intersectionsRoutes');

// Create a new Express application
const app = express();

// Add middleware to parse JSON request bodies
app.use(express.json());

// Mount the intersectionsRoutes to handle requests with '/api/intersections' prefix
app.use('/api/intersections', intersectionsRoutes);

// Set the port for the server to listen on. Use the environment variable PORT if available, otherwise use port 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port. Log a message to indicate the server is running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
