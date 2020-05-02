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
                isArtist: true      // for now, every new account will be an artist account
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
        return (
            <ul>
                {
                    errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))
                }
            </ul>
        );
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
            otherFormText = `Don't have an account?`
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
            termsText = 'Lucky you, no terms of use.'
        }

        return(
            <div className={`modal-${formType}`}>
                <div className={`modal-${formType}-titlebar`}>
                    {formTitleText}
                </div>
                <div className={`modal-${formType}-content`}>
                    <form className="modal-form" onSubmit={this.handleSubmit}>
                        {emailLabel}
                        {emailField}
                        {usernameLabel}
                        {usernameField}
                        {passwordLabel}
                        {passwordField}
                        <div className="session-errors">{this.renderErrors()}</div>
                        <div className="terms-text">{termsText}</div>
                        <button className="submit">{buttonText}</button>
                    </form>
                    {demoButton}
                    <div id="other-modal-text">{otherFormText}</div>
                    <div id="other-modal-link">{otherForm}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(SessionForm);
