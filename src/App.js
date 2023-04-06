import React from 'react';
import Home from './Components/home'
import Navbar from './Components/Navbar';

import Pending from './Components/pending';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 

  return (                                                                                                            
 
    <div className='App'>
      <Navbar/>
      <Home/>
      <Pending/>
    </div>
  );
}

export default App;
