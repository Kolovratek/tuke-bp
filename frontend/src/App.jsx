import React from 'react';
import './App.css';
import { Outlet, NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className="Navbar">
      <NavLink
        to={`/`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
        Uploader
      </NavLink>{' '}
      <NavLink
        to={`/datasets`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
        Datasets
      </NavLink>{' '}
      <NavLink
        to={`/visualization`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
        Data-Visualization
      </NavLink>{' '}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Menu />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
