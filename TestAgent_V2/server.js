'use strict';

const {dialogflow} = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');


    const assistant = dialogflow();//{debug: true});
    console.info(`got assistant object...`);
    const WELCOME_INTENT = 'input.welcome';
    const GET_TEMP_INTENT = 'get.temperature';

    assistant.fallback((conv) => {
        // intent contains the name of the intent
        // you defined in the Intents area of Dialogflow
        console.info(`intent fired --> ${conv.intent}`);
        const action = conv.action;
        switch (action) {
            case WELCOME_INTENT:
                conv.ask('Welcome to Tyagi ka Test Agent!');
                break;

            case GET_TEMP_INTENT:
                conv.close('Tata from Tyagi ka Test Agent!');
                break;
        }
    });


express().use(bodyParser.json(), assistant).listen(8080, function () {
    console.info(`Test agent webhook listening on port 8080!`)
});