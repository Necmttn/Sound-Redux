//  @flow

type setTracksAction = {
  type: string;
  tracks: Array<Track>
};

type playTrackAction = {
  type: string;
  track: Track
};

import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks: Array<Track>): setTracksAction {
  return {
    type: actionTypes.TRACKS_SET,
    tracks,
  };
}

export function playTrack(track: Track): playTrackAction {
  return {
    type: actionTypes.TRACK_PLAY,
    track,
  };
}
