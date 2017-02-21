'use strict';
const Alexa = require('alexa-sdk');
const getConjugations = require('./getConjugations');
// const logger = require('./log');

const handlers = {
  LaunchRequest: function () {
    this.emit(':tell', 'willkommen beim konjugationshasen');
  },
  Konjugiere: function () {
    var itemSlot = this.event.request.intent.slots.VERB;
    var VERB;
    if (itemSlot && itemSlot.value) {
      VERB = itemSlot.value.toLowerCase();
    }

    getConjugations(VERB).then((result) => {

      var finalResult = '';
      Object.keys(result).forEach((section) => {
        finalResult += "\n" + section + "\n";
        result[section].forEach((item) => {
          finalResult += `• ${item}` + "\n";
        });
      });
      this.emit(
        ':tellWithCard',
        `Konjugationen für ${VERB}:`,
        `Konjugationen für ${VERB}:`,
        finalResult
      );
    });
  }
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  // alexa.appId = 'DONTKNOWFORSURE...';
  alexa.registerHandlers(handlers);
  alexa.execute();
};
