import React, { Component } from 'react'
import Contact from './Contact';

import { Consumer } from '../../context';

class Contacts extends Component {
    state = {
            contacts: []
        }
    
   
    
    render() {
        return (
            <Consumer>
                {value => {
                     //destructure contacts from state in context.js
                    const { contacts } = value;
                    return (
                        <React.Fragment>
                            <h1 className="display-4 mb-2">
                            <   span className="text-danger">Contact</span> List
                            </h1>

                        {/* looping tru array obj(contacts), using map */}
                        {contacts.map(contact => (
                            <Contact key={contact.id} contact={contact}
                            />
                        ))}
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )        

       
        
    }
}

export default Contacts;
