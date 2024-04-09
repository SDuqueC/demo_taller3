import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import Manage from "./components/Manage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Navigation />
          <Routes>
              <Route path="/" element={<Users/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/manage" element={<Manage/>} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;
