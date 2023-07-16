# Intersections-API
The Intersections API is a mapping-based application developed using Express-NodeJS. It integrates the Turf.js library for Node.js to perform intersection calculations. The API allows users to find intersections between a given linestring and a set of randomly spread lines on a plane.

## Installation

1. Clone the repository:
git clone https://github.com/AnuragdubeyGIT/Intersections-API.git

2. Navigate to the project directory:
cd Intersections-API

3. Install the dependencies:
npm install

4. Set up the configuration:
- Rename the `config.sample.js` file to `config.js`.
- Update the `secretKey` value in `config.js` with your own secret key.

5. Start the server:
npm start

6. The API will now be accessible at `http://localhost:3000`.


**Project Structure**

Following are the files which I have used in my project structure.

App.js: The main entry point of the application. It sets up the server and defines the API routes.

controllers/intersectionController.js: Contains the logic for finding intersections between the linestring and the lines.

middleware/authMiddleware.js: This file contains the logic to perform header based authentication using Json web token.

routes/intersectionRoutes.js: Defines the API routes and maps them to the corresponding controller methods.

turfUtils.js: The Turf.js library for Node.js used for intersection calculations.

package.json: Manages the project dependencies.


## Usage

### Endpoints

- `POST /api/intersections`

This endpoint finds the intersections between a linestring and a set of lines.

Request Body:
```json
{
 "linestring": {
   "type": "LineString",
   "coordinates": [
     [lng1, lat1],
     [lng2, lat2],
     ...
   ]
 }
}
"Response:"

"If there are intersections:"
{
  "intersections": [
    {
      "lineId": "L01",
      "intersectionPoints": [
        [lng1, lat1],
        [lng2, lat2],
        ...
      ]
    },
    ...
  ]
}
"If there are no intersections:"

{
  "intersections": []
}
```


Testing with Postman/cURL

To test the API using Postman or cURL:
Make sure the server is running (npm start).
Send a POST request to http://localhost:3000/api/intersections with the linestring data in the request body.
Review the response to see the intersections or the empty array.

Dependencies

Express.js
Node.js
turf.js
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request
