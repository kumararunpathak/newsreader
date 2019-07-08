var http = require('http');

var formatFeedsWithHtmlTags = require('./htmlFormatter.js');

//Module1 output
const typeString =
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

http
  .createServer(function(req, res) {
    try {
      const stringWithHtmlTags = formatFeedsWithHtmlTags(
        typeOccurrence,
        typeString
      );
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(stringWithHtmlTags);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(err.message);
    }
  })
  .listen(8080);
