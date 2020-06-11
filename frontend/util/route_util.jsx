import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Protected = ({ component: Component, path, currentUserId, computedMatch, exact }) => {
    const albumArtistId = parseInt(computedMatch.params.userId);
    // still have the issue of when artist id is manually changed in URL but albumId is left the same. say you're logged in as user 73 and you want to edit user 74's album
    // can just change url to say users/73/albums/${user 74's album id here}/

    return (
        <Route path={path} exact={exact} render={(props) => (
            (currentUserId === albumArtistId) ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );
};

const mapStateToProps = state => (
    { currentUserId: state.session.id }
);

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));