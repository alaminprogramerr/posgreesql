import React, { Component } from 'react';

import { BrowserRouter, Route} from "react-router-dom";
// import { DefaultLayout } from "./layouts";
import Home from "./views/Home/Home.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import DashboardPage from "./views/ProfileDashboard/DashboardPage.js";
import EditDashboardPage from "./views/ProfileDashboard/EditDashboardPage.js";
import "./assets/scss/material-kit-react.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import rootReducer from './redux/reducers/rootReducer'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {createStore} from 'redux'
import {Provider} from 'react-redux'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

 const pReducer = persistReducer(persistConfig, rootReducer);

 let reduxStore = createStore(pReducer, {},  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

 const persistor = persistStore(reduxStore)



/*

      react redux provides connect function which reads values from redux store and re-reads on state updates

      connect function --> Takes two optional arguments
          1) mapStateToProps() --> receives entire store state and returns the object of data the component needs
              * do you have to pass the state? where is the return value applied? 
          2) mapDispatchToProps --> can either be an object or function. 
              2.1) function --> receives dispatch as an argument, called once upon component creation
                                returns an object full of functions that use dispatch to dispatch actions
              2.2) object full of action creators, each action creator will be turned into a prop functionthat automatically
                                                  dispatches its action when called
*/




class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {
 
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js


render() {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<div>Hello</div>} persistor={persistor}>
    <div className="App">
 
      <BrowserRouter>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={DashboardPage}/>
            <Route path="/editprofile" component={EditDashboardPage}/>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    </div>
    </PersistGate>
    </Provider>
  );
  }
 }
 
export default App;