import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.formType == 'login' ? 
            this.state = { 
                username: '', 
                password: '' 
            } :
            this.state = { 
                username: '', 
                email: '', 
                password: '', 
                isArtist: true
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    change(field) {
        return e => this.setState({ [field]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, isArtist: is_artist } = this.state;           // why isn't camelize in environment.rb fixing this?
        this.props.processForm({ username, email, password, is_artist })
            .then(this.props.closeModal);
    }

    demoLogin() {
        const demoUser = {
            username: 'demo',
            email: 'demo@demo.com',
            password: 'demo',
            is_artist: true,
        };
        this.props.processForm(demoUser)
            .then(this.props.closeModal);
    }

    renderErrors() {
        const { errors } = this.props;
        if (!!errors.length) {
            return (
                <div className="session-errors">
                    <ul>
                        {
                            errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))
                        }
                    </ul>
                </div>
            );
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const { formType, otherForm } = this.props;
        let formTitleText, buttonText, otherFormText, demoButton, emailLabel,
            emailField, usernameLabel, usernameField, passwordLabel,
            passwordField, termsText;

        if (formType == 'login') {
            formTitleText = buttonText = 'Log in';
            usernameField = (<input className="modal-input"
                                style={{ marginBottom: "10px" }}
                                type="text"
                                value={this.state.username}
                                placeholder="Username"
                                onChange={this.change('username')}
                            />)
            passwordField = (<input className="modal-input"
                                type="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.change('password')}
                            />)
            otherFormText = "Don't have an account?"
            demoButton = (<button 
                            className="submit" 
                            onClick={this.demoLogin}
                            >
                            Demo login</button>)
        } else {
            formTitleText = 'Sign up for a Bandspace account';
            emailLabel = (<label className="modal-label">Email address</label>)
            emailField = (<input className="modal-input"
                            type="text"
                            value={this.state.email}
                            onChange={this.change('email')}
                         />)
            usernameLabel = (<label className="modal-label">Username</label>)
            usernameField = (<input className="modal-input"
                                type="text"
                                value={this.state.username}
                                onChange={this.change('username')}
                            />)
            passwordLabel = (<label className="modal-label">Password</label>)
            passwordField = (<input className="modal-input"
                                type="password"
                                value={this.state.password}
                                onChange={this.change('password')}
                            />)
            buttonText = 'Sign up';
            otherFormText = 'Already have an account?'
            termsText = (<div className="terms-text">Lucky you, no terms of use.</div>)
        }

        return(
            <div className={`modal-${formType}`}>
                <div className={`modal-${formType}-titlebar`}>
                    {formTitleText}
                    <span className="close" onClick={this.props.closeModal}>
                        &times;
                    </span>
                </div>
                <div className={`modal-${formType}-content`}>
                    <form className="modal-form" onSubmit={this.handleSubmit}>
                        {emailLabel}
                        {emailField}
                        {usernameLabel}
                        {usernameField}
                        {passwordLabel}
                        {passwordField}
                        {this.renderErrors()}
                        {termsText}
                        <button className="submit">{buttonText}</button>
                    </form>
                    {demoButton}
                    <div className="other-modal-wrapper">
                        <div className="other-modal-text">{otherFormText}</div>
                        <div className="other-modal-link">{otherForm}.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SessionForm);
