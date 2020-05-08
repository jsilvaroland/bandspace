import React from 'react';
import { Link } from 'react-router-dom';

// this class isn't a container, delete it later this is just a placeholder


class Splash extends React.Component {
    render() {
        return (
            <div>
                <Link to="/artist_index">
                    <img className="splash-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/eagle-nebula.png" />
                </Link>
            </div>
        )
    }
}

export default Splash;