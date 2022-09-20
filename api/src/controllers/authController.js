const { auth } = require('express-openid-connect');
const server = express()
const { Router } = require("express");
const router = Router()

server.use(
    auth({
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.AUTH0_CLIENT_ID,
      secret: process.env.SESSION_SECRET,
      authRequired: false,
      auth0Logout: true,
    }),
  );

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth());

// req.isAuthenticated is provided from the auth router
router.get('/auth', (req, res) => {
    console.log(req.oidc.user)
  res.send(`${req.oidc.user.name}`)
})

app.get('/sign-up', (req, res) => {
    res.oidc.login({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  });