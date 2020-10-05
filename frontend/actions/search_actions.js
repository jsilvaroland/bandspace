import * as SearchApiUtil from "../util/search_api_util";

export const RECEIVE_SEARCHED = "RECEIVE_SEARCHED";
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

const receiveSearch = (payload) => ({
  type: RECEIVE_SEARCHED,
  payload,
});

export const clearSearch = () => ({
    type: CLEAR_SEARCH,
});

export const fetchSearch = () => (dispatch) =>
  SearchApiUtil.fetchSearch().then((search) => dispatch(receiveSearch(search)));