/* */ 
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});
