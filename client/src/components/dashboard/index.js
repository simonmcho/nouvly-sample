import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import PropTypes from 'prop-types';

import LoadingSpinner from '../common/LoadingSpinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    } 

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <LoadingSpinner />;
        } else {

            // Assign different components to render based on existence of user's profile
            if (Object.keys(profile).length) {
                // To do - Display profile that exists
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link></p>
                        <ProfileActions />
                        {/* TODO: EXP AND EDU */}
                        <div style={{ marginBottom: '60px' }} />
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                    </div>
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = 
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>You have not setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile!
                        </Link>
                    </div>
            }
        }
        
        return (
            <div>
                <div className="container">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);