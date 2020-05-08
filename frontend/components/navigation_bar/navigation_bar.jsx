import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false };

        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onUserMenuClick = this.onUserMenuClick.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    toggleDropdown() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.collapse();
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }

    collapse() {
        this.setState({ active: false });
    }
    
    onUserMenuClick(e) {
        this.toggleDropdown();
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    render() {
        
        const { currentUser, logout, openModal } = this.props;
        const { pathname } = this.props.history.location;
        
        let mainNavStatus;
        let sessionLinksClass;

        pathname == '/' ?
            sessionLinksClass = "login-signup" :
            sessionLinksClass = "login-signup-not-splash";

        currentUser ? 
            mainNavStatus = "main-nav-logged-in" :
            mainNavStatus = "main-nav-logged-out";
        
        const sessionLinks = () => (
            <nav className={sessionLinksClass}>
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
                Spellbinding songs and sirenic soundscapes from space.
            </div>
        );       
        
        const userMenuDropdown = () => (
            <ul className="user-menu-ul" id={this.state.active ? "show" : null}>
                <li className="user-menu-userpage-item">
                    <Link className="userpage-link" to={`/artists/${currentUser.id}`}>
                        <div className="band-name">{currentUser.username}</div>
                        <div className="view-site">view site</div>
                    </Link>
                </li>
                <li className="user-menu-item">
                    {logoutLink(currentUser, logout)}
                </li>
            </ul>
        );


        if (!currentUser && pathname == '/') {
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
                        <div className="logo-wrapper-not-splash">
                            <div className="logo-placeholder-not-splash">
                                <Link className="logo-link-not-splash" to="/">bandspace</Link>
                            </div>
                        </div>
                        {/* <div className="search-bar-wrapper-logged-in">
                            <div className="search-bar-placeholder-logged-in">
                                Search and discover music 
                            </div>
                            <div className="search-icon-placeholder">
                            </div>
                        </div> */}
                    </div>
                    <div className="right-nav-logged-in">
                        <div className="nav-bar-icons">

                            {/* maybe these should be ids instead of classes */}

                            {/* these are only here for fan accounts
                            <div className="feed-icon">bolt</div> 
                            <div className="collection-icon">heart</div> */}
                            
                            <div className="user-menu-dropdown" ref={this.setWrapperRef}>
                                <a className="user-menu-btn" onClick={this.onUserMenuClick}>
                                    <div className="user-pic"></div>
                                </a>
                                {userMenuDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else { // will have to add another else for if you are an artist on your own page, because nav bar looks diff in that case
            return (
                <div className="main-nav-logged-out-not-splash">
                    <div className="left-nav-logged-out-not-splash">
                        <div className="logo-wrapper-not-splash">
                            <div className="logo-placeholder-not-splash">
                                <Link className="logo-link-not-splash" to="/">bandspace</Link>
                            </div>
                        </div>
                        {/* <div className="search-bar-wrapper-logged-in">
                            <div className="search-bar-placeholder-logged-in">
                                Search and discover music
                            </div>
                            <div className="search-icon-placeholder">

                            </div>
                        </div> */}
                    </div>
                    <div className="right-nav-logged-out-not-splash">
                       {sessionLinks()}
                    </div>
                </div>
            )
        }
    }
};

export default withRouter(NavigationBar);
