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
    (sudo) npm install -g grunt
    (sudo) npm install -g bower
    (sudo) npm install -g generator-angular-fullstack

<h3>4) Install Debug Tools</h3>

	(sudo) npm install -g node-inspector

<h3>Install All Project Dependencies </h3>

	(sudo) npm install
	(sudo) bower install

The NPM dependencies are for the server and the bower dependencies are for the front end app.

<h1> Run the Server </h1>

<h3> Make sure that a mongodb process is running </h3>

    mongod --config /usr/local/etc/mongod.conf

<h3> Inside of the root directory </h3>

    grunt server

<h1> FAQ </h1>

<h3> I can't run grunt:serve! What gives?!?</h3>

Try running:

		npm install
		bower install

<h1> Building and Deploying </h1>

After app modification run

	grunt build

Then deploy with

	grunt buildcontrol:heroku

<h1> Server Side Tips and Tricks </h1>

<h3> Debugging </h3>

In order to debug you must run the serve with the debug option on.

	grunt serve:debug

To add a breakpoint add a debugger statement to the appropriate serverside code. For example:

	exports.index = function(req, res) {
  		debugger;
  		return res.json(200, {'test': 'hello world'});
	};

Then navigate to the url which will trigger the breakpoint. The browser will hang as the server has hit the debugger statement. You can then navigate to http://localhost:8080/debug?port=5858 to use an interactive debugging tool.



