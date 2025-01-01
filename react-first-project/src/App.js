import logo from './logo.svg';
import './App.css';
import Calculator from './component/Calculator';
import Menu from './component/Menu';
import Login from './component/Login';
import HomePage from './component/HomePage';
import BillContribute from './component/BillContribute';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import {BrowserRouter, Navigate, Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom'
import ItemPrice from './component/ItemPrice';
import Trip from './component/Trip';
function App() {
  // all the calculation will be done on this page. 
  // other components will be used to set or get data
  // const updateName

  return (
    <>
    <Routes>
      <Route exact path='/' Component={HomePage}/>
      <Route exact path='/home' Component={Trip}/>
    </Routes>
    
    {/* <BillContribute />
    <BillContribute/>
    <BillContribute/>
    <BillContribute/> */}
    {/* <HomePage/> */}
    </>
    // <><Menu /><br></br><Login /><br></br><HomePage /></>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
