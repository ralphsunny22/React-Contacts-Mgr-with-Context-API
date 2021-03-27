import Header from './components/layout/Header';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Contacts from './components/contacts/Contacts';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './context';

function App() {
  //wrapping with 'Provider' means, the 'state' in context.js in now available all over our application
  //so for any component below that needs the 'state object values', we wrap it with 'Consumer'. See 'Contacts.js'
  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header branding="Contact Manager" />
          
          <div className="container">
            <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
          </div>     
        </div>
      </Router>
      
    </Provider>
  );
}



export default App;