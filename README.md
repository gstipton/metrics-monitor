# metrics-monitor
A simple Node.js project that displays data output from the Dropwizard metrics library

## Requirements
Node
A REST endpoint that exposes your metrics

## Configuring the app
In the root app.js file, set the variable 'serverUrl' to the host, port and path of your metrics endpoint.

## Running the app
1. Install dependencies via ```npm install```.
2. Run via ```node app.js```. (Nothing fancy.  Seriously, nothing fancy at all.)
3. The app launches on port 3000 by default.  It's just a super-simple app using default express settings.  View the page at [http://localhost:3000].
