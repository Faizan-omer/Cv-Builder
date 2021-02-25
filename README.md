# Cv Builder

A Cv Builder app based on React Native running on a NODEJs server with MongoDb database. Express is used to create REST APIs. You can create a CV which is stored in the device's storage in PDF format.

## Installation

You need to have node and expo installed. You also need to have the expo app installed in your device.

To install modules run the following command in the root directory and server directory respectively:

```bash
npm install
```
## Note
Make sure to replace the IP address in the fetch API calls located in 'components/DetailsForm.js' and  'components/LandingPage' to the IP address of your machine (you can view it using 'ipconfig' in your command prompt). I have set the default port to 3000 you can change it in the 'server/app.js'.

In android devices the default PDF storage path is 'Internal storage/DCIM' in iOS devices it asks you where to store the file.

## Usage
To run the app, open up the server in cmd or terminal and enter command to run server:

```bash
nodemon app
```
Open root directory in cmd or terminal and enter command to start expo client:
```bash
npm start
```
This opens up the expo environment in the browser you can scan the QR-code from the expo app installed in your device (scan using the camera app in iOS device) which initiates the app on your device.

App has been tested on Android, Tablet and iOS device and found to be working consistently. 

## Testing
Test for DetailsForm.js component is written using JEST framework you can run it in the terminal using the command:
```bash
npm run test
```