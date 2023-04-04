import React from 'react';
import Home from './Components/home'
import Navbar from './Components/Navbar';
import Admin from './Components/admin';
import Pending from './Components/pending';
function App() {
 

  return (
 
    <div className='App'>
      <Navbar/>
      <Pending/>
      {/* <Admin/> */}
 
    </div>
  );
}

export default App;
