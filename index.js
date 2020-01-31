const  { hasBrowserCrypto } =require ('google-auth-library/build/src/crypto/crypto');
const PORT = process.env.PORT||5000
const express  = require('express'),
      {Client} = require("pg"),
         app   = express(),
         bcrypt       = require('bcryptjs'),
         env   = require('dotenv');
         env.config();

const path          = require('path'),
      generalRoutes = require("./routes/general-routes"), 
      authRoutes    = require("./routes/auth-routes"),
      queryString   = require('query-string'),
      passportGoole = require("./config/google"),
      passport      = require('passport'),
      expressSession = require('express-session'),
      cors          = require('cors'),
      bodyParser     = require('body-parser')



let whiteListOrigins = [
  'http://localhost:5000/login',
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:3000/auth/google/login',
  'http://localhost:3000/auth/google',
  'http://localhost:3000/auth/google/logintest',
  'http://localhost:5000/auth/login',
  'http://localhost:5000/auth/signup',
  'http://localhost:5000/auth/logout',
  'http://localhost:5000/auth/login',
  'http://localhost:5000/users',
  'http://localhost:5000/users:id'
]


let corsOptions = {
  origin: function(origin, callback){
    console.log(origin);
    if(!origin || whiteListOrigins.indexOf(origin) !== -1){
      callback(null,true)
    }else{
      console.log(origin)
      callback(new Error("cors error in setup"))
    }
  }
}

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  httpOnly: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.json())

let loginCheck = (req, res, next) => {
  // console.log("printing req.session")
  // console.log(req.session)
  // if(req.session.user){
  //   console.log("user is logged in")
  // }else{
  //   console.log("user is not logged in")
  // }
  next()
}

app.use(loginCheck)

app.use(passport.initialize());
app.use(passport.session());
// Using env to hide credentials, used to access postgreSQL
let info = {
    account : process.env.ACCOUNT_NAME,
    password : process.env.PASSWORD,
    host: process.env.HOST,
    port : process.env.DBPORT,
    database : process.env.DATABASE,
    str  : function () {
        let x = `postgres://${this.account}:${this.password}`
          + `@${this.host}:${this.port}`
          + `/${this.database}`;

        console.log(x)
        return x
      }
};

 const postgreSQLclient = new Client({connectionString: info.str(), ssl:true})

postgreSQLclient
.connect()
.then(() => console.log('connected to PostgreSQL'))
.catch(err => console.error('connection error to PostgreSQL', err.stack))

app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.use(express.static('client/build'));

app.use(function handlePostgresError(error, req, res, next){
  console.log("in error handling middlware")
  console.log(error)
})

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Control-Type, Accept");
  next();
});

app.post('/users', function(req, res){
  const {
    first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description
  } = req.body
  console.log(req.body); 

  postgreSQLclient.query('INSERT INTO test (first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
  [first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description], (error, results) => {
    if (error) {
      console.log('not inserted')
    }
    res.status(201).send(`User added with ID: ${results.insertId}`)
  })
});

app.get('/users', function(req, res){
  postgreSQLclient.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log('data not received')
    }
    res.status(200).json(results.rows)
  })
});

app.get('/users/:id', function(req, res){
  const id = parseInt(req.params.id)

  postgreSQLclient.query('SELECT * FROM test WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log('data not received')
    }
    res.status(200).json(results)
    console.log(res.body); 
  })
});

app.put('/users/:id', function(req, res){
  const {
    first_name, last_name, username, password, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description
  } = req.body
  console.log(password); 
  bcrypt.hash(password,4,(err,hash) =>{
    if(err){
      console.log(err)
    }else{
      postgreSQLclient.query(
        'UPDATE test SET first_name = $1, last_name = $2, password = $3, phone = $4, job_title = $5, googleId = $6, address = $7, city = $8, state_name = $9, zipcode = $10, job_description = $11, account_description = $12 WHERE username = $13',
        [first_name, last_name,hash, phone, job_title, googleId, address, city, state_name, zipcode, job_description, account_description, username],
        (error, results) => {
          if (error) {
            console.log('data not updated');
            console.log(error);
          }
          res.status(200).send(`User modified: ${username}`)
        }
      )
    }
  })

});

app.delete('users', function(req, res){
    const id = parseInt(req.params.id)
  
    postgreSQLclient.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log('data not deleted')
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
});


app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); 


app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)})

module.exports = {app};