import React from 'react';
import Navbar from './components/navbar'
import './App.css';
import Showcase from './components/showcase';
import  { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Play from './components/Play';
import Store from './store';
import NewDashboard from './components/newDashboard';
import Category from './components/category';

function App() {
  return (
    <div className="App">
      <Store>
     
     <Router>
     <Navbar />
       <Switch>
       </Switch>
        <Route path='/test' exact component={Showcase}/>
        <Route path='/play' exact component={Play}/>
        <Route path='/' exact component={NewDashboard}/>
        <Route path='/cat' exact component={Category}/>
     </Router>
     </Store>
    </div>
  );
}

export default App;
