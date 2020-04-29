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
        this.renderErrors = this.renderErrors.bind(this);
    }

    change(field) {
        return e => this.setState({ [field]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, isArtist: is_artist } = this.state;           // why isn't camelize in environment.rb fixing this?
        this.props.processForm({ username, email, password, is_artist })
            .then(this.props.closeModal) //.fail if credentials aren't met?
            // .fail(this.renderErrors());
    }

    renderErrors() {
        const { errors } = this.props;
        debugger;
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

    render() {
        const { formType } = this.props;
        let formTitleText, buttonText;
        let emailField;

        if (formType == 'login') {
            formTitleText = buttonText = 'Log in';
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
        }

        return(
            <div>
                <h3>{formTitleText}</h3>
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
                    {() => this.renderErrors}
                    <br/>
                    <button>{buttonText}</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SessionForm);
