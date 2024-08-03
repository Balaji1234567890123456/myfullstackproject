import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Register from "./components/register"
import reportWebVitals from './reportWebVitals';
import Todo from "./components/todo"
import {BrowserRouter,Route,Routes} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Register/>}/>
      <Route exact path="/todo" element={<Todo/>}/>
    </Routes>
    </BrowserRouter>

    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
