Install project dependencies:

npm install

To run the application locally, follow these steps:

npm start

Open your web browser and navigate to http://localhost:4200/
The fake API will be available at http://localhost:3000/.

"scripts": {
"ng": "ng",
"start": "concurrently \"json-server --watch db.json\" \"ng serve\"",
"build": "ng build",
"watch": "ng build --watch --configuration development",
"test": "ng test"
}
