import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile, getCurrentProfile } from '../../actions/profileActions.js';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log("COMPONENT MOUNTING!");
        this.props.getCurrentProfile()
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("WILL RECEIVE PROPS!");
    //     if (nextProps.errors) {
    //         this.setState({ errors: nextProps.errors });
    //     }

    //     if (nextProps.profile.profile) {
    //         const profile = nextProps.profile.profile;

    //         // Bring skills array back to CSV (Comma Seperated Values)
    //         const skillsCSV = profile.skills.join(',');

    //         // If profile field doesn't exist, make empty string
    //         profile.company = !isEmpty(profile.company) ? profile.company : '';
    //         profile.website = !isEmpty(profile.website) ? profile.website : '';
    //         profile.location = !isEmpty(profile.location) ? profile.location : '';
    //         profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
    //         profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

    //         profile.social = !isEmpty(profile.social) ? profile.social : {};
    //         profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
    //         profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
    //         profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
    //         profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
    //         profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

    //         // Set component fields state
    //         this.setState({
    //             handle: profile.handle,
    //             company: profile.company,
    //             website: profile.website,
    //             location: profile.location,
    //             status: profile.status,
    //             skills: skillsCSV,
    //             githubusername: profile.githubusername,
    //             bio: profile.bio,
    //             twitter: profile.twitter,
    //             facebook: profile.facebook,
    //             linkedin: profile.linkedin,
    //             youtube: profile.youtube,
    //             instagram: profile.instagram
    //         });
    //     }
    // }

    componentDidUpdate(nextProps) {

        if (nextProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }

        if (nextProps.profile.profile !== this.props.profile.profile) {

            const profile = this.props.profile.profile;

            // Bring skills array back to CSV (Comma Seperated Values)
            const skillsCSV = profile.skills.join(',');

            // If profile field doesn't exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
            
        }
    }

    // change handler for input fields
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // submit handler for form
    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    render() {

        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                     <InputGroup
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )

        }
        
        // Select options for status
        const options = [
            {
                label: '* Select Professional Status',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Intern',
                value: 'Intern'
            },
            {
                label: 'Other',
                value: 'Other'
            }
        ];

        return (
            <div className="edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile!  
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="What is your career status?"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Company that you work for"
                                />
                                 <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Website"
                                />
                                 <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Where you at"
                                />
                                 <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Career skills"
                                />
                                 <TextFieldGroup
                                    placeholder="Github username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="Github status"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button 
                                        type="button"
                                        className="btn btn-light"
                                        onClick={e => { // Toggle display inputs
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }} 
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted" style={{ 'marginLeft': '20px' }}>Optional</span>
                                    {socialInputs}
                                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));