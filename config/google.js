const  {postgreSQLclient} =require( '../index.js');
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user, done) {
  console.log("in serialize user. User: ")
  console.log(user)
  done(null, user.googleid);
});

passport.deserializeUser(function(userid, done) {
  let checkAdminQuery = `SELECT * FROM Admin WHERE Admin.googleID = $1` 

  console.log("in deserializeUser")
  console.log(userid)
  postgreSQLclient.query(checkAdminQuery, [userid],(error, response)=>{
    if(error){
      console.log("error deserializing user")
      console.log(error)
    }else{
      console.log("correctly deserialized user")
      console.log(response.rows[0])
      done(null, response.rows[0]);

    }
  })
});

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
  },
  function(token, tokenSecret, profile, done) {
    let googleID = profile.id.toString()
    let firstname = profile.name.givenName
    let lastname = profile.name.familyName

    let valuesExistingUser = [googleID]
    let valuesNewUser = [firstname, lastname, googleID]

    let checkAdminQuery = `SELECT * FROM Admin WHERE Admin.googleID = $1`
    let insertNotFoundAdmin = `INSERT INTO Admin(firstname,lastname,googleid) VALUES($1,$2,$3) RETURNING *`

    postgreSQLclient.query(checkAdminQuery,valuesExistingUser, (error, response) =>{
      if(error){
        console.log("error in finding admin first loop")
        done(error, "error in trying to find admin")
      }else{
        if(response.rows.length == 0){
          postgreSQLclient.query(insertNotFoundAdmin,valuesNewUser,(error, response)=>{
            if(error){
              console.log("error creating new user ")
              done(error, "error in inlserting new admin (it was not found in db)")
            }else{
              console.log("created new user with google id")
              console.log(response.rows[0])
              done(null, response.rows[0])
            }
          })
        }else{
          console.log("user found with queried google id" )
         
         done(null, response.rows[0])
        }
      }
    })
  }
));

