import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import '../styles/App.css';

// import route Components here
// import Hello from './HelloComponent';
import OurRepair from './our-repair';
import Books from './BooksComponent';
import RepairLists from './repair-list';
import DeviceListing from './device-listing';
import RepairCost from './repair-cost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="">
          <ul>
             <li><Link to="/our-repair">Our Repair</Link></li>
             <li><Link to="/books">Books</Link></li>
          </ul>
          <hr/>
          {/* Routes will go here
            <Route exact={true} path="/" component={Home} />
            */}
            <Route path="/our-repair" component={OurRepair} />
            <Route path="/books" component={Books} />
            <Route path="/repair-list" component={RepairLists} />
            <Route path="/device-listing" component={DeviceListing} />
            <Route path="/repair-cost" component={RepairCost} />
      </div>
  </div>
    );
  }
}
export default App;
