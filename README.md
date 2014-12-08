node-express-mongodb-example
===========================

An example Node.js application built using the Express framework connected to a MongoDB database.

![ScreenShot](https://raw.githubusercontent.com/seana7a7/node-express-mongodb-example/master/public/img/screen.png)

####Update
Upgraded application from Express 3 to Express 4

##Setup
1.  Download and install Eclipse http://eclipse.org/downloads/
2.  Download and install Git http://git-scm.com/downloads
3.  Open Eclipse and create a workspace
4.  Click Help -> Install New Software.. in the Work with field enter `http://www.nodeclipse.org/updates/`
5.  Install nodeclipse
6.  Navigate to the workspace folder (terminal or cmd) and run the Git command `git clone https://github.com/seana7a7/node-express-mongodb-example.git`
7.  Click File -> Import -> General -> Existing Project into Workspace
8.  Click Browse navigate to the workspace and select the `node-express-mongodb-example` folder
9.  Click finish
10. Run the following on the command line `npm update`(Windows) or `sudo npm update`(Linux)

##Database Setup (Linux)
1.  Download and install MongoDB http://www.mongodb.org/downloads
2.  Start the MongoDb service `sudo service mongodb restart`

##Database Setup (Windows)
1.  Download and install MongoDB http://www.mongodb.org/downloads
2.  Create the following folder `C:\data\db`
3.  If MongoDb has not been installed as a service run the MonogoDB demon `mongod.exe`

##Deploy
1. Right click on the `app.js` file Run As -> Node Application


