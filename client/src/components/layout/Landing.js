import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  // This prevents user from being on landing page if logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return (
      <div>
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">nouvly
                    </h1>
                    <p className="lead">find your best thing</p>
                    <hr />
                    <Link to="/register" className="btn btn-lg btn-info mr-2">Register</Link>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);
