import React, { Component } from 'react';
import './BrackIt.css';

import Main from "./Components/MainPage/Main"
import Secret from "./Components/Secret"
import NotFound from "./Components/Navigation/NotFound"
import Callback from './Components/Navigation/Callback';

export default class BrackIt extends Component {
  render() {
    // establishes which component will be shown based off of location in state (based off of url)
    // Main is the initial landing page

    let mainComponent
    switch (this.props.location) {
      case "":
        mainComponent = <Main
          {...this.props} />
        break
      case "callback":
        mainComponent = <Callback />
        break
      case "secret":
        mainComponent = this.props.auth.isAuthenticated()
          ?
          <Secret
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

