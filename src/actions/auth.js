// @flow

import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';

type streamData = {
  collection: Array<Track>
};

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user,
  };
}

function fetchMe(session) {
  return function (dispatch: Function) {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setMe(data));
      });
  };
}


function fetchStream(session) {
  return function (dispatch: Function) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then(response => response.json())
      .then((data: StreamData) => {
        dispatch(setTracks(data.collection));
      });
  };
}

export function auth() {
  return function (dispatch: Function) {
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      dispatch(fetchStream(session));
    });
  };
}
