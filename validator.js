'use strict';
var formatMethods = require('./format.js');

function validateTypeOccurrence(typeOccurrences, feedString) {
  let prevOccurrence;
  for (let occurrence of typeOccurrences) {
    //Check if occurrence has startAt and EndsAt
    if (
      occurrence.startsAt === undefined ||
      !occurrence.endsAt ||
      !occurrence.type
    ) {
      throw new Error(
        `startsAt, endsAt and type are required for all the occurrences`
      );
    }
    //Check for startsAt min and endsAt max value
    if (occurrence.startsAt < 0 || occurrence.endsAt > feedString.length) {
      throw new Error(
        `startsAt should be equal or more than 0 and endsAt should smaller than string length`
      );
    }

    if (occurrence.startsAt > occurrence.endsAt) {
      throw new Error(
        `endsAt shouldn't be smaller than startsAt, from position ${
          occurrence.startsAt
        } through ${occurrence.endsAt}`
      );
    }

    //Check for overlapping occurrences
    if (prevOccurrence && prevOccurrence.endsAt > occurrence.startsAt) {
      throw new Error(
        `Overlapping type occurrences for occurrence, from position ${
          occurrence.startsAt
        } through ${occurrence.endsAt}`
      );
    }

    //Check for supported types
    if (!formatMethods[occurrence.type]) {
      throw new Error(`Unsupported type: ${occurrence.type}`);
    }

    //check if occurrence starts and ends position doesn't contain half the word
    if (
      (occurrence.startsAt !== 0 &&
        feedString.charAt(occurrence.startsAt - 1) !== ' ') ||
      (occurrence.endsAt !== feedString.length &&
        feedString.charAt(occurrence.endsAt) !== ' ')
    ) {
      throw new Error(`Occurrence contains half of the words`);
    }
    prevOccurrence = occurrence;
  }
  return true;
}
module.exports.validate = validateTypeOccurrence;
