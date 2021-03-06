'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPartyCallInterface = exports.MultiPartyCallMember = exports.MultiPartyCallParticipant = exports.MultiPartyCall = exports.MPCError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

var _utils = require('../rest/utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'MultiPartyCall/';
var idField = 'mpcUuid';
var secondaryAction = 'Participant/';
var secondaryMemberAction = 'Member/';
var secondaryIdField = 'participantUuid';

var MPCError = exports.MPCError = function (_Error) {
  _inherits(MPCError, _Error);

  function MPCError() {
    _classCallCheck(this, MPCError);

    return _possibleConstructorReturn(this, (MPCError.__proto__ || Object.getPrototypeOf(MPCError)).apply(this, arguments));
  }

  return MPCError;
}(Error);

var MultiPartyCall = exports.MultiPartyCall = function (_PlivoResource) {
  _inherits(MultiPartyCall, _PlivoResource);

  function MultiPartyCall(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiPartyCall);

    var _this2 = _possibleConstructorReturn(this, (MultiPartyCall.__proto__ || Object.getPrototypeOf(MultiPartyCall)).call(this, action, MultiPartyCall, idField, client));

    if (idField in data) {
      _this2.id = data[idField];
    }

    (0, _common.extend)(_this2, data);
    _this2[clientKey] = client;
    return _this2;
  }

  _createClass(MultiPartyCall, [{
    key: 'get',
    value: function get() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      params.isVoiceRequest = 'true';
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id, 'GET', params);
    }
  }, {
    key: 'addParticipant',
    value: function addParticipant(params) {
      if (params.from && params.to && params.callUuid) {
        throw new MPCError('cannot specify callUuid when (from, to) is provided');
      }
      if (!params.from && !params.to && !params.callUuid) {
        throw new MPCError('specify either callUuid or (from, to)');
      }
      if (!params.callUuid && (!params.from || !params.to)) {
        throw new MPCError('specify (from, to) when not adding an existing callUuid to multi party participant');
      }

      (0, _utils.validParam)('role', params.role.toLowerCase(), [String], true, ['agent', 'supervisor', 'customer']);

      if (params.from) {
        (0, _utils.validParam)('from', params.from, [String], false);
      }

      if (params.to) {
        (0, _utils.validParam)('to', params.to, [String], false);
        (0, _utils.validMultipleDestinationNos)('to', params.to, { role: params.role, delimiter: '<', agentLimit: 20 });
      }

      if (params.callUuid) {
        (0, _utils.validParam)('callUuid', params.callUuid, [String], false);
      }

      if (params.callerName) {
        (0, _utils.validParam)('callerName', params.callerName, [String], false);
        (0, _utils.validRange)('callerName', params.callerName.length, false, 1, 50);
      }

      if (params.callStatusCallbackUrl) {
        (0, _utils.validUrl)('callStatusCallbackUrl', params.callStatusCallbackUrl, false);
      }

      if (params.callStatusCallbackMethod) {
        (0, _utils.validParam)('callStatusCallbackMethod', params.callStatusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.callStatusCallbackMethod = 'POST';
      }

      if (params.sipHeaders) {
        (0, _utils.validParam)('sipHeaders', params.sipHeaders, [String], false);
      }

      if (params.confirmKey) {
        (0, _utils.validParam)('confirmKey', params.confirmKey, [String], false, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '*']);
      }

      if (params.confirmKeySoundUrl) {
        (0, _utils.validUrl)('confirmKeySoundUrl', params.confirmKeySoundUrl, false);
      }

      if (params.confirmKeySoundMethod) {
        (0, _utils.validParam)('confirmKeySoundMethod)', params.confirmKeySoundMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.confirmKeySoundMethod = 'GET';
      }

      if (params.dialMusic) {
        (0, _utils.isOneAmongStringUrl)('dialMusic', params.dialMusic, false, ['real', 'none']);
      } else {
        params.dialMusic = 'Real';
      }

      if (params.ringTimeout || params.ringTimeout === 0) {
        (0, _utils.validParam)('ringTimeout', params.ringTimeout, [String, Number], false);
        if (typeof params.ringTimeout === 'string') {
          (0, _utils.validMultipleDestinationIntegers)('ringTimeout', params.ringTimeout);
        } else if (!Number.isInteger(params.ringTimeout) && typeof params.ringTimeout !== 'string') {
          throw new _utils.InvalidRequestError("RingTimeout must be of type int or string");
        }
      } else {
        params.ringTimeout = 45;
      }
      if (params.delayDial) {
        (0, _utils.validParam)('delayDial', params.delayDial, [String, Number], false);
        if (typeof params.delayDial === 'string') {
          (0, _utils.validMultipleDestinationIntegers)('delayDial', params.delayDial);
        } else if (!Number.isInteger(params.delayDial) && typeof params.delayDial !== 'string') {
          throw new _utils.InvalidRequestError("Dealydial must be of type int or string");
        }
      } else {
        params.delayDial = 0;
      }

      if (params.maxDuration || params.maxDuration === 0) {
        (0, _utils.validRange)('maxDuration', params.maxDuration, false, 300, 28800);
      } else {
        params.maxDuration = 14400;
      }

      if (params.maxParticipants || params.maxParticipants === 0) {
        (0, _utils.validRange)('maxParticipants', params.maxParticipants, false, 2, 10);
      } else {
        params.maxParticipants = 10;
      }

      if (params.waitMusicUrl) {
        (0, _utils.validUrl)('waitMusicUrl', params.waitMusicUrl, false);
      }

      if (params.waitMusicMethod) {
        (0, _utils.validParam)('waitMusicMethod', params.waitMusicMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.waitMusicMethod = 'GET';
      }

      if (params.agentHoldMusicUrl) {
        (0, _utils.validUrl)('agentHoldMusicUrl', params.agentHoldMusicUrl, false);
      }

      if (params.agentHoldMusicMethod) {
        (0, _utils.validParam)('agentHoldMusicMethod', params.agentHoldMusicMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.agentHoldMusicMethod = 'GET';
      }

      if (params.customerHoldMusicUrl) {
        (0, _utils.validUrl)('customerHoldMusicUrl', params.customerHoldMusicUrl, false);
      }

      if (params.customerHoldMusicMethod) {
        (0, _utils.validParam)('customerHoldMusicMethod', params.customerHoldMusicMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.customerHoldMusicMethod = 'GET';
      }

      if (params.recordingCallbackUrl) {
        (0, _utils.validUrl)('recordingCallbackUrl', params.recordingCallbackUrl, false);
      }

      if (params.recordingCallbackMethod) {
        (0, _utils.validParam)('recordingCallbackMethod', params.recordingCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.recordingCallbackMethod = 'GET';
      }

      if (params.statusCallbackUrl) {
        (0, _utils.validUrl)('statusCallbackUrl', params.statusCallbackUrl, false);
      }

      if (params.statusCallbackMethod) {
        (0, _utils.validParam)('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.statusCallbackMethod = 'GET';
      }

      if (params.onExitActionUrl) {
        (0, _utils.validUrl)('onExitActionUrl', params.onExitActionUrl, false);
      }

      if (params.onExitActionMethod) {
        (0, _utils.validParam)('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.onExitActionMethod = 'POST';
      }

      if (params.record) {
        (0, _utils.validParam)('record', params.record, [Boolean, String], false);
      } else {
        params.record = 'false';
      }

      if (params.recordFileFormat) {
        (0, _utils.validParam)('recordFileFormat', params.recordFileFormat.toLowerCase(), [String], false, ['mp3', 'wav']);
      } else {
        params.recordFileFormat = 'mp3';
      }

      if (params.statusCallbackEvents) {
        (0, _utils.multiValidParam)('statusCallbackEvents', params.statusCallbackEvents.toLowerCase(), [String], false, ['mpc-state-changes', 'participant-state-changes', 'participant-speak-events', 'participant-digit-input-events', 'add-participant-api-events'], true, ',');
      } else {
        params.statusCallbackEvents = 'mpc-state-changes,participant-state-changes';
      }

      if (params.stayAlone) {
        (0, _utils.validParam)('stayAlone', params.stayAlone, [Boolean, String], false);
      } else {
        params.stayAlone = 'false';
      }

      if (params.coachMode) {
        (0, _utils.validParam)('coachMode', params.coachMode, [Boolean, String], false);
      } else {
        params.coachMode = 'true';
      }

      if (params.mute) {
        (0, _utils.validParam)('mute', params.mute, [Boolean, String], false);
      } else {
        params.mute = 'false';
      }

      if (params.hold) {
        (0, _utils.validParam)('hold', params.hold, [Boolean, String], false);
      } else {
        params.hold = 'false';
      }

      if (params.startMpcOnEnter != null) {
        (0, _utils.validParam)('startMpcOnEnter', params.startMpcOnEnter, [Boolean, String], false);
      } else {
        params.startMpcOnEnter = 'true';
      }

      if (params.endMpcOnExit) {
        (0, _utils.validParam)('endMpcOnExit', params.endMpcOnExit, [Boolean, String], false);
      } else {
        params.endMpcOnExit = 'false';
      }

      if (params.relayDTMFInputs) {
        (0, _utils.validParam)('relayDTMFInputs', params.relayDTMFInputs, [Boolean, String], false);
      } else {
        params.relayDTMFInputs = 'false';
      }

      if (params.enterSound) {
        (0, _utils.isOneAmongStringUrl)('enterSound', params.enterSound, false, ['beep:1', 'beep:2', 'none']);
      } else {
        params.enterSound = 'beep:1';
      }

      if (params.enterSoundMethod) {
        (0, _utils.validParam)('enterSoundMethod', params.enterSoundMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.enterSoundMethod = 'GET';
      }

      if (params.exitSound) {
        (0, _utils.isOneAmongStringUrl)('exitSound', params.exitSound, false, ['beep:1', 'beep:2', 'none']);
      } else {
        params.exitSound = 'beep:2';
      }

      if (params.exitSoundMethod) {
        (0, _utils.validParam)('exitSoundMethod', params.exitSoundMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.exitSoundMethod = 'GET';
      }

      if (params.startRecordingAudio) {
        (0, _utils.validUrl)('startRecordingAudio', params.startRecordingAudio, false);
      }

      if (params.startRecordingAudioMethod) {
        (0, _utils.validParam)('startRecordingAudioMethod', params.startRecordingAudioMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.startRecordingAudioMethod = 'GET';
      }

      if (params.stopRecordingAudio) {
        (0, _utils.validUrl)('stopRecordingAudio', params.stopRecordingAudio, false);
      }

      if (params.stopRecordingAudioMethod) {
        (0, _utils.validParam)('stopRecordingAudioMethod', params.stopRecordingAudioMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.stopRecordingAudioMethod = 'GET';
      }

      if (params.to && String(params.ringTimeout).split('<').length > params.to.split('<').length) {
        throw new MPCError("RingTimeout:number of ring_timeout(s) should be same as number of destination(s)");
      }
      if (params.to && String(params.delayDial).split('<').length > params.to.split('<').length) {
        throw new MPCError("DelayDial:number of delay_dial(s) should be same as number of destination(s)");
      }
      params.isVoiceRequest = 'true';
      params.callerName = params.callerName || params.from;
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Participant/', 'POST', params);
    }
  }, {
    key: 'start',
    value: function start(params) {
      if (params.status) {
        (0, _utils.validParam)('status', params.status.toLowerCase(), [String], true, 'active');
      } else {
        throw new _utils.InvalidRequestError("status is a mandatory parameter");
      }
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/', 'POST', { 'status': params.status.toLowerCase(), 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'stop',
    value: function stop() {
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'delete', this).call(this, { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'startRecording',
    value: function startRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.fileFormat) {
        (0, _utils.validParam)('fileFormat', params.fileFormat, [String], false, ['mp3', 'wav']);
      } else {
        params.fileFormat = 'mp3';
      }

      if (params.statusCallbackUrl) {
        (0, _utils.validUrl)('statusCallbackUrl', params.statusCallbackUrl, false);
      }

      if (params.statusCallbackMethod) {
        (0, _utils.validParam)('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.statusCallbackMethod = 'POST';
      }
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'POST', params);
    }
  }, {
    key: 'stopRecording',
    value: function stopRecording() {
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'DELETE', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'pauseRecording',
    value: function pauseRecording() {
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Record/Pause/', 'POST', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'resumeRecording',
    value: function resumeRecording() {
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Record/Resume/', 'POST', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'listParticipants',
    value: function listParticipants() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.callUuid) {
        (0, _utils.validParam)('callUuid', params.callUuid, [String], false);
      }
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCall.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCall.prototype), 'executeAction', this).call(this, this.id + '/Participant/', 'GET', params);
    }
  }]);

  return MultiPartyCall;
}(_base.PlivoResource);

var MultiPartyCallParticipant = exports.MultiPartyCallParticipant = function (_PlivoSecondaryResour) {
  _inherits(MultiPartyCallParticipant, _PlivoSecondaryResour);

  function MultiPartyCallParticipant(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiPartyCallParticipant);

    var _this3 = _possibleConstructorReturn(this, (MultiPartyCallParticipant.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant)).call(this, action, MultiPartyCall, idField, secondaryAction, MultiPartyCallParticipant, secondaryIdField, client));

    if (idField in data) {
      _this3.id = data[idField];
    }

    if (secondaryIdField in data) {
      _this3.secondaryId = data[secondaryIdField];
    }

    (0, _common.extend)(_this3, data);
    _this3[clientKey] = client;
    return _this3;
  }

  _createClass(MultiPartyCallParticipant, [{
    key: 'updateParticipant',
    value: function updateParticipant() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.coachMode) {
        (0, _utils.validParam)('coachMode', params.coachMode, [Boolean, String], false);
      }

      if (params.mute) {
        (0, _utils.validParam)('mute', params.mute, [Boolean, String], false);
      }

      if (params.hold) {
        (0, _utils.validParam)('hold', params.hold, [Boolean, String], false);
      }
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId, 'POST', params);
    }
  }, {
    key: 'kickParticipant',
    value: function kickParticipant() {
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId, 'DELETE', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'getParticipant',
    value: function getParticipant() {
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId, 'GET', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'startParticipantRecording',
    value: function startParticipantRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.fileFormat) {
        (0, _utils.validParam)('fileFormat', params.fileFormat, [String], false, ['mp3', 'wav']);
      } else {
        params.fileFormat = 'mp3';
      }

      if (params.statusCallbackUrl) {
        (0, _utils.validUrl)('statusCallbackUrl', params.statusCallbackUrl, false);
      }

      if (params.statusCallbackMethod) {
        (0, _utils.validParam)('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST']);
      } else {
        params.statusCallbackMethod = 'POST';
      }
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Record', 'POST', params);
    }
  }, {
    key: 'stopParticipantRecording',
    value: function stopParticipantRecording() {
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Record', 'DELETE', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'pauseParticipantRecording',
    value: function pauseParticipantRecording() {
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Record/Pause', 'POST', { 'isVoiceRequest': 'true' });
    }
  }, {
    key: 'resumeParticipantRecording',
    value: function resumeParticipantRecording() {
      return _get(MultiPartyCallParticipant.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallParticipant.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Record/Resume', 'POST', { 'isVoiceRequest': 'true' });
    }
  }]);

  return MultiPartyCallParticipant;
}(_base.PlivoSecondaryResource);

var MultiPartyCallMember = exports.MultiPartyCallMember = function (_PlivoSecondaryResour2) {
  _inherits(MultiPartyCallMember, _PlivoSecondaryResour2);

  function MultiPartyCallMember(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiPartyCallMember);

    var _this4 = _possibleConstructorReturn(this, (MultiPartyCallMember.__proto__ || Object.getPrototypeOf(MultiPartyCallMember)).call(this, action, MultiPartyCall, idField, secondaryMemberAction, MultiPartyCallMember, secondaryIdField, client));

    if (idField in data) {
      _this4.id = data[idField];
    }

    if (secondaryIdField in data) {
      _this4.secondaryId = data[secondaryIdField];
    }

    (0, _common.extend)(_this4, data);
    _this4[clientKey] = client;
    return _this4;
  }

  _createClass(MultiPartyCallMember, [{
    key: 'startPlayAudio',
    value: function startPlayAudio(params) {
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCallMember.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallMember.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Play', 'POST', params);
    }
  }, {
    key: 'stopPlayAudio',
    value: function stopPlayAudio() {
      return _get(MultiPartyCallMember.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallMember.prototype), 'executeAction', this).call(this, this.id, this.secondaryId + '/Play', 'DELETE', { 'isVoiceRequest': 'true' });
    }
  }]);

  return MultiPartyCallMember;
}(_base.PlivoSecondaryResource);

var MultiPartyCallInterface = exports.MultiPartyCallInterface = function (_PlivoResourceInterfa) {
  _inherits(MultiPartyCallInterface, _PlivoResourceInterfa);

  function MultiPartyCallInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MultiPartyCallInterface);

    var _this5 = _possibleConstructorReturn(this, (MultiPartyCallInterface.__proto__ || Object.getPrototypeOf(MultiPartyCallInterface)).call(this, action, MultiPartyCall, idField, client));

    (0, _common.extend)(_this5, data);

    _this5[clientKey] = client;
    return _this5;
  }

  _createClass(MultiPartyCallInterface, [{
    key: 'makeMpcId',
    value: function makeMpcId() {
      var uuid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var friendlyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!uuid && !friendlyName) {
        throw new MPCError('Specify either multi party call friendly name or uuid');
      }
      if (uuid && friendlyName) {
        throw new MPCError('Cannot specify both multi party call friendly name or uuid');
      }
      var identifier = '';
      if (uuid) {
        identifier = ['uuid_', uuid];
      } else {
        identifier = ['name_', friendlyName];
      }
      return identifier;
    }
  }, {
    key: 'list',
    value: function list() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.subAccount) {
        (0, _utils.validSubAccount)(params.subAccount);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      if (params.status) {
        (0, _utils.validParam)('status', params.status.toLowerCase(), [String], false, ['initialized', 'active', 'ended']);
      }
      if (params.terminationCauseCode) {
        (0, _utils.validParam)('terminationCauseCode', params.terminationCauseCode, [Number, String], false);
      }
      if (params.end_time__gt) {
        (0, _utils.validDateFormat)('end_time__gt', params.end_time__gt, false);
      }
      if (params.end_time__gte) {
        (0, _utils.validDateFormat)('end_time__gte', params.end_time__gte, false);
      }
      if (params.end_time__lt) {
        (0, _utils.validDateFormat)('end_time__lt', params.end_time__lt, false);
      }
      if (params.end_time__lte) {
        (0, _utils.validDateFormat)('end_time__lte', params.end_time__lte, false);
      }
      if (params.creation_time__gt) {
        (0, _utils.validDateFormat)('creation_time__gt', params.creation_time__gt, false);
      }
      if (params.creation_time__gte) {
        (0, _utils.validDateFormat)('creation_time__gte', params.creation_time__gte, false);
      }
      if (params.creation_time__lt) {
        (0, _utils.validDateFormat)('creation_time__lt', params.creation_time__lt, false);
      }
      if (params.creation_time__lte) {
        (0, _utils.validDateFormat)('creation_time__lte', params.creation_time__lte, false);
      }
      if (params.limit) {
        (0, _utils.validRange)('limit', params.limit, false, 1, 20);
      }
      if (params.offset) {
        (0, _utils.validRange)('offset', params.offset, false, 0);
      }
      params.isVoiceRequest = 'true';
      return _get(MultiPartyCallInterface.prototype.__proto__ || Object.getPrototypeOf(MultiPartyCallInterface.prototype), 'list', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).get();
    }
  }, {
    key: 'addParticipant',
    value: function addParticipant(role) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      params.role = role;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).addParticipant(params);
    }
  }, {
    key: 'start',
    value: function start() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).start(params);
    }
  }, {
    key: 'stop',
    value: function stop() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).stop();
    }
  }, {
    key: 'startRecording',
    value: function startRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).startRecording(params);
    }
  }, {
    key: 'stopRecording',
    value: function stopRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).stopRecording();
    }
  }, {
    key: 'pauseRecording',
    value: function pauseRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).pauseRecording();
    }
  }, {
    key: 'resumeRecording',
    value: function resumeRecording() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).resumeRecording();
    }
  }, {
    key: 'startParticipantRecording',
    value: function startParticipantRecording(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).startParticipantRecording(params);
    }
  }, {
    key: 'stopParticipantRecording',
    value: function stopParticipantRecording(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).stopParticipantRecording();
    }
  }, {
    key: 'pauseParticipantRecording',
    value: function pauseParticipantRecording(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).pauseParticipantRecording();
    }
  }, {
    key: 'resumeParticipantRecording',
    value: function resumeParticipantRecording(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).resumeParticipantRecording();
    }
  }, {
    key: 'listParticipants',
    value: function listParticipants() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCall(this[clientKey], { id: mpcId[0] + mpcId[1] }).listParticipants(params);
    }
  }, {
    key: 'updateParticipant',
    value: function updateParticipant(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).updateParticipant(params);
    }
  }, {
    key: 'kickParticipant',
    value: function kickParticipant(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).kickParticipant();
    }
  }, {
    key: 'getParticipant',
    value: function getParticipant(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallParticipant(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).getParticipant();
    }
  }, {
    key: 'startPlayAudio',
    value: function startPlayAudio(participantId, url) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      (0, _utils.validUrl)('url', url, true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      params.url = url;
      return new MultiPartyCallMember(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).startPlayAudio(params);
    }
  }, {
    key: 'stopPlayAudio',
    value: function stopPlayAudio(participantId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _utils.validParam)('participantId', participantId, [String, Number], true);
      if (params.uuid) {
        (0, _utils.validParam)('uuid', params.uuid, [String], false);
      }
      if (params.friendlyName) {
        (0, _utils.validParam)('friendlyName', params.friendlyName, [String], false);
      }
      var mpcId = this.makeMpcId(params.uuid, params.friendlyName);
      delete params.uuid;
      delete params.friendlyName;
      return new MultiPartyCallMember(this[clientKey], { id: mpcId[0] + mpcId[1], secondaryId: participantId }).stopPlayAudio(params);
    }
  }]);

  return MultiPartyCallInterface;
}(_base.PlivoResourceInterface);