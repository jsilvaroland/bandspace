import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        const { currentUser, logout, openModal } = this.props;
        
        let mainNavStatus;

        currentUser ? 
            mainNavStatus = "main-nav-logged-in" :
            mainNavStatus = "main-nav-logged-out";
        
        const sessionLinks = () => (
            <nav className="login-signup">
                <a className="signup" onClick={() => openModal('signup')}>
                    sign up
                </a>
                <a className="login" onClick={() => openModal('login')}>
                    log in
                </a>
            </nav>
        );
        const logoutLink = () => (
            <hgroup className="header-group">
                <a className="logout" onClick={logout}>log out</a>
            </hgroup>
        );

        const welcomeMessage = () => (
            <div className="welcome-message">
                Discover music from across the galaxy.
            </div>
        );       
        
        // add another class to text-link maybe? to allow styling for just it
        // if site is splash, then there's left nav right nav, else not


        const { path } = this.props.match;

        if (!currentUser && path == '/') {
            return (
                <div className={mainNavStatus}>
                    <div className="left-nav-logged-out">
                        <div className="logo-wrapper">
                            {/*  */}
                                <div className="logo-placeholder">
                                    <Link className="logo-link" to="/">bandspace</Link>
                                </div>
                            {/*  */}
                        </div>
                        {currentUser ? null : welcomeMessage()}
                    </div>
                    <div className="right-nav-logged-out">
                        <div className="search-bar-wrapper">
                            <div className="search-bar-placeholder">
                                Search and discover music
                            </div>
                            {/* <div className="search-icon-placeholder">

                            </div> */}
                        </div>
                        {currentUser ? logoutLink(currentUser, logout) : sessionLinks()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={mainNavStatus}>
                    <div className="logo-placeholder">
                        <Link to="/">bandspace</Link>
                    </div>
                    {currentUser ? logoutLink(currentUser, logout) : sessionLinks()}
                </div>
            )
        }
    }
};

export default withRouter(NavigationBar);
