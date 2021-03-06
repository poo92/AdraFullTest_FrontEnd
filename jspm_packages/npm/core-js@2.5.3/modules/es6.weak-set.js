/* */ 
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';
require('./_collection')(WEAK_SET, function(get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }}, weak, false, true);
