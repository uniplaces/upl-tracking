"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

exports.default = { capitalize };