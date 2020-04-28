export const signup = user => (
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { user }
    })
);

export const login = user => (
    $.ajax({
        url: '/api/session',
        method: 'POST',
        data: { user }
    })
);

export const logout = () => (
    $.ajax({
        url: '/api/session',
        method: 'DELETE',       // add data later? since we do need to redirect to logged out user's show page
    })
);