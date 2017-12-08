# Create a Angular 4 project

Run the following command line to install angular-cli globally

```bash
npm install -g @angular/cli
```

Run the following command line to create an angular project "ng4-erp" using cli:

```bash
ng new ng4-erp
```

cd to the "ng4-erp" folder and run the following command line to check the version of angular installed:

```bash
cd ng4-erp
ng -v
```

If the version of angular installed is lower than version 4, go to the following link and run the commands 
specified in the "Installing RC.1" section

[https://github.com/angular/angular/blob/master/CHANGELOG.md](https://github.com/angular/angular/blob/master/CHANGELOG.md)

You must also check to make sure you have the typescript version higher than 2.16 installed, if not, run the following 
command:

```bash
cd ng4-erp
npm instal typescript@2.3.4 --save
```

You can also install bootstrap by running:

```bash
npm install --save @ng-bootstrap/ng-bootstrap
```

# Run the angular 4 application
After you have implement the source code for ng-erp, you are ready to test run the application.

At point, you can run the following command to start a development server at localhost:4200
 
```bash
npm start
```

Note that you must have spring-erp running at localhost:8080 otherwise api call won't be successful.
 
# Create a production server that acts as proxy server to interact with spring-erp api server.

cd to "np4-erp" and run the following command to install express and axios:

```bash
cd ng4-erp
npm install express body-parser axios --save
```

Add the server.js and server/routes folder to ng4-erp folder. Now cd to "ng4-erp" run 
the following command to build the dist version 

```bash
cd ng4-erp
ng build
```

Now to start the server at port 3000, run the following command:

```bash
cd ng4-erp
node server.js
```









