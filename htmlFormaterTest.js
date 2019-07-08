'use strict';

var formatFeedsWithHtmlTags = require('./htmlFormatter.js');
//Module1 output
const feedString =
  'Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile';

//Module2 output
const typeOccurrence = [
  {
    type: 'Entity',
    startsAt: 14,
    endsAt: 22
  },
  {
    type: 'Entity',
    startsAt: 0,
    endsAt: 5
  },
  {
    type: 'TwitterUserName',
    startsAt: 55,
    endsAt: 67
  },
  {
    type: 'Link',
    startsAt: 37,
    endsAt: 54
  }
];

console.log(formatFeedsWithHtmlTags(typeOccurrence, feedString));
