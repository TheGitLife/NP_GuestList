import {createAction, handleActions} from 'redux-actions';
import update from 'react-addons-update';
import {pender} from 'redux-pender';
import axios from 'axios';

const event_url = 'https://1857wncf9c.execute-api.us-west-2.amazonaws.com/alpha/nonprofits/cry_seattle_id/events/';

function fetchData() {
  return axios.get(event_url);
}

function saveData(event_id, title, dateTime, location, titlePic){
  console.log("Ready to post" + dateTime);
  axios.post(event_url,{
    properties: {
      event_name: title,
      event_id: event_id,
      event_location: location,
      event_date: dateTime,
      event_background: titlePic
    }
  }).then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
}

// action type
const FETCH_EVENT = 'event/FETCH_EVENT';
const ADD_EVENT = 'event/ADD_EVENT';

// action creators
export const addEvent = createAction(ADD_EVENT); //
export const fetchEvent = createAction(FETCH_EVENT, fetchData); //

// initial states
const initialState = {
  events: [
  ],
  guests:[
    {
      "last name":"Narutis",
      "first name":"Lukas",
      "note":"our engineer from Barcelona",
      "status":"0"
    },
    {
      "last name":"Normantas",
      "first name":"Anya",
      "note":"Google Play support",
      "status":"1"
    },
    {  
      "last name":"Norris",
      "first name":"Dean",
      "note":"played by Hank Schrader",
      "status":"0"
    }
  ]
};

// reducers
export default handleActions({
  ...pender({
    type: FETCH_EVENT,
    onSuccess: (state, action) => {
      const {Items} = action.payload.data.body;
      return update(state, {
        events: {$set: Items}
      });
    }
  }),
  [ADD_EVENT]: (state, action) => {
    const {title, dateTime, location} = action.payload;
    event_id= Date.now().toString();
    image = 'http://thewallpaper.co/wp-content/uploads/2016/02/dog-small-pets-baby-animals-widescreen-high-resolution-wallpaper-new-top-desktop-background-download-free-puffy-dogs-curr-hd-1600x1200-736x459.jpg';

    saveData(event_id, title, dateTime, location, image);

    return update(state, {
      events: {
        $push: [{
          'event_id': event_id,
          'event_name': title,
          'event_date': dateTime,
          'event_location': location,
          'event_background': image
        }]
      }
    });
  }
}, initialState);
