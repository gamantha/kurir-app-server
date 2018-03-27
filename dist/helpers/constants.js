"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var buildEmailValidationUri = exports.buildEmailValidationUri = function buildEmailValidationUri(email) {
  return "https://api.mailgun.net/v3/address/validate?address=" + email + "&api_key=" + process.env.mailgunPublicValidationKey;
};