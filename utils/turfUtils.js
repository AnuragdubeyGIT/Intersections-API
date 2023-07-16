// Import the turf library for spatial operations
const turf = require('@turf/turf');

/**
 * Check if the provided linestring is valid GeoJSON.
 * @param {Object} linestring - The linestring to validate.
 * @returns {boolean} - True if the linestring is valid, false otherwise.
 */
exports.isValidLinestring = (linestring) => {
  try {

    // Attempt to create a turf LineString object from the linestring
    turf.lineString(linestring);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Find intersecting lines from the provided linestring and lines array.
 * @param {Object} linestring - The linestring to find intersections with.
 * @param {Array} lines - The array of lines to check for intersections.
 * @returns {Array} - An array of intersecting lines and their intersection points.
 */
exports.findIntersectingLines = (linestring, lines) => {
  // Create a turf LineString object from the provided linestring
  const linestringFeature = turf.lineString(linestring);

  // Array to store intersecting lines and their intersection points
  const intersectingLines = [];

  // Iterate over the lines array and check for intersections
  for (const line of lines) {
    // Create a turf LineString object from the current line
    const lineFeature = turf.lineString(line);

    // Find the intersection between the linestring and current line
    const intersection = turf.lineIntersect(linestringFeature, lineFeature);

    // If there is an intersection, add the line ID and intersection point to the array
    if (intersection.features.length > 0) {
      intersectingLines.push({
        id: line.id,
        intersectionPoint: intersection.features[0].geometry.coordinates,
      });
    }
  }

  // Return the array of intersecting lines and their intersection points
  return intersectingLines;
};
