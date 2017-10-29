'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DialogflowApp = require('actions-on-google').DialogflowApp;


// Create functions to handle requests here
const GET_INFO_INTENT = 'action_get_info_intent';  // the action name from the API.AI/Dialogflow intent
const GET_INFO_YES_INTENT = 'actions-on-google-yes';

function GDG_Assistant(req, res) {
    const assistant = new DialogflowApp({request: req, response: res});
    let intent = assistant.getIntent();
    switch (intent) {
        case GET_INFO_INTENT:
            get_info_intent(assistant);
            break;
        case GET_INFO_YES_INTENT:
            get_info_yes_intent(assistant);
            break;
    }
}

/**
 * handle parent info intent
 *
 * @param assistant
 */
function get_info_intent(assistant){
    let city = assistant.getArgument("city");
    if(city === "New Delhi" || city === "Delhi" || city === "Noida" || city === "Gurgaon" || city === "Gurugram" || city === "NCR"){
        assistant.ask(`There is a GDG Dev fest at ${city} happening on 29th October 2017. The fest is organised at 3 location for the first time. 
        I can tell you more about the Delhi track at Coding Ninjas. Do you want to hear about that? `);
    }else if(city === "Bangalore" || city === "Bangaluru"){
        assistant.tell(`The GDG Dev fest at ${city} happened on 7th October 2017. Please check out their meetup group for more details!`);
    }
}

/**
 * handle followup yes intent for parent intent
 * @param assistant
 */
function get_info_yes_intent(assistant){
    let track = assistant.getArgument("track");

    if(undefined === track || track === null || track === "null" || track === ""){
        assistant.ask("There are 2 tracks at this location. May I know for which track you want to know details?");
    }else {
        if (track === "one") {
            assistant.tell("Track 1 will be covering sessions on Google Assistant, Virtual Reality, PWA with Polymer, Kotlin, Ember JS and understanding Constraint Layouts. Thank You!")
        } else {
            assistant.tell("Track 1 will be covering sessions on Android Auto, Android Architecture, Cloud, Open Source, Rx Java with MVP and Dagger 2, UX for developers and Vision Api with Ruby. Thanks You!");
        }
    }
}


app.post('/', function (req, res) {
    GDG_Assistant(req, res);

});


app.listen(8080, function () {
    console.log('GDG Assistant webhook is listening on port 8080!')
});