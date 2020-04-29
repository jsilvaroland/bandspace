import React from 'react';

class NavigationBar extends React.Component {
    render() {
        const { currentUser, logout, openModal } = this.props;
        const sessionLinks = () => (
            <nav className="login-signup">
                <button onClick={() => openModal('signup')}>sign up</button>
                <button onClick={() => openModal('login')}>log in</button>
            </nav>
        );
        debugger;
        const personalGreeting = () => (
            <hgroup className="header-group">
                {/* <h2 className="header-name">Hi, {currentUser.username}!</h2> */}
                <button className="header-button" onClick={logout}>Log Out</button>
            </hgroup>
        );

        return (
            currentUser ?
                personalGreeting(currentUser, logout) :
                sessionLinks()
        );
    }
};

export default NavigationBar;
