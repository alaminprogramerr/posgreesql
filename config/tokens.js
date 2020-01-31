const jsonWT = require('jsonwebtoken')



export let generateAccessToken = (user) =>{
    let accessToken = jsonWT.sign(JSON.stringify(user), process.env.JSON_WEB_TOKEN_SECRET, options = {
        expiresIn: 60
    })
    return accessToken
}

export let verifyToken = (token) =>{
    let verified = jsonWT.verify(token,process.env.JSON_WEB_TOKEN_SECRET, (error, user) =>{
        if(error){
            console.log("error verifying jwt access token")
            return error
        }else{
            console.log("access jwt token verified")
            console.log(user)
        }
    })
}