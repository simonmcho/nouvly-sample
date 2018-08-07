** This is NOUVLY, a web application created by simmonson

Aug 6, 2018
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
