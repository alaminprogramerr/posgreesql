/*eslint-disable*/
import React from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {connect} from 'react-redux'
// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  if(props.isLoggedIn){
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            Home
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            About
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            Contact
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/login"
            color="transparent"
            className={classes.navLink}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    );
  }else{
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            Home
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            About
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/"
            color="transparent"
            className={classes.navLink}
          >
            Contact
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/login"
            color="transparent"
            className={classes.navLink}
          >
            Login
          </Button>
        </ListItem>
      </List>
    );
  }

}

const mapStateToProps = (state) =>{
  return ({
    isLoggedIn: state.isLoggedIn
  })
}

const mapDispatchToProps = (action) => {

}

export default connect(mapStateToProps)(HeaderLinks)
