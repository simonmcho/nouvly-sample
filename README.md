* This is NOUVLY, a web application created by simmonson
# How to get started
- Run `npm install` to install dependencies
- Run `yarn server` in terminal
- Open postman for development testing
- Login to mlab to see database

Continue here: [Udemy](https://www.udemy.com/mern-stack-front-to-back/learn/v4/t/lecture/10055158?start=0)    

## Aug 6, 2018
### User login, authorization, and validation
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

#### What is JWT? - JSON Web Token
- Once user is verified, they will get back a token using the `JWT` module
- The token is then sent by the user to access a protected route for validation (using `passport` and `passportjwt`)
- It will then allow the extraction of user info

## Aug 7, 2018
### User Register Validation
- Revisited Aug 6 jwt. Still need to understand how `config/passport.js` gets executed when requesting `/api/users/current`
- Using server side validation, `validation` module to validate user name, email, password, and password confirm upon registration.
- Check `/validation/register.js` for details

## Aug 8, 2018
### User Register Validation 2
- Using `validation` module to validate user email and password upon login
- In `users.js`, checked for the object being returned from validation js files to see if there are any errors, then returning a `res.status` with the `errors` object

## Aug 8, 2018 B
### User Profile Creation
- Created another model called `Profile.js`, using `mongoose.schema` class.
- In `/routes/api/profile.js`, created a route for `/api/profile` that checks for profile. Upon initial register and login, trying to access this route will return an error of no profile since the user would not have created one yet
- Created a post request route for `/api/profile`. Here we create a `profileFields` object and store the data from the request accordingly.
- After the `profileFields` object has all the data, we look for the profile using `req.user.id`. 
- If profile exists, then we call `findAndUpdate` method from `mongoose.model()`. If it doesn't we call `findOne`.  By doing the latter, we search the db for the handle. If the user's handle exists already, we return an error
- If the user's handle doesn't exist, we are able to create a new `Profile` model, save the info to the db, then return the json with the created profile.
#### TO DO: Re-do this for confirm learning!!!

## Aug 23, 2018
### Re-confirm learning: 
- Redoing authorization and server side validation. 

## Sep 4, 2018
- Created a Schema for Profiles
- Created another validation code file for profile checking
- Added routes for user profile creation, edit, getting user profile by handle, id, and all profiles

## Sep 4, 2018 B
- Created Validation for Education and experience
- Udated profile routes for education and experience
    • Can now create, edit, and delete education and experience    
- At this point, do the following in the backend:
1. Register a user: `/api/users/register/`
- Private Route, `Post` request: Goes through validation for `name`, `email`, `password`, and `passwordConfirm`
2. Login with a registered user: `/api/users/login/`
- Private Route, `Post` request: Goes through validation for `email` and matching `password`. 
3. See logged in user: `/api/users/current`
- Private Route, `Get` request: Requires the correct token in order to view the current user.
4. Create profile: `/api/profile/`
- Private Route, `Post` request: It needs the logged in user's token to see this private route. Goes through validation for `handle`, `status`, and `skills`
5. See logged in user's profile: `/api/profile/`
- Private Route, `Get` request: It needs the logged in user's token to see this private route. Displays profile information.
6. See public profiles via handle or id: `/api/profile/handle/:handle_id`, `/api/profile/user/:user_id`
- Public Route, `Get` request: Displays public information about someone's profile via handle (eg. `http://localhost:5000/api/profile/handle/sandrayoo`) or ID ( (eg. `http://localhost:5000/api/profile/user/${user._id}`))
7. See all public profiles: `/api/profile/all`
- Public Route, `Get` request
8. See public profile's experience: `/api/profile/experience`
CONTINUE DOCUMENTATION HERE!
9. See public profile's education: `/api/profile/education`
10. Delete your own profile: `/api/profile/`. You can also delete the user at the same time, but this code is commented out in `/routes/api/profile.js`.

The required fields for `GET`, `POST`, and `DELETE` methods are by design not in the README, so that you can check validation and the error states during QA/staging. 
    
## Sep 11, 2018
1. Model for posts. Create, Read, Delete posts. Update can be worked on alone
2. Using `Post` model with `posts` route, with validation

## Sep 17, 2018
1. Router definitions for likes and comments.
2. Ability to like and unlike a post
3. Ability to comment on and delete a comment on a post

## Sep 25, 2018
1. Created front-end using `create-react-app` cli, directory is called `client`
2. Create proxy in `package.json` in client. We do this because we want to hit our routes via relationship, not direct http call/ajax
- EG: `  "proxy": "http://localhost:5000"` added in `client`'s `package.json`
3. Now we have to open up 2 terminals, one for the front end and one for the back end. We don't want this
- So we can use `concurrently` which allows us to run multiple commands at once by modifying the backend's `package.json` file
- We installed concurrently: `yarn add concurrently`
- Updated backend's `package.json` like the following:
```
  "scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```
- Notice how `concurrently` allows us to run multiple terminal cmds at once
4. To check if it's running correctly, you should see `localhost:3000` running on the browser, and typing in `http://localhost:5000/api/profile/all` should show whatever profile content is existing on the database
5.  Added bootstrap theme in the front end as well as font-awesome CDN (`index.html` in the front end)

## Sep 25, 2018B
1. Installed VS Code extension `ES7 React/Redux/React-Native/JS`
2. Created Components for `Navbar`, `Landing`, and `Footer`, added markup
3. Installed `react-router-dom` (version 4 of `react-router`) in `client` directory
3. Created `Router` component and `route` in `App.js`, and pointed towards `Landing` as exact route.

## Sep 25, 2018C
1. Creating new route and component for Register
2. Created routes for `register` and `login`. Classes so they should be uppercased.
3. Used `Link` component from `react-router-dom` to link based on relative directories, instead of `a` tags and `href` attributes
4. Using class component `Register.js` to deal with registration. Simple review of functions within class components

## Sep 26, 2018
1. Added axios on front end
2. Using `axios` allows us to make a `XMLHTTPRequest` to an endpoint
3. We can send an object with the proper key name and variables:
```
onSubmit(e) { ...
  const newUser = {
    name: 'Simon',
    email: 'simon@simon.com',
    password: 'fakepassword'
  }

 axios.post('/api/users/register', newUser) // 2nd param is the object 
      .then(res => console.log(res.data)) // If successful, you can see the data from the response
      .catch(err => console.log(err.response.data)); // You can also look at the network tab and see the response

}
```

The object that is sent in the request can then be seen on the server side:
```
router.post('/register', (req, res) => {
    console.log(req.body); // This shows the body of the request, which will be the object `newUser` sent from the client side
```
4. We installed npm `classnames` so we can have conditional classnames in react.
- Once installed, we used the library to do the following:
```
render() {

  const { errors } = this.state;

  return (
    <div>
      <input 
        type="text"
        className={classnames('form-control form-control-lg', {
          'is-invalid' : errors.name // classname of this exists if errors.name exists
        })}
        // some more attributes here...
        />
      {errors.name && (<div className="invalid-feedback">{errors.name}</div>)} // This div will be rendered if `errors.name` exists. The value of this comes from the server's `validation/register.js` file
    </div>
  )
}
```
- Did this for all inputs
- For the form, we don't want the default error states, so we added `noValidate` as an attribute in the form:
`<form noValidate onSubmit={this.onSubmit}>`


