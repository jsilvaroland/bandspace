import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    render() {
        return (
            <div className="splash">
                <div className="carousel">
                    <div className="carousel-contents">
                        <Link className="carousel-main-item" to="/artist_index">
                            <img className="splash-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/eagle-nebula.png" />
                            <div className="carousel-info">Artist Index</div>
                        </Link>
                        <div className="carousel-side">
                            <Link className="carousel-side-item" to="/artist_index">
                                <img className="carousel-img-side" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory1.jpeg" />
                                <div className="carousel-side-info">
                                    <div className="carousel-side-title">The Wall-Shaking Delights of Stockholm's Experimental Drone Scene</div>
                                    <span>LIST</span>
                                </div>
                            </Link>
                            <Link className="carousel-side-item" to="/artist_index">
                                <img className="carousel-img-side" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory2.jpeg" />
                                <div className="carousel-side-info-2">
                                    <div className="carousel-side-title">Goldman Thibodeaux &amp; the Lawtell Playboys Are Among the Last Practitioners of “La La” Music</div>
                                    <span>FEATURE</span>
                                </div>
                            </Link>
                            <Link className="carousel-side-item" to="/artist_index">
                                <img className="carousel-img-side" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory3.jpeg" />
                                <div className="carousel-side-info-3">
                                    <div className="carousel-side-title">Eight Essential DJ Vadim Releases on Bandspace</div>
                                    <span>FEATURE</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="bandspace-daily">
                    <Link className=" bandspace-daily-title" to="/artist_index">
                        BANDSPACE DAILY
                    </Link>
                    <div className="bandspace-daily-contents">
                        <div className="row1">
                            <div className="aotd">
                                <Link to="/artist_index">
                                    <img className="colins" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/shirley-colins.jpg" />
                                    <div className="aotd-info">
                                        <div className="aotd-title">Heart's Ease</div>
                                        <div className="aotd-artist">by Shirley Collins</div>
                                        <p>A welcome thread of hope in the darkness from the legendary British folk artist.</p>
                                        <span>ALBUM OF THE DAY</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory1.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">The Wall-Shaking Delights of Stockholm's Experimental Drone Scene</div>
                                        <div className="story-artist">Samuel Tornow</div>
                                        <span>LIST</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory2.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">Goldman Thibodeaux &amp; the Lawtell Playboys Are Among the Last Practitioners of “La La” Music</div>
                                        <div className="story-artist">Allison Hussey</div>
                                        <span>FEATURE</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row2">
                            <div className="bandspace-story-left">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory3.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">Eight Essential DJ Vadim Releases on Bandspace</div>
                                        <div className="story-artist">John Morrison</div>
                                        <span>FEATURE</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory4.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">Following the Evolution of FROMTHEHEART, From Discord Server to AutoTuned Collective</div>
                                        <div className="story-artist">Joshua Minsoo Kim</div>
                                        <span>FEATURE</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory5.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">Carlos Niño &amp; Friends Make Healing Music for a Troubled World</div>
                                        <div className="story-artist">Andy Thomas</div>
                                        <span>LIST</span>
                                    </div>
                                </Link>
                            </div>
                            
                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory6.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">New Lives: Experimental, Folk, and Jazz Artists Revitalize the Live Album</div>
                                        <div className="story-artist">Jesse Jarnow</div>
                                        <span>LIST</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="bandspace-story">
                                <Link to="/artist_index">
                                    <img className="story-img" src="https://bandspace-seeds.s3-us-west-1.amazonaws.com/bandspacestory7.jpeg" />
                                    <div className="story-info">
                                        <div className="story-title">Indie Folk Singer-Songwriter Thanya Iyer Makes Room for Self-Care on “KIND”</div>
                                        <div className="story-artist">Bineet Kaur</div>
                                        <span>FEATURE</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;