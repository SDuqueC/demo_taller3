import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Users from "./pages/Users";
import ManageUsers from "./pages/ManageUsers";
import Products from "./pages/Products";
import ManageProducts from "./pages/ManageProducts";
import ProductsDashboard from "./pages/ProductsDashboard";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Navigation />
          <Routes>
              <Route path="/" element={<Users/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/manage_users" element={<ManageUsers/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/manage_products" element={<ManageProducts/>} />
              <Route path="/dashboard" element={<ProductsDashboard/>} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;
