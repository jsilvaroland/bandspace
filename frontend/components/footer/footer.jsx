import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component { 
    render() {
        const { currentUser, logout, openModal } = this.props;
        const sessionLink = currentUser ? 
            <a className="footer-logout" onClick={logout}>log out</a> :
            <a className="footer-login" onClick={() => openModal({ login })}>log in</a>

        return (
            <div className="footer">
                <div className="footer-inner">
                    <div className="footer-left">
                        <Link to="/">bandspace</Link> by Joshua Silva-Roland
                    </div>
                    <div className="footer-right">
                        {sessionLink}
                        <a href="https://joshuasilvaroland.com" target="_blank">portfolio</a>
                        <a className="github" href="https://github.com/jsilvaroland/bandspace" target="_blank">github</a>
                        <a className="linkedin" href="https://www.linkedin.com/in/joshua-silva-roland/" >linkedin</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;