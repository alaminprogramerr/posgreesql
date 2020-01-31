const express = require("express");
const app = express();

const {postgreSQLclient}= require( '../index.js');
/*
let getAllClients = new Promise ((resolve, reject) => {
    postgreSQLclient.query(" SELECT * FROM Employee", (error,response)=>{
        if(error){
            console.log(error)
            reject(error)
        }else{
            let res= createClientObjectJSON(response.rows[0])
            resolve(res)
        }
    });
});



let createClientObjectJSON = (params) =>{
   let clientObjectJSON = {
       "firstname" : params.firstname,
       "middlename": params.middlename,
       "lastname": params.lastname,
       "email": params.email,
       "phone": params.phone,
       "shiftsworked": params.shiftsworked,
       "title": params.title
   }
   console.log("clientObject " )
   console.log(clientObjectJSON)

   return clientObjectJSON
}
*/


// app.get("/login", function(req,res){
//     console.log("in login route")
// })

module.exports = app;