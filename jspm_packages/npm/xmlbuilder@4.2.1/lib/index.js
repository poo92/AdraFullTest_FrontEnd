/* */ 
(function() {
  var XMLBuilder,
      assign;
  assign = require('lodash/assign');
  XMLBuilder = require('./XMLBuilder');
  module.exports.create = function(name, xmldec, doctype, options) {
    options = assign({}, xmldec, doctype, options);
    return new XMLBuilder(name, options).root();
  };
}).call(this);
