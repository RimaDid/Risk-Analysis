# RiskApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## node_modules folder

To get the node_modules folder, you should run `npm install` to get all the dependancies already stated on the `package.json`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# RiskApp Guide

The application permit to calculate a defined risk based on a certain list of parameters related to to asome product type.

## Services

The data service provides all the services to exploit data such as:  `GET products list`, `GET parameters list`,`POST the parameters formular` and the services to `get` and `set` a shared data.

## Components

This app contains two components.
 
### product-analysis component

This component is reponsable for getting the product and parameters lists, setting them into a select dropdown list and a form.
Then, sending a post request to get the selected product risk-evaluated based on the values the user has write on the parameters form.

### risk component

This component is responsible to get the risk indicator value from yhe post request send by the previous component via the shared data between the two components, and display it.

## JSON SERVER as a mock server

For testing the REST API, json server was used as customised testing server.
