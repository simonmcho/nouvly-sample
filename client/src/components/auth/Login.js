import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
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

  // On login, if authenticated, forward user to /dashboard
  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) { // Is this needed with componentDidMount? Todo: Check and refactor this class
      this.props.history.push('/dashboard');
    }

    if (prevProps.errors !== this.props.errors) { // Check prevProps error object vs current props error object
      this.setState({
        errors: this.props.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    const userData = {
      email,
      password
    }
    
    // Register userData
    this.props.loginUser(userData);
  }

  render() {
    const { email, password, errors } = this.state;
    
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your Nouvly account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  type="email"
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input 
                  type="submit" 
                  className="btn btn-info btn-block mt-4" 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  status: state
});

export default connect(mapStateToProps, { loginUser })(Login);