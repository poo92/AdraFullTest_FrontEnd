/* */ 
"format cjs";
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];
var define = function(fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};
if (require('./_fails')(function() {
  return $toString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}
