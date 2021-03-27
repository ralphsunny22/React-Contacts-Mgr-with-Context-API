import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import { Consumer } from '../../context';
import axios from 'axios';


class Contact extends Component {

    state = {
        showContactInfo: false
      };

    //since we can remain on same pg, after ciicking delete btn, we a customise mtd
    //any action to mutate the 'state', will now be manipulated from 'context.js'
    onDeleteClick = async (id, dispatch) => {
        //this.props.deleteClickHandler();
        try {
            //not stored in var, cos we aint doing anytin with deleted object yet
          await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
          dispatch({ type: 'DELETE_CONTACT', payload: id });
        } catch (e) {
          dispatch({ type: 'DELETE_CONTACT', payload: id });
        }
      };

    render() {
        //destructure
        const { id, name, email, phone } = this.props.contact

        //destructure, to be used as tenary condn below
        const { showContactInfo } = this.state;
        
        return (

            <Consumer>
                {value => {
                    //destructure dispatch from state in context.js. Will be passed to 'onDeleteClick()' below, cos 'dispatch' needs to communicate with
                    const { dispatch } = value;

                    return (
                        <div className="card card-body mb-3">
                            <h4>Name: { name } {' '}
                                <i 
                                onClick={() =>
                                    this.setState({
                                    showContactInfo: !this.state.showContactInfo
                                    })
                                }
                                className="fas fa-sort-down" style={{ cursor:'pointer' }}>
                                </i>
            
                                <i
                                className="fas fa-times"
                                style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                                onClick={this.onDeleteClick.bind(this, id, dispatch)}
                                />

                                <Link to={`contact/edit/${id}`}>
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        color: 'black',
                                        marginRight: '1rem'
                                        }}
                                    />
                                </Link>


                            </h4>
            
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: { email }</li>
                                    <li className="list-group-item">Phone: { phone }</li>
                                </ul>
                            ) : null}
                            
                        </div>
                    )
                }}
            </Consumer>

            
            
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    //deleteClickHandler: PropTypes.func.isRequired,
};

export default Contact;
