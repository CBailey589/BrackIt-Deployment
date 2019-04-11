import React, { Component } from 'react';
import './BrackIt.css';

import Main from "./Components/MainPage/Main"
import NotFound from "./Components/Navigation/NotFound"
import Callback from './Components/Navigation/Callback';
import ApplicationViews from './Components/ApplicationViews';

export default class BrackIt extends Component {
  render() {
    // establishes which component will be shown based off of location in state (based off of url)
    // Main is the initial landing page
    // profile is the "application views" that will switch between the users "home page" and any bracket they make
    let mainComponent
    switch (this.props.location) {
      case "":
        mainComponent = <Main
          {...this.props} />
        break
      case "callback":
        mainComponent = <Callback />
        break
      case "profile":
        mainComponent = this.props.auth.isAuthenticated()
          ?
          <ApplicationViews
            {...this.props} />
          :
          <NotFound />
        break
      default:
        mainComponent = <NotFound />
    }



    return (
      <React.Fragment>
        <div className="App">
          {mainComponent}
        </div>
      </React.Fragment>
    );
  }
}

