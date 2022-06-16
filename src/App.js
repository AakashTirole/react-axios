import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import UseOfReduce from './component/UseOfReduce';
import UseOfFilter from './component/UseOfFilter';

//For routing
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
class App extends React.Component {
  render(){
    return (
      <div className="App">
          <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Login </Link></li>
                <li><Link to={'/UseOfReduce'} className="nav-link">Use of Reduce</Link></li>
                <li><Link to={'/UseOfFilter'} className="nav-link">Use of Filter</Link></li>
              </ul>
              </nav>
              <hr />
              <Routes>
                  <Route exact path='/' element={<Login/>} />
                  <Route path='/UseOfReduce' element={<UseOfReduce/>} />
                  <Route path='/UseOfFilter' element={<UseOfFilter/>} />
              </Routes>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
