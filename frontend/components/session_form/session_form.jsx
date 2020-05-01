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
        let formTitleText, buttonText, otherFormText, demoButton, emailField;

        if (formType == 'login') {
            formTitleText = buttonText = 'Log in';
            otherFormText = `Don't have an account?`
            demoButton = (<button onClick={this.demoLogin}>Demo login</button>)
        } else {
            formTitleText = 'Sign up for a Bandspace account';
            emailField = (<label>Email address
                            <input
                            type="text"
                            value={this.state.email}
                            onChange={this.change('email')}
                            />
                        </label>)
            buttonText = 'Sign up';
            otherFormText = `Already have an account?`
        }

        return(
            <div className={`modal-${formType}`}>
                <div className={`modal-${formType}-titlebar`}>
                    {formTitleText}
                </div>
                <div className={`modal-${formType}-content`}>
                    <form onSubmit={this.handleSubmit}>
                        {emailField}
                        <br/>
                        <label>Username
                            <input
                                type="text"
                                value={this.state.username}
                                onChange={this.change('username')}
                            />
                        </label>
                        <br/>
                        <label>Password
                            <input
                            type="password"
                            value={this.state.password}
                            onChange={this.change('password')}
                            />
                        </label>
                        <br/>
                        <div id="session-errors">{this.renderErrors()}</div>
                        <button className="submit">{buttonText}</button>
                        <br/>
                    </form>
                    {demoButton}
                    <br/>
                    <div id="other-modal-text">{otherFormText}</div>
                    <div id="other-modal-link">{otherForm}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(SessionForm);
