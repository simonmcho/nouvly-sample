import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from  'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {}  
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;

    const newUser = {
      name,
      email,
      password,
      passwordConfirm
    }
    console.log("CALLING REGISTER USER FROM Register.js CLASS COMPONENT")
    this.props.registerUser(newUser);

    // Register user
    // axios.post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => {
    //     const errors = err.response.data;
    //     //console.log(errors)
    //     this.setState({
    //       errors
    //     });
    //   });
  }
  

  render() {

    const { errors } = this.state;
    const { user } = this.props.auth; // This is the auth property from props that comes from mapStateToProps in this file
    // It contains the object from the authReducer

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Nouvly account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.name
                    })}
                    placeholder="Name" 
                    name="name" 
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.email
                    })}
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.password
                    })}
                    placeholder="Password"
                    name="password" 
                    value={this.state.password}   
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.passwordConfirm
                    })}
                    placeholder="Confirm Password" 
                    name="passwordConfirm"
                    value={this.state.passwordConfirm} 
                    onChange={this.onChange}
                  />
                  {errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>)}
                </div>
                <input 
                  type="submit" 
                  className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
}); // Returning object literal

export default connect(mapStateToProps, { registerUser })(Register);
// This is a HOC
// This is accepting 2 arguments, 1st an object, and 2nd is the authAction.
// Then returns a component, in this case, Register, with props for the component. 
// the object that gets the state.auth is the 1st prop, the 2nd is the registerUser action, so that is also a prop of this component