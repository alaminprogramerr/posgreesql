const {postgreSQLclient} = require( '../index.js') 
// import {generateAccessToken, verifyToken} from '../config/tokens.js'

const express     = require("express"),
     app          = express(),
     bcrypt       = require('bcryptjs')


app.post("/signup", (req,res) =>{
    console.log("in /auth/signup")
    let findUser = `SELECT * FROM Test WHERE Test.username = $1`
    console.log(req.body)
    //first we have to check whether username aka email is exists
    postgreSQLclient.query(findUser,[req.body.username], (error, response) =>{
        let hashedPassword = null
        let user = null
        let insertUser = `INSERT INTO Test(username,password) VALUES($1,$2) RETURNING *`

        if(error){
            console.log("error finding user with username and password signin")
            console.log(error)
        }else{
            if(response.rows.length == 0){
                console.log("username is available, creating user")
                bcrypt.hash(req.body.password, 4, (err, hash) =>{
                    if(err){
                        console.log("error has ocurred storing your password")
                        console.log(error)
                    }else{
                        postgreSQLclient.query(insertUser, [req.body.username, hash], (error, response) =>{
                            if(error){
                                console.log("error creating user")
                                console.log(error)
                            }else{
                                console.log("user created")
                                console.log(response.rows[0])
                            }
                        })
                    }
                  });
            }else{
                console.log("username already exists, please create a new none")
            }
        }
    })

})

app.post("/logout" , (req,res,next) => {
    console.log(req.session.user)
    req.session.destroy()
    console.log(req.session)
})

//landing route for signup with username and password (not oauth)
app.post("/login", async (req,res, next) => {
    console.log("BODY")
    console.log(req.body)

    let user = await findUserByUsernameAndPassword(req.body.username, req.body.password, next)

    if(user === undefined){
        console.log("user returned undefined")
        res.status(401).send("incorrect username or password")
    }else{
        console.log("user returned")
        console.log(user)
        req.session.user = user
        res.send(user)
    }
    
})

// landing route with data from google oauth
app.post('/google/login', async (req, res , next)=>{

    let user = await findUserByGoogleID(req.headers.authentication, next)
    console.log(user)
    if(user === undefined){
        res.status(401).send("user not found")
    }else{
        console.log("printing found user")
        console.log(user)
        req.session.user = user
        console.log("printing req.session in /google/login")
        console.log(req.session)
        res.send(user)
    }
})

let findUserByUsernameAndPassword = async (username, password, next) => {
    
    console.log(username)
    console.log(password)
    let findUser = `SELECT * FROM Test WHERE Test.username = $1`
    let response;


    //checks if accout with username exists
    try{
        response = await postgreSQLclient.query(findUser,[username])
        if(response === undefined){
            return undefined
        }else if(response.rows.length === 0){
            return undefined
        }
    }catch(error){
        next(error)
    }
    console.log("if response is undefined should not be here")
    console.log(response)

    //checks if password was correct
    try{
        let hashedPassword = response.rows[0].password
        let passwordCheck = await bcrypt.compare(password, hashedPassword)
        if(passwordCheck === true){
            return response.rows[0]
        }else{
            return undefined
        }
    }catch(error){
        next(error)
    }

}

let findUserByGoogleID = async (id, next) => {
    console.log(id)
    let response = undefined
    let checkAdminQuery = `SELECT * FROM Admin WHERE Admin.googleID = $1` 
    try{
        response = await postgreSQLclient.query(checkAdminQuery,[id])
    }catch(error){
        next(error)
    }
    if(response === undefined){
        return response
    }
    return response.rows[0]
    

}



/**IGNORE BELOW -- Might be useful down the road for backend passport oauth */
/*

app.get('/google/login',passport.authenticate('google', { scope: ['profile email']  }))

app.get('/google/callback', passport.authenticate('google', {failureRedirect: 'failed'}),
        function(req,res){
            console.log("in callback function") 
            res.redirect("success")
        }
 );

 app.get('/google/logout', function(req,res){
     req.logout()
     res.redirect('/')
 })

 app.get("/google/success", function(req,res){
    console.log("in successful route" )
    res.json(req.user)    
})

app.get("/google/failed", (req,res) =>{

    res.send("you have failed logging in")
})
*/

module.exports = app;