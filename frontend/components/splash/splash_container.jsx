import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    render() {
        return (
          <div className="splash">
            <img
              className="splash-img"
              src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/splashimg.jpg"
            />
            <div className="splash-message">
              <div>
                Welcome to Bandspace
              </div>
              <div>
                Find the chillest beats and the hottest tracks by visiting our artist index
              </div>
              <Link className="artist-index-button" to="artist_index">artist index</Link>
            </div>
          </div>
        );
    }
}

export default Splash;