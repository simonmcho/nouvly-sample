** This is NOUVLY, a web application created by simmonson
# How to get started
- Run `npm install` to install dependencies
- Run `yarn server` in terminal
- Open postman for development testing
- Login to mlab to see database

Aug 6, 2018
## User login, authorization, and validation
Prerequisites:
- Passport
- [Gravatar](https://github.com/emerleite/node-gravatar)
- Once a user logs in and verified (email, password), they'll receive a web token
- The web token allows the user to access a protected route     
    • `jwt.sign()` - Once password is match, this executes. Check [this link](https://github.com/auth0/node-jsonwebtoken) for details     
    • Takes a few params     
        - `payload` - what we want to include in the token (user info)
        - `secret` - The secret or key associated with the user. We want to keep this in our config file, not in code
        - `expiration`
- Once we return a web token after successful authorization, we take the created token and put it in the header for authorization.
- This will send to the server, and the server will validate the user, and return the user information that we can use in our express server

- Passport:
- Created `passport.js` config file
- This config file uses `passport-jwt` to create a strategy
- You can access this private route via `/api/users/current`. Without the token being passed into the header to the route, you will get unauthorized access. This is via the 2nd param in `router.get('/current')`, where `passport.authenticate()` checks for the jwt strategy and requires a token with the correct value associated with the user
- Console logging `jwt_payload`  in the new instantiation of `JwtStrategy` in `passport.js` config shows something like this:
```
{ id: '5b68efc41bfc3e7385b146ce',
  name: 'Example Test',
  avatar: '//www.gravatar.com/avatar/1459cf4bss432f32ee8b163839g85a2e?s=200&r=pg&d=mm',
  iat: 1533606417, // Issued at
  exp: 1533610017 } // Expiry 
```
- So instead of console logging, we can use `User.findById()` which is a method from `mongoose` and pass in `jwt_payload.id`
- Once promise is resolved, we return the `done` function. If user has been found in db, return user by passing it in as 2nd param in the `done` function. If not found, we return `false` as 2nd param.
- By doing the above, the `user` object now exists in the `request` object in our callback for the `api/users/current` route. We pass that as json via `req.json(req.user)`. 
Continue here: [Udemy](https://www.udemy.com/mern-stack-front-to-back/learn/v4/t/lecture/10055158?start=0)
