import React from 'react';
import './App.css';
import { Outlet, NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className="Navbar">
      <NavLink
        to={`/`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
      >
        Uploader
      </NavLink>{' '}
      <NavLink
        to={`/generate`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
      >
        Generate
      </NavLink>{' '}
      <NavLink
        to={`/datasets`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
      >
        Datasets
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
