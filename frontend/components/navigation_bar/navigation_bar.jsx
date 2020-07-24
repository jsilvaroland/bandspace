import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchContainer from '../search/search_container';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeDropDown: null };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.setAddWrapperRef = this.setAddWrapperRef.bind(this);
        this.setUserWrapperRef = this.setUserWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onClick = this.onClick.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    componentDidMount() {
        this.mousedownCallback = e => this.handleClickOutside(e);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.mousedownCallback);
    }

    componentDidUpdate() {
        if (!this.props.currentUser) {
            document.removeEventListener('mousedown', this.mousedownCallback);
        } else if (this.props.currentUser) {
            document.addEventListener('mousedown', this.mousedownCallback);
        }
    }

    toggleDropdown(field) {
        this.setState({ activeDropDown: field });
    }

    setAddWrapperRef(node) {
        this.addWrapperRef = node;
    }
    
    setUserWrapperRef(node) {
        this.userWrapperRef = node;
    }

    handleClickOutside(e, field) {
        if (this.state.activeDropDown && this.addWrapperRef) {
            if (!this.userWrapperRef.contains(e.target) && !this.addWrapperRef.contains(e.target)) {
                this.collapse(field);
            }
        } else if (this.state.activeDropDown && !this.userWrapperRef.contains(e.target)) {
            this.collapse(field);
        }
    }
    
    collapse() {
        this.setState({ activeDropDown: null });
    }

    onClick(field) {
        if (this.state.activeDropDown === field) {
            this.collapse();
        } else {
            this.toggleDropdown(field);
        }
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
                <a className="signup" onClick={() => openModal({ signup })}>
                    sign up
                </a>
                <a className="login" onClick={() => openModal({ login })}>
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
            <ul className="user-menu-ul" id={this.state.activeDropDown === 'userMenuBtn' ? "show" : null}>
                <li className="user-menu-userpage-item">
                    <Link className="userpage-link" to={`/artists/${currentUser.id}`} onClick={this.collapse}>
                        <div className="band-name">{currentUser.username}</div>
                        <div className="view-site">view site</div>
                    </Link>
                </li>
                <li className="user-menu-item" onClick={this.collapse}>
                    {logoutLink(currentUser, logout)}
                </li>
            </ul>
        );

        const addMenuDropdown = () => (
            <ul className="add-menu-ul" id={this.state.activeDropDown === 'addMenuBtn' ? "show" : null}>
                <Link to={`/artists/${currentUser.id}/new_album`} onClick={this.collapse}>
                    <li className="add-menu-li">album</li>
                </Link>
                <Link to={`/artists/${currentUser.id}/new_track`} onClick={this.collapse}>
                    <li className="add-menu-li">track</li>
                </Link>
            </ul>
        );

        if (!currentUser && pathname == '/') {
            // search is in right nav above sign up and login
            return (
                <div className={mainNavStatus}>
                    <div className="left-nav-logged-out">
                        <div className="logo-wrapper">
                            <div className="logo-placeholder">
                                <Link className="logo-link" to="/">bandspace</Link>
                            </div>
                        </div>
                        {currentUser ? null : welcomeMessage()}
                    </div>
                    <div className="right-nav-logged-out">
                        {/* change it to input with placeholder text of "Search and discover music" */}
                        <SearchContainer />
                        {currentUser ? logoutLink(currentUser, logout) : sessionLinks()}
                    </div>
                </div>
            )
        } else if (currentUser && pathname.includes(`artists/${currentUser.id}`) ) {
            // if your page, search bar can be accessed by clicking search icon in right nav
            return (
                <div className={mainNavStatus}>
                    <div className="left-nav-logged-in">
                        <div className="logo-wrapper-not-splash">
                            <div className="logo-placeholder-not-splash">
                                <Link className="logo-link-not-splash" to="/">bandspace</Link>
                            </div>
                        </div>
                        <div className="add-menu-dropdown" ref={this.setAddWrapperRef}>
                            <a className="add-menu-btn" onClick={() => this.onClick('addMenuBtn')}>+ add</a>
                            {addMenuDropdown()}
                        </div>
                    </div>
                    <div className="right-nav-logged-in">
                        <div className="nav-bar-icons">
                            <div className="user-menu-dropdown" ref={this.setUserWrapperRef}>
                                <a className="user-menu-btn"
                                    onClick={() => this.onClick('userMenuBtn')}>
                                    <div className="user-pic"></div>
                                </a>
                                {userMenuDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (currentUser) {
            // if logged in but not on your own page, search is in left navbar
            return (
                <div className={mainNavStatus}>
                    <div className="left-nav-logged-in">
                        <div className="logo-wrapper-not-splash">
                            <div className="logo-placeholder-not-splash">
                                <Link className="logo-link-not-splash" to="/">bandspace</Link>
                            </div>
                        </div>
                        <SearchContainer />
                    </div>
                    <div className="right-nav-logged-in">
                        <div className="nav-bar-icons">
                            <div className="user-menu-dropdown" ref={this.setUserWrapperRef}>
                                <a className="user-menu-btn" onClick={() => this.onClick('userMenuBtn')}>
                                    <div className="user-pic"></div>
                                </a>
                                {userMenuDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else { //search is same as if you were logged in
            return (
                <div className="main-nav-logged-out-not-splash">
                    <div className="left-nav-logged-out-not-splash">
                        <div className="logo-wrapper-not-splash">
                            <div className="logo-placeholder-not-splash">
                                <Link className="logo-link-not-splash" to="/">bandspace</Link>
                            </div>
                        </div>
                        <SearchContainer />
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
