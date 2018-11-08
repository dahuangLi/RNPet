import React, {Component} from 'react';
import {AppLogin} from './login/';
import {store} from '../Redux/store/store';
import { Provider } from 'react-redux';

export default class App extends Component{
  render (){
    return (
      <Provider store={store}>
        <AppLogin />
      </Provider>
    )
  }
}
