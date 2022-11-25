import "bootswatch/dist/sketchy/bootstrap.min.css"
import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store';

import Home from './pages/Home';
import List from "./pages/List";

export default function App() {
  return (
      <HashRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/list"
              element={<List />}
            />
          </Routes>
        </Provider>
      </HashRouter>
  );
}
