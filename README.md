Data-This-Data-That
===================

<h1> Installations: </h1>

<h3>1) Install Node</h3>

    http://nodejs.org/download/
    
<h3>2) Install Mongodb</h3>

    brew install mongodb
    
<h3>3) Install Yeoman (scaffolding tool), Grunt (build system), and Bower (package manager)</h3>

    (sudo) npm install -g yo
    (sudo) npm install -g grunt-cli
    (sudo) npm install -g grunt-cli
    (sudo) npm install -g bower
    
<h3>Install All Project Dependencies </h3>

	(sudo) npm install 
	(sudo) bower install
	
The NPM dependencies are for the server and the bower dependencies are for the front end app.

<h1> Run the Server </h1>
    
<h3> Make sure that a mongodb process is running </h3>

    mongod --config /usr/local/etc/mongod.conf
    
<h3> Inside of the root directory </h3>

    grunt server

<h1> Building and Deploying </h1>

After app modification run

	grunt build
	
Then deploy with

	grunt buildcontrol:heroku
