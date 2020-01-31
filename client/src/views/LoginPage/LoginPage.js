import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Logo from "../../assets/img/logo.png";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/background.png";
import Input from '@material-ui/core/Input';

import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'

import {connect} from 'react-redux'

const useStyles = makeStyles(styles);

//Google OAuth imports
const {GoogleLogin} = require("react-google-login")
const axios = require('axios')

function LoginPage(props) {

  console.log("props of login page")
  console.log(props)
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [failedLogin, setFailedLogin] = useState('')
  console.log('here')
  const passwordHandler = (event) =>{
    setUserPassword(event.target.value)

  }
  console.log('shs')
  const emailHandler = (event) => {
    setUserEmail(event.target.value)
  }
  console.log('fhj')


  //called when regular username and password login is attempted
  const formSubmit = async (event) => {
    event.preventDefault()
    let credentials = {
      'username': userEmail,
      'password': userPassword
    }

    try{
      let response = await axios({
        method:'post',
        url: 'http://localhost:5000/auth/login',
        headers: {
         'content-type': 'application/json'
        },
        data: credentials
      })
      let user = response.data
      props.loginDispatch(user)
      props.history.push("/profile")
    }catch(error){
      setFailedLogin(true)
      console.log(error)
    }
  }

  // called after user sign ins with google oauth
  // we make a post request to server which determines returns user if account exists
  const responseGoogleSuccess = async (res) => {
    try{
      let user = await axios({
        method:'post',
        url: "http://localhost:5000/auth/google/login",
        headers: {
          'Authorization': res.profileObj,
          'Allow-Access-Control-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          "Authentication": res.w3.Eea
        },
        data: {
          googleId: res.profileObj.googleId
        }
      })
      props.loginDispatch(user.data)
      props.history.push("/profile")
      console.log("inside loginpage auth redirect")
      console.log(props.history)
    }catch(error){
      setFailedLogin(true)
      console.log('there has been an error in responsegoogle')
      console.log(error)
    }
   
  }

  const responseGoogleFailure = res => {
    console.log("login to google failed " + res)
  }
  //we need to request token, which returns an authorization code when logged in.
  //Query backend with authorization code, backend needs to swap auth code for token
  // once token is received, we can start to pull data from API
  
  let failedLoginAlert = <p> </p>
  if(failedLogin){
    failedLoginAlert = <div>
      <p>Wrong username or password. Please try again.</p>
      <p>If you do not have an account, please contact System Administrator to create one</p>
      </div>
  }

  return (
    <div className={classes.loginbox}>
      <Header
        brand=""
        absolute
        color="transparent"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              {failedLoginAlert}
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                    <img src={Logo}  className={classes.image} alt='Onsite Drapery, LLC logo'/>
                  <CardBody>
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={emailHandler}
                      placeholder="Email"
                      required={true}
                      value = {userEmail}
                    />
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={passwordHandler}
                      placeholder="Password"
                      type="password"
                      required={true}
                      value = {userPassword}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button href="/profile" onClick={formSubmit} className={classes.loginBtn}><b>Login</b></Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    {/* <Button href="/" className={classes.googleBtn}><img src={google} className={classes.google}/>Login with Google</Button> */}
                    <GoogleLogin 
                    clientId= "1013178343737-7lcsb26bjsj0tccieksn273f3lj5346e.apps.googleusercontent.com"
                    buttonText= "Google"
                    responseType = "id_token"
                    onSuccess = {responseGoogleSuccess}
                    onFailure = {responseGoogleFailure}
                    />
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)