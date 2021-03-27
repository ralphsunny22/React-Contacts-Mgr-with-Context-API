//copy of AddContact.js
import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

//async to make use of 'await', and save axios request in var 'res'(if new copy of request is needed)
//as cpt mounts, we grab what we want to edit/show
  async componentDidMount() {
    const { id } = this.props.match.params; //catching id in react from a link kind of get request
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    //destructure to save editable res.data in var 'contact'
    const contact = res.data;

    //since all form inputs are in 'state', we reset input states, using present 'contact' values
    //present state now has new data. This why the input fields are filled on show
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
    //at this point, due the lifecycle-hook(componentDidMount) containing setState, anywhr these input names are found in our render(), they shld bear their respective values as say {name}, {email}, {phone}
  }
//end of componentDidMount()

//onClick of update btn
//put async in front, cos its a customise mtd
  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    //destructure input values from state, so that we can check for empty & place errors
    //of course the state shld be filled by now
    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === '') {
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

    //grabbing values as destructured from 'state above
    const updContact = {
      name,
      email,
      phone
    };

    //get the 'id' to pass
    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //redirect to '/'
    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                {/* onSubmit is a fxn in vanilla js, buh its calling customise mtd(onSubmit()) above, binded with 'dispatch' from 'Context.js' */}
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
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
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
