import React, { Component } from 'react'

import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
//import {v4 as uuid} from 'uuid';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        //console.log(this.state); //cos the state changes, per Onchange Input

        //now we have our state with new input values
        const { name, email, phone } = this.state;

        // Check For Errors
        if (name === '') {
            //passing object-value into the empty error array
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
    
        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }
    
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }


        //storing new values in array, and passing it to dispatch below
        // const newContact = {
        //     id: uuid(), name, email, phone
        // }

        const newContact = {
            name,
            email,
            phone
          };
      
          const res = await axios.post(
            'https://jsonplaceholder.typicode.com/users',
            newContact
          );

          dispatch({ type: 'ADD_CONTACT', payload: res.data });

        // Clear State, after adding(dispathing)
        this.setState({
        name: '',
        email: '',
        phone: '',
        errors: {}
        });

        //redirect to home page, after adding
        this.props.history.push('/');
        
    }

    //'e.target.name' is the name attribute of our input fields below
    //changing each 'state obj value', as we type in input field value below
    onChange = e => this.setState({ [e.target.name]: e.target.value });


    render() {

        //destructure form objects from state
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    //destructure dispatch
                    const { dispatch } = value;

                    return (
                        <div className="card mb-3">

                        <div className="card-header">
                            Add Contact
                        </div>

                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                            <TextInputGroup
                                label="Name"
                                name="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={this.onChange}
                                //only runs if error exists
                                error={errors.name}
                            />
                            <TextInputGroup
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            <TextInputGroup
                                label="Phone"
                                name="phone"
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={this.onChange}
                                error={errors.phone}
                            />
        
                                <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
                            </form>
                        </div>
                    </div>
                    );
                }}
            </Consumer>
           
        )
    }
}

export default AddContact; 
