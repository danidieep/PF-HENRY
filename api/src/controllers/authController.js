// const express = require('express');
// const { auth, requiresAuth } = require('express-openid-connect');
// const server = express()

// var webAuth = new auth0.WebAuth({
//     domain:       'dev-5vxlb3fc.us.auth0.com',
//     clientID:     'Ui6gc91ydpjzXrXvZDyEzI6J6z2lhn8j'
//   });

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: 'http://localhost:3000',
//   clientID: 'Ui6gc91ydpjzXrXvZDyEzI6J6z2lhn8j',
//   issuerBaseURL: 'https://dev-5vxlb3fc.us.auth0.com',
//   secret: 'LONG_RANDOM_STRING'
// };

// // The `auth` router attaches /login, /logout
// // and /callback routes to the baseURL
// server.use(auth(config));

// // req.oidc.isAuthenticated is provided from the auth router
// server.get('/', (req, res) => {
//     console.log(req.oidc.user)
//   res.send(
//     req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
//   )
// });

// // The /profile route will show the user profile as JSON
// server.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user, null, 2));
// });

