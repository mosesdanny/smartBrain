// Required packages

const express = require('express');
const cors = require('cors');

// Start express
const app=express();

//
// Temporary DB
//
const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	] // users
} //database

//
// Middleware for parsing incoming requests
//
//app.use(express.urlencoded({extended: false}));
								// Parse URL encoded incoming body
app.use(express.json());		// Parse JSON incomimng body
app.use(cors());				// prevent access-control blocking

//
// Routes
//

  // Basic route for HTTP GET '/'
app.get('/', (req, res) => {
	res.send(database.users);
}) // GET '/'

  // Route for HTTP POST '/signin'
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} // if a valid user
	else {
		res.status(400).json('Error signing in');
	} // invalid user
}) // POST '/signin'

  // Route for HTTP POST '/register'
app.post('/register', (req, res) => {
	database.users.push({
		id: "125",
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
}) // POST '/register'

  // Route for HTTP GET '/profile'
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	const foundUser = database.users.find((element) => {
		return element.id===id;
	})// find id in the database
	
	  // Return the detected user's profile or error message
	if (foundUser===undefined)
		res.status(404).json("User does not exist");
	else
		res.json(foundUser);
}) // GET '/profile/id'

  // Route for HTTP PUT '/image'
app.put('/image', (req, res) => {
	const { id } = req.body;
	const foundUser = database.users.find((element) => {
		element.entries++;
		return element.id===id;
	})// find id in the database
	
	  // Return the detected user's profile or error message
	if (foundUser===undefined)
		res.status(404).json("User doesnot exist");
	else
		res.json(foundUser.entries);
}) // PUT '/image'

// Listen to incoming requests on port 3000
app.listen (3000, ()=> {
	console.log ('server is listening on port 3000');
}) //listen on 3000

