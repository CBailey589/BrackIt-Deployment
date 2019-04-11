import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from "./Components/Main"
import Secret from "./Components/Secret"
import NotFound from "./Components/NotFound"
import Callback from './Components/Callback';

class App extends Component {
  render() {
    let mainComponent = ""
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {this.props.name}</h1>
        </header>

        {mainComponent}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          </a>
      </div>
    );
  }
}

export default App;
