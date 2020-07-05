import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';


const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // composeWithDevTools()
);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

