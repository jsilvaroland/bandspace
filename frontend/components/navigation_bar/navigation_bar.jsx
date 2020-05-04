import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        const { currentUser, logout, openModal } = this.props;
        
        let mainNavStatus;

        // if (!currentUser && path == '/') {
            
        // }
        
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
            <a className="logout" onClick={logout}>log out</a>
        );

        const welcomeMessage = () => (
            <div className="welcome-message">
                Spellbinding songs and sirenic soundscape from space.
            </div>
        );       
        
        const userMenuDropdown = () => (
            <ul className="user-menu-ul">
                <li className="user-menu-userpage-item">
                    <Link className="userpage-link" to="">
                        <div className="band-name">{currentUser.username}</div>
                        <div className="view-site">view site</div>
                    </Link>
                </li>
                <li className="user-menu-item">
                    {logoutLink(currentUser, logout)}
                </li>
            </ul>
        );

        const userMenuClick = () => (
            
        );

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
                        {/* refactor this search bar into a const on top of render */}
                        {/* change it to input with placeholder text of "Search and discover music" */}
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
        } else if (currentUser) {
            return (
                <div className={mainNavStatus}>
                    <div className="left-nav-logged-in">
                        <div className="logo-wrapper-logged-in">
                            <div className="logo-placeholder-logged-in">
                                <Link className="logo-link-logged-in" to="/">bandspace</Link>
                            </div>
                        </div>
                        <div className="search-bar-wrapper-logged-in">
                            <div className="search-bar-placeholder-logged-in">
                                Search and discover music 
                            </div>
                            {/* <div className="search-icon-placeholder">

                            </div> */}
                        </div>
                    </div>
                    <div className="right-nav-logged-in">
                        <div className="nav-bar-icons">

                            {/* maybe these should be ids instead of classes */}

                            {/* these are only here for fan accounts
                            <div className="feed-icon">bolt</div> 
                            <div className="collection-icon">heart</div> */}
                            
                            <div className="user-menu-dropdown">
                                <a className="user-menu-btn" onClick={userMenuClick()}>
                                    <div className="user-pic"></div>
                                </a>
                                {userMenuDropdown()}
                            </div>
                        </div>
                        {/* {logoutLink(currentUser, logout)} */}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="main-nav-logged-out-not-splash">
                    Logged out but not on splash
                </div>
            )
        }
    }
};

export default withRouter(NavigationBar);
