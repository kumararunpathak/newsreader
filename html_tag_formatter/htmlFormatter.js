'use strict';
var formatMethods = require('./format.js');
var validator = require('./validator.js');

//Javascript array Sort method with custom swap method to sort type occurrences based on startsAt
let sortTypeOccurrences = typeOccurrences => {
  typeOccurrences.sort((first, second) =>
    first.startsAt > second.startsAt
      ? 1
      : second.startsAt > first.startsAt
      ? -1
      : 0
  );
  return typeOccurrences;
};

let formatFeedsWithHtmlTags = (typeOccurrence, feedsString) => {
  try {
    //Check for null string
    if (!feedsString) throw new Error('Empty feeds');

    //Check for empty type occurrences
    if (!typeOccurrence || typeOccurrence.length === 0) {
      return feedsString;
    }

    //Sort type occurrences on start position
    typeOccurrence = sortTypeOccurrences(typeOccurrence);

    if (validator.validate(typeOccurrence, feedsString)) {
      let stringPosition = 0;
      let formatedHtmlString = '';
      for (let occurrence of typeOccurrence) {
        if (occurrence.startsAt > stringPosition) {
          formatedHtmlString += feedsString.substring(
            stringPosition,
            occurrence.startsAt
          );
          stringPosition = occurrence.startsAt;
        }
        let typeString = feedsString.substring(
          stringPosition,
          occurrence.endsAt
        );
        stringPosition = occurrence.endsAt;
        let formatterMethod = formatMethods[occurrence.type];
        formatedHtmlString += formatterMethod(typeString);
      }
      if (stringPosition < feedsString.length) {
        formatedHtmlString += feedsString.substring(
          stringPosition,
          feedsString.length - 1
        );
      }
      return formatedHtmlString;
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = formatFeedsWithHtmlTags;
