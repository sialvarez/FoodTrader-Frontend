import React, { Component } from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "./App.css";
import Routes from "./Routes";
import rootReducer from './reducers';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
