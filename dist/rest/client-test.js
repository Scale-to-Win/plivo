'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhloClient = exports.Client = undefined;

var _requestTest = require('./request-test.js');

var _call = require('../resources/call.js');

var _package = require('../../package.json');

var _phlo = require('../resources/phlo');

var _accounts = require('../resources/accounts.js');

var _applications = require('../resources/applications.js');

var _conferences = require('../resources/conferences.js');

var _endpoints = require('../resources/endpoints.js');

var _messages = require('../resources/messages.js');

var _lookup = require('../resources/lookup.js');

var _powerpacks = require('../resources/powerpacks.js');

var _brand = require('../resources/brand.js');

var _campaign = require('../resources/campaign.js');

var _numbers = require('../resources/numbers.js');

var _pricings = require('../resources/pricings.js');

var _recordings = require('../resources/recordings.js');

var _utils = require('./utils');

var _media = require('../resources/media.js');

var _multiPartyCall = require('../resources/multiPartyCall');

var _endUsers = require('../resources/endUsers');

var _complianceDocumentTypes = require('../resources/complianceDocumentTypes');

var _complianceDocuments = require('../resources/complianceDocuments');

var _complianceRequirements = require('../resources/complianceRequirements');

var _complianceApplications = require('../resources/complianceApplications');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function Client(authId, authToken, proxy) {
  _classCallCheck(this, Client);

  if (!(this instanceof Client)) {
    return new Client(authId, authToken, proxy);
  }
  authId = authId || process.env.PLIVO_AUTH_ID;
  authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

  if (typeof authId === 'undefined') {
    throw 'Please provide authId';
  }
  if (typeof authToken === 'undefined') {
    throw 'Please provide authToken';
  }

  var options = {
    authId: authId,
    authToken: authToken,
    version: 'v1',
    url: 'https://api.plivo.com/v1/Account/' + authId,
    userAgent: 'NodePlivo'
  };
  if (typeof proxy !== 'undefined') {
    options.proxy = proxy;
  }

  var client = (0, _utils.camelCaseRequestWrapper)((0, _requestTest.Request)(options));

  this.calls = new _call.CallInterface(client);
  this.accounts = new _accounts.AccountInterface(client);
  this.subAccounts = new _accounts.SubaccountInterface(client);
  this.applications = new _applications.ApplicationInterface(client);
  this.conferences = new _conferences.ConferenceInterface(client);
  this.endpoints = new _endpoints.EndpointInterface(client);
  this.messages = new _messages.MessageInterface(client);
  this.brand = new _brand.BrandInterface(client);
  this.campaign = new _campaign.CampaignInterface(client);
  this.lookup = new _lookup.LookupInterface(client);
  this.powerpacks = new _powerpacks.PowerpackInterface(client);
  this.numbers = new _numbers.NumberInterface(client);
  this.pricings = new _pricings.PricingInterface(client);
  this.recordings = new _recordings.RecordingInterface(client);
  this.media = new _media.MediaInterface(client);
  this.endUsers = new _endUsers.EndUserInterface(client);
  this.complianceDocumentTypes = new _complianceDocumentTypes.ComplianceDocumentTypeInterface(client);
  this.complianceDocuments = new _complianceDocuments.ComplianceDocumentInterface(client);
  this.complianceRequirements = new _complianceRequirements.ComplianceRequirementInterface(client);
  this.complianceApplications = new _complianceApplications.ComplianceApplicationInterface(client);
  this.multiPartyCalls = new _multiPartyCall.MultiPartyCallInterface(client);
};

/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */


var PhloClient = exports.PhloClient = function PhloClient(authId, authToken, options) {
  _classCallCheck(this, PhloClient);

  if (!(this instanceof PhloClient)) {
    return new PhloClient(authId, authToken, options);
  }
  authId = authId || process.env.PLIVO_AUTH_ID;
  authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

  if (authId == null) {
    throw new Error('Please provide authId');
  }
  if (authToken == null) {
    throw new Error('Please provide authToken');
  }

  options = Object.assign({}, {
    authId: authId,
    authToken: authToken,
    version: 'v1',
    url: 'https://phlorunner.plivo.com/v1',
    userAgent: 'plivo-node' + '/' + (_package.version || 'Unknown Version') + ' (Node: ' + process.version + ')'
  }, options);

  var client = (0, _utils.camelCaseRequestWrapper)((0, _requestTest.Request)(options));

  this.phlo = function (phloId) {
    var dd = new _phlo.Phlo(client, {
      phloId: phloId,
      authId: authId
    });
    return dd;
  };

  this.phlo.get = function (phloId) {
    return new Promise(function (resolve, reject) {
      var dd = new _phlo.PhloInterface(client);
      dd.get(phloId).then(function (data) {
        data.authId = authId;
        resolve(data);
      }).catch(function (err) {
        reject(err);
      });
    });
  };
};