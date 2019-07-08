'use strict';

var config = require('./config.js');

function entity(str) {
  return str ? `<strong>${str}</strong>` : '';
}

function link(str) {
  return str ? `<a href="${str}">${str}</a>` : '';
}

function twitterUserName(str) {
  str = str.startsWith('@') ? str.substring(1, str.length) : str;
  return `@<a href="${config.twitterBaseUrl}/${str}">${str}</a>`;
}

module.exports = {
  Entity: entity,
  Link: link,
  TwitterUserName: twitterUserName
};
