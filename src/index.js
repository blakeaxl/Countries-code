import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import generateStore from './redux/store';

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

