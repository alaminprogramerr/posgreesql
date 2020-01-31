import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

import {connect} from 'react-redux'
import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'

const UserDetails = (props) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={props.avatar}
          alt='Avatar Image'
          width="110"
        />
      </div>
      <h4 className="mb-0">{props.user.first_name+" "+props.user.last_name}</h4>
      <span className="text-muted d-block mb-2">{props.user.job_title}</span>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            Workload
          </strong>
          <Progress
            className="progress-sm"
            value={props.performanceReportValue}
          >
            <span className="progress-value">
              {props.performanceReportValue}}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
        Description
        </strong>
        <span>
          {props.user.job_description}
        </span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
 /*  userDetails: {
    name: "Sir Robert Burbridge",
    avatar: require("./../../images/avatars/client.png"),
    jobTitle: "Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
  } */
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    //Info from userDetails
    avatar: require("./../../images/avatars/client.png"),
    performanceReportValue: 74
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
