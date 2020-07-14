import { START_LOADING, STOP_LOADING } from "../actions/loading_actions";

const loadingReducer = (state = null, action) => {
    switch (action.type) {
        case START_LOADING:
            return action.loading;
        case STOP_LOADING:
            return null;
        default:
            return state;
    }
};

export default loadingReducer;
