import SC from 'soundcloud';
import { setTrack as doSetTracks } from '../actions';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user,
  };
}

function doAuth() {
  return function (dispatch: Function) {
    SC.connect().then((session) => {
      dispatch(doFetchMe(session));
      dispatch(doFetchStream(session));
    });
  };
}

function doFetchMe() {
  return function (dispatch: Function) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then(response => response.json())
        .then((data) => {
          dispatch(doSetMe(data));
        });
  };
}

function doFetchStream(session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(doSetTracks(data.collection));
      });
  };
}

const initialState = {};

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
  }
  return state;
}

const actionCreators = {
  doAuth,
};

const actionTypes = {
  ME_SET,
};

export default {
  actionCreators,
  actionTypes,
  reducer,
};
