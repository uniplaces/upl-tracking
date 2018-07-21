define(['exports', './upl-tracking'], function (exports, _uplTracking) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'setEnvironment', {
    enumerable: true,
    get: function () {
      return _uplTracking.setEnvironment;
    }
  });
  Object.defineProperty(exports, 'trackTouch', {
    enumerable: true,
    get: function () {
      return _uplTracking.trackTouch;
    }
  });
  Object.defineProperty(exports, 'trackAction', {
    enumerable: true,
    get: function () {
      return _uplTracking.trackAction;
    }
  });
  Object.defineProperty(exports, 'assignUserToTrackingId', {
    enumerable: true,
    get: function () {
      return _uplTracking.assignUserToTrackingId;
    }
  });
  Object.defineProperty(exports, 'getCookie', {
    enumerable: true,
    get: function () {
      return _uplTracking.getCookie;
    }
  });
  Object.defineProperty(exports, 'ActionsType', {
    enumerable: true,
    get: function () {
      return _uplTracking.ActionsType;
    }
  });
});