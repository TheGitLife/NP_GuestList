import { createAction, handleActions } from 'redux-actions';
import update from 'react-addons-update';
import { pender } from 'redux-pender';
import axios from 'axios';

const event_url = 'https://1857wncf9c.execute-api.us-west-2.amazonaws.com/alpha/nonprofits/';

function fetchEventsFromApi(npid) {
  trigger_url = event_url + npid + "/events/";
  return axios.get(trigger_url);
}

function saveEventToApi(payload) {
  trigger_url = event_url + payload.npid + "/events/";

  event_id = Date.now().toString();
  image = 'http://thewallpaper.co/wp-content/uploads/2016/02/dog-small-pets-baby-animals-widescreen-high-resolution-wallpaper-new-top-desktop-background-download-free-puffy-dogs-curr-hd-1600x1200-736x459.jpg';

  return axios.post(trigger_url, {
    properties: {
      event_name: payload.title,
      event_id: event_id,
      event_location: payload.location,
      event_date: payload.dateTime,
      event_background: image
    }
  });
}


// action type
const FETCH_EVENT = 'event/FETCH_EVENT';
const ADD_EVENT = 'event/ADD_EVENT';

// action creators
export const addEvent = createAction(ADD_EVENT, saveEventToApi); //npid, title, location, time
export const fetchEvent = createAction(FETCH_EVENT, fetchEventsFromApi); //npid

// initial states
const initialState = {
  events: [
  ],
  guests: [
    {
      "last name": "Narutis",
      "first name": "Lukas",
      "note": "our engineer from Barcelona",
      "status": "0"
    },
    {
      "last name": "Normantas",
      "first name": "Anya",
      "note": "Google Play support",
      "status": "1"
    },
    {
      "last name": "Norris",
      "first name": "Dean",
      "note": "played by Hank Schrader",
      "status": "0"
    }
  ]
};

// reducers
export default handleActions({
  ...pender({
    type: FETCH_EVENT,
    onSuccess: (state, action) => {
      const { Items } = action.payload.data.body;
      return update(state, {
        events: { $set: Items }
      });
    }
  }),
  ...pender({
    type: ADD_EVENT,
    onSuccess: (state, action) => {
      return state; //this is causing a refresh issue.
    }
  })
}, initialState);
