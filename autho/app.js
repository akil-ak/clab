const express=require('express');
const { auth } = require('express-openid-connect');

var app=express()
app.listen(3000)
app.set('view engine','ejs');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'TOCDWRKYjnXDdD9Hxhz43jsQYbUKJRqf',
  issuerBaseURL: 'https://dev-s0ad1lcm0j46gcpg.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    
  res.render('index',{'auth':req.oidc.isAuthenticated()});
});