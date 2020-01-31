import React, { useState} from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup, FormInput,
        FormSelect, FormTextarea, Button } from "shards-react";

import {connect} from 'react-redux';
import login from '../../redux/actions/login';
import logout from '../../redux/actions/logout';

const axios = require('axios')

function EditUserAccountDetails (props) {

  const [firstname, setFirstName] = useState(props.user.first_name);
  const [lastname, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.username);
  const [phone, setPhone] = useState(props.user.phone);
  const [password, setPassword] = useState(props.user.password);
  const [address, setAddress] = useState(props.user.address);
  const [city, setCity] = useState(props.user.city);
  const [statename, setStateName] = useState(props.user.state_name);
  const [zipcode, setZipcode] = useState(props.user.zipcode);
  const [description, setDescription] = useState(props.user.account_description);
  
  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    console.log(e.target.value);
  }
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    console.log(e.target.value);
  }
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  } 
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  } 
  const phoneHandler = (e) => {
    setPhone(e.target.value);
    console.log(e.target.value);
  } 
  const addressHandler = (e) => {
    setAddress(e.target.value);
    console.log(e.target.value);
  } 
  const cityHandler = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  } 
  const stateNameHandler = (e) => {
    setStateName(e.target.value);
    console.log(e.target.value);
  } 
  const zipcodeHandler = (e) => {
    setZipcode(e.target.value);
    console.log(e.target.value);
  } 
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  }  

  const formSubmit = async (e) => {
    let userInput = {
      first_name: firstname,
      last_name: lastname,
      username: email,
      password: password,
      address: address,
      city: city,
      state_name: statename,
      zipcode: zipcode,
      account_description: description,
      job_title: props.user.job_title,
      phone: props.user.phone,
      job_description: props.user.job_description
    }
    console.log(userInput);
    try{
      let response = await axios({
        method:'put',
        url: 'http://localhost:5000/users/:'+props.user.id,
        headers: {
         'content-type': 'application/json'
        },
        data: userInput
      })
      let user = response.data; 
      props.loginDispatch(user);

    }catch(error){
      console.log('Error: '+error)
    }
  }

return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    defaultValue={props.user.first_name}
                    placeholder={props.user.first_name}
                   onChange={e => firstNameHandler(e)}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    defaultValue={props.user.last_name}
                    placeholder={props.user.last_name}
                    onChange={e => lastNameHandler(e)}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Phone Number</label>
                  <FormInput
                    id="fePhone"
                    defaultValue={props.user.phone}
                    placeholder={props.user.phone}
                   onChange={e => phoneHandler(e)}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    defaultValue={props.user.username}
                    placeholder={props.user.username}
                    onChange={e => emailHandler(e)}
                    autoComplete="email"
                    disabled
                  />
                </Col>
                
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    defaultValue={props.user.password}
                    placeholder={props.user.password}
                    onChange={e => passwordHandler(e)}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  defaultValue={props.user.address}
                  placeholder={props.user.address}
                  onChange={e => addressHandler(e)}
                />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    defaultValue={props.user.city}
                    placeholder={props.user.city}
                    onChange={e => cityHandler(e)}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState" defaultValue={props.user.state_name}
                    placeholder={props.user.state_name}
                    onChange={e => stateNameHandler(e)}>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AR">AR</option>	
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>	
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>	
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>	
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>			
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>	
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                  </FormSelect>
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    defaultValue={props.user.zipcode}
                    placeholder={props.user.zipcode}
                    onChange={e => zipcodeHandler(e)}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea 
                    id="feDescription" 
                    rows="5" 
                    defaultValue={props.user.account_description}
                    placeholder={props.user.account_description}
                    onChange={e => descriptionHandler(e)}
                  />
                </Col>
              </Row>
              <Button onClick={e=>formSubmit(e)}>Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
  );
}

EditUserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

EditUserAccountDetails.defaultProps = {
  title: "Account Details"
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    //additional props
    title: 'Account Details'
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserAccountDetails);
