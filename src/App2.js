import React from 'react';
import Home from './Components/home'
import Navbar2 from './Components/Navbar2';

import Pending from './Components/pending';
import 'bootstrap/dist/css/bootstrap.min.css';
function App2() {
 

  return (                                                                                                            
 
    <div className='App'>
      <Navbar2/>
      {/* <Home/> */}
      <Pending/>
    </div>
  );
}

export default App2;
