import React from 'react';
import Layout from './pages/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Layout} />
      </Router>
    </Provider>
  );
}

export default App;
