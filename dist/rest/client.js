"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhloClient = exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("./axios.js");

var _utils = require("./utils");

var _package = require("../../package.json");

var _phlo = require("../resources/phlo");

var _call = require("../resources/call");

var _accounts = require("../resources/accounts");

var _applications = require("../resources/applications");

var _conferences = require("../resources/conferences");

var _endpoints = require("../resources/endpoints");

var _messages = require("../resources/messages");

var _lookup = require("../resources/lookup");

var _powerpacks = require("../resources/powerpacks");

var _brand = require("../resources/brand.js");

var _campaign = require("../resources/campaign.js");

var _numbers = require("../resources/numbers");

var _pricings = require("../resources/pricings");

var _recordings = require("../resources/recordings");

var _plivoxml = require("../utils/plivoxml");

var _jwt = require("../utils/jwt");

var _security = require("../utils/security");

var _v3Security = require("../utils/v3Security");

var _jsonStrinfigier = require("./../utils/jsonStrinfigier");

var _callFeedback = require("../resources/callFeedback");

var _media = require("../resources/media.js");

var _endUsers = require("../resources/endUsers");

var _complianceDocumentTypes = require("../resources/complianceDocumentTypes");

var _complianceDocuments = require("../resources/complianceDocuments");

var _complianceRequirements = require("../resources/complianceRequirements");

var _complianceApplications = require("../resources/complianceApplications");

var _multiPartyCall = require("../resources/multiPartyCall");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.Response = function () {
  return new _plivoxml.Response();
};

exports.AccessToken = function (authId, authToken, username, validity, uid) {
  return new _jwt.AccessToken(authId, authToken, username, validity, uid);
};

exports.validateV3Signature = function (method, uri, nonce, auth_token, v3_signature) {
  var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  return (0, _v3Security.validateV3Signature)(method, uri, nonce, auth_token, v3_signature, params);
};

exports.validateSignature = function (uri, nonce, signature, auth_token) {
  return (0, _security.validateSignature)(uri, nonce, signature, auth_token);
};

/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */

var Client = exports.Client = function () {
  function Client(authId, authToken, options) {
    _classCallCheck(this, Client);

    if (!(this instanceof Client)) {
      return new Client(authId, authToken, options);
    }
    authId = authId || process.env.PLIVO_AUTH_ID;
    authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

    if (authId == null) {
      throw new Error("Please provide authId");
    }
    if (authToken == null) {
      throw new Error("Please provide authToken");
    }

    options = Object.assign({}, {
      authId: authId,
      authToken: authToken,
      version: "v1",
      url: "https://api.plivo.com/v1/Account/" + authId,
      userAgent: "plivo-node" + "/" + (_package.version || "Unknown Version") + " (Node: " + process.version + ")"
    }, options);
    var client = (0, _utils.camelCaseRequestWrapper)((0, _axios.Axios)(options));

    this.calls = new _call.CallInterface(client);
    this.accounts = new _accounts.AccountInterface(client);
    this.subaccounts = this.subAccounts = new _accounts.SubaccountInterface(client);
    this.applications = new _applications.ApplicationInterface(client);
    this.conferences = new _conferences.ConferenceInterface(client);
    this.endpoints = new _endpoints.EndpointInterface(client);
    this.messages = new _messages.MessageInterface(client);
    this.lookup = new _lookup.LookupInterface(client);
    this.powerpacks = new _powerpacks.PowerpackInterface(client);
    this.brand = new _brand.BrandInterface(client);
    this.campaign = new _campaign.CampaignInterface(client);
    this.numbers = new _numbers.NumberInterface(client);
    this.pricings = new _pricings.PricingInterface(client);
    this.recordings = new _recordings.RecordingInterface(client);
    this.callFeedback = new _callFeedback.CallFeedbackInterface(client);
    this.media = new _media.MediaInterface(client);
    this.endUsers = new _endUsers.EndUserInterface(client);
    this.complianceDocumentTypes = new _complianceDocumentTypes.ComplianceDocumentTypeInterface(client);
    this.complianceDocuments = new _complianceDocuments.ComplianceDocumentInterface(client);
    this.complianceRequirements = new _complianceRequirements.ComplianceRequirementInterface(client);
    this.complianceApplications = new _complianceApplications.ComplianceApplicationInterface(client);
    this.multiPartyCalls = new _multiPartyCall.MultiPartyCallInterface(client);
  }

  _createClass(Client, [{
    key: "toJSON",
    value: function toJSON() {
      // return "hello..";
      return _jsonStrinfigier.stringify.apply(arguments);
    }
  }]);

  return Client;
}();

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
    throw new Error("Please provide authId");
  }
  if (authToken == null) {
    throw new Error("Please provide authToken");
  }

  options = Object.assign({}, {
    authId: authId,
    authToken: authToken,
    version: "v1",
    url: "https://phlorunner.plivo.com/v1",
    userAgent: "plivo-node" + "/" + (_package.version || "Unknown Version") + " (Node: " + process.version + ")"
  }, options);

  var client = (0, _utils.camelCaseRequestWrapper)((0, _axios.Axios)(options));

  this.phlo = function (phloId) {
    var dd = new _phlo.Phlo(client, { phloId: phloId, authId: authId });
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