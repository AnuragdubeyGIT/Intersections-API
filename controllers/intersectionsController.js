const fs = require('fs'); // File system module for reading the lines.json file
const jwt = require('jsonwebtoken'); // Library for generating JWT tokens
const turf = require('@turf/turf'); // Turf.js library for geospatial operations

const secretKey = require('../config').secretKey; // Secret key for JWT token generation

// Read the lines.json file to get the line coordinates
const linesData = require('../lines.json');

/**
 * Generates a JWT token with an expiration of 1 hour.
 * @returns {string} Generated JWT token.
 */

const generateToken = () => {
  const token = jwt.sign({}, secretKey, { expiresIn: '1h' });
  return token;
};


/**
 * Finds intersections between the given linestring and lines from the lines.json file.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response with the intersecting line IDs and intersection points.
 */

const findIntersections = (req, res) => {
  const { linestring } = req.body;

  // Check if linestring is valid GeoJSON
  if (!linestring || linestring.type !== 'LineString' || !Array.isArray(linestring.coordinates) || linestring.coordinates.length < 2) {
    return res.status(400).json({ error: 'Invalid linestring' });
  }

  const intersections = [];

  // Iterate over the lines data and check for intersections with the linestring
  linesData.forEach((line) => {
    const lineCoords = line.line.coordinates;
    const lineString = turf.lineString(lineCoords);

    const intersects = turf.booleanIntersects(lineString, linestring);

    if (intersects) {
      const intersectingPoints = [];

      // Iterate over the linestring coordinates and check for intersection with the current line
      for (let i = 0; i < linestring.coordinates.length - 1; i++) {
        const start = turf.point(linestring.coordinates[i]);
        const end = turf.point(linestring.coordinates[i + 1]);
        const segment = turf.lineString([start.geometry.coordinates, end.geometry.coordinates]);

        if (turf.booleanIntersects(lineString, segment)) {
          // Calculate the intersection point and add it to the array
          const intersection = turf.lineIntersect(lineString, segment);
          intersectingPoints.push(intersection.features[0].geometry.coordinates);
        }
      }

      // If there are intersecting points, add the line ID and intersection points to the intersections array
      if (intersectingPoints.length > 0) {
        intersections.push({
          lineId: line.lineId,
          intersectionPoints: intersectingPoints,
        });
      }
    }
  });

  // Return the intersections array if intersections were found
  if (intersections.length > 0) {
    return res.json({ intersections });
  }

  // Return an empty array if no intersections were found
  return res.json({ intersections: [] });
};

module.exports = {
  generateToken,
  findIntersections,
};
