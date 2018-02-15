'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _require = require('../../config/config.test.json'),
    user = _require.user;

var STUBBED_GOOGLE_VERIFYID = exports.STUBBED_GOOGLE_VERIFYID = {
    azp: '912764822636-c8rltib0pd36381a2jesoocj7p2nos78.apps.googleusercontent.com',
    aud: '912764822636-c8rltib0pd36381a2jesoocj7p2nos78.apps.googleusercontent.com',
    sub: '107976924993617014378',
    email: user.email,
    email_verified: true,
    at_hash: '5EnjKccQdXCiJiJpD9nlKg',
    exp: 1516782485,
    iss: 'accounts.google.com',
    jti: 'cc6baf5781973bd9b44dc41663e3c7b24be8329a',
    iat: 1516778885,
    name: 'Test',
    picture: 'https://lh6.googleusercontent.com/-31aFbdT1DIk/AAAAAAAAAAI/AAAAAAAAAs0/3ydlmmVDqL8/s96-c/photo.jpg',
    given_name: 'Test',
    family_name: 'development',
    locale: 'en'
};

var STUBBED_FACEBOOK_VERIFYID = exports.STUBBED_FACEBOOK_VERIFYID = {
    email: user.email
};

var TOKEN_RESPONSE_STRUCTURE = exports.TOKEN_RESPONSE_STRUCTURE = ['id', 'accessToken', 'refreshToken', 'userId', 'userAgent', 'updatedAt', 'createdAt', 'User'];