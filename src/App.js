
import React from 'react';
import Home from './Components/home'
import Navbar from './Components/Navbar';

import Pending from './Components/pending';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 
  if(window.location.pathname=="/"){
    return (
      <div className='App'>
        <Navbar /><Home /><Pending/>
        </div>

    );
    
  }
  if(window.location.pathname=="/pending"){
    return (
      <div className='App'>
        <Navbar /><Pending />
        </div>

    );
  }

}

export default App;
