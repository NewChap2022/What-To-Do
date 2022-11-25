import "bootswatch/dist/sketchy/bootstrap.min.css"
import './App.css';
import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store';

import Home from './pages/Home';
import List from "./pages/List";

export default function App() {
  return (
    <BrowserRouter baseName={process.env.PUBLIC_URL}>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              exact
              path="/list"
              element={<List />}
            />
          </Routes>
        </Provider>
      </Router>
    </BrowserRouter>
  );
}
