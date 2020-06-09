import { connect } from 'react-redux';
import React from 'react';

import ArtistIndex from './artist_index';
import { fetchAllUsers } from '../../actions/users_actions';

const mapStateToProps = state => ({
    allArtists: Object.values(state.entities.users)
});

const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    //might want a clearUsers here
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistIndex);