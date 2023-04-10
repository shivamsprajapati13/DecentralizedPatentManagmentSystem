import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="pending" element={<App2 />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// const Routing = () => {
//     return(
//       <Router>
//           <Route exact path="/" component={App} />
//           <Route path="/pending" component={App2} />
//       </Router>
//     )
//   }

//   ReactDOM.render(
//     <React.StrictMode>
//       <Routing />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
//   ReactDOM.render(<App />, document.getElementById('root'));
