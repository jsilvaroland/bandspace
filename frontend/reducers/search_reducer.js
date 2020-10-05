import { RECEIVE_SEARCHED, CLEAR_SEARCH } from "../actions/search_actions";

const searchReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
      case RECEIVE_SEARCHED:
        return Object.assign({}, oldState, action.payload);
      case CLEAR_SEARCH:
        return {};
      default:
        return oldState;
    }
};

export default searchReducer;