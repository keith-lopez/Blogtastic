## Setup
--NOTE:  The back end uses MongoDb, so you will need to have an instance installed. 

    1. Clone or download the zip file to you development location.  (Example: C:\Development\Blogtastic)
    2. Open a command terminal and cd into main folder. (cd C:\Development\Blogtastic)
    3. Run `npm install`.  This will install node_modules for the main project to use. 
    4. CD into the backend foler.  (cd backend)
    5. Run `npm install`.  This will install node_modules only for the backend to use.
    6. Run the server script.  'npm run server'  
    7. Open a new command terminal.  Cd to the main folder. 
    8. Run the start script.  'npm run start'
    9. Open a third command terminal and cd to the MongoDb bin folder.  (Example: C:\Program Files\MongoDB\Server\4.4\bin)
    10. Run the mongod.exe with path to db.  (Example:  mongod.exe --dbpath c:\Development\MongoDbData\data\db)
    11. Run the mongo.exe.
    12. You are now off and running!!!

## Available Scripts

## Front End Scripts
    `npm run start`

        Runs the app in the development mode.\
        Open [http://localhost:3000] to view it in the browser.

    `npm run build`

        Builds the app for production to the `build` folder.\
        It correctly bundles React in production mode and optimizes the build for the best performance.

        See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Back End Scripts
    `npm run server'

        Runs the Express server using nodemon to keep alive. 
        Using Mongoose it connects to 'mongodb://127.0.0.1:27017/blog'




