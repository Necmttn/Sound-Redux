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
