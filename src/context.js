import React, { Component } from 'react';
import axios from 'axios';

//from here we will extract the 'Provider' & 'Consumer', to be used in 'App.js' & 'Contacts.js', resectively
const Context = React.createContext();



const reducer = (state, action) => {

  //'action.type' is jst a string we 'dispatch' to any consumer 'component' using this action(e.g 'DELETE_CONTACT')
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          //'action.payload' is the 'id' or 'object' we passing from our consumer Component
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        //so that the new payload we add, stays in front
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],

    //this connects the 'reducer/action' to the 'consumer component'
    //of course, once the state mutates, due to any 'switch case above', it takes effect via the 'Context.Provider' below, which makes it available all over our application
    dispatch: action => this.setState(state => reducer(state, action))
  
};

  // state = {
  //   contacts: [],
  //   dispatch: action => this.setState(state => reducer(state, action))
  // };

  //using async, we can store our response in var, and also use 'await'
  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    //reseting state, by refilling contacts[] with response data
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      //extracting 'Provider' from 'Context' var above
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

//extracting 'Consumer' from 'Context' var above
export const Consumer = Context.Consumer;