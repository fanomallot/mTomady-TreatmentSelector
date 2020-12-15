"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var token = null;
var user = null;
var isAuthenticated = false;
var jwtToken = window.localStorage.getItem('jwtToken');
var userStorage = JSON.parse(window.localStorage.getItem('user'));

if (jwtToken) {
  token = jwtToken;
  isAuthenticated = true;
}

if (userStorage) {
  user = userStorage;
}

var initialState = {
  token: token,
  user: user,
  isAuthenticated: isAuthenticated,
  isAuthenticating: false,
  error: null
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'AUTH_LOGIN_REQUEST':
      return _objectSpread({}, state, {
        isAuthenticating: true
      });

    case 'AUTH_LOGIN_ERROR':
      return _objectSpread({}, state, {
        isAuthenticating: false,
        error: action.error
      });

    case 'AUTH_LOGIN_SUCCESS':
      return _objectSpread({}, state, {
        token: action.token,
        user: action.user,
        isAuthenticated: true,
        isAuthenticating: false
      });

    case 'AUTH_UPDATE_SUCCESS':
      return _objectSpread({}, state, {
        user: action.user
      });

    case 'AUTH_REFRESH_USER':
      return _objectSpread({}, state, {
        user: action.user
      });

    case 'AUTH_LOGOUT_SUCCESS':
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false
      };

    default:
      return state;
  }
};

exports["default"] = _default;