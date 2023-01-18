import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from "redux";
import combineReducers from "./redux/reducers/combineReducers"
import thunk from "redux-thunk";
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
