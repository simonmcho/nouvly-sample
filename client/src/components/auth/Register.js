import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from  'react-redux';
import { registerUser } from '../../actions/authActions';

import { setAlert } from '../../actions/alert';

class Register extends Component {
  constructor(props) {
    super(props);
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

    this.props.registerUser(newUser, this.props.history);
  }

  // This lifecycle method is deprecated. Look at other lifecycle methods to deal with errors coming in from the store and comparing against current errors
  componentWillReceiveProps(nextProps) { // So we can use this component's state errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {

    const { name, email, password, passwordConfirm, errors } = this.state;
    //const { user } = this.props.auth; // This is the auth property from props that comes from mapStateToProps in this file

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Nouvly account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                 <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  type="email"
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  type="password"
                  onChange={this.onChange}
                  error={errors.passwordConfirm}
                />
                {/* <div className="form-group">
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
                </div> */}
                {/* <div className="form-group">
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
                </div> */}
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
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ // state is the store state
  auth: state.auth, // comes from root reducer. accessible by this.props.auth
  errors: state.errors
});


export default connect(mapStateToProps, { registerUser, setAlert })(withRouter(Register));
