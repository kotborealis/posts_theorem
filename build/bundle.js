/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gui = __webpack_require__(1);
	
	var GUI = _interopRequireWildcard(_gui);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BooleanFunction = __webpack_require__(2);
	
	var _PostTheorem = __webpack_require__(4);
	
	var PostTheorem = _interopRequireWildcard(_PostTheorem);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var input = document.getElementById("_input");
	var output = document.getElementById("_output");
	
	input.onkeyup = function (event) {
	    processInput(input.value);
	};
	
	var processInput = function processInput(value) {
	    output.innerHTML = '';
	    var lines = value.split('\n');
	    var functions = [];
	
	    for (var i = 0; i < lines.length; i++) {
	        if (lines[i] === '') continue;
	
	        try {
	            functions.push(new _BooleanFunction.BooleanFunction(lines[i]));
	        } catch (e) {
	            output.innerHTML = '\n                <div style="color: red;">\n                    ' + e + '\n                </div>\n            ';
	            return;
	        }
	    }
	
	    var data = PostTheorem.isFullSystem(functions);
	    output.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
	};
	
	processInput('');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BooleanFunction = undefined;
	
	var _BitNumber = __webpack_require__(3);
	
	var _BitNumber2 = _interopRequireDefault(_BitNumber);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BooleanFunction = exports.BooleanFunction = function BooleanFunction(output_values) {
	    //constructor
	    var values = output_values.split('').map(function (v) {
	        return Number.parseInt(v);
	    });
	    var argc = Math.log2(values.length);
	
	    if (!Number.isInteger(argc)) {
	        throw new Error("Boolean function must have 2^n values!");
	    }
	
	    for (var i = 0; i < values.length; i++) {
	        if (!Number.isInteger(values[i])) {
	            throw new Error("Boolean function must consist of integers!");
	        }
	        if (values[i] !== 0 && values[i] !== 1) {
	            throw new Error("Wrong values for boolean function!");
	        }
	    }
	
	    this.argc = argc;
	    this.value = new _BitNumber2.default(Number.parseInt(values.join(''), 2), Math.pow(2, this.argc));
	
	    this.toString = function () {
	        return values.join('');
	    };
	}; /**
	    * Created by kotborealis on 26.09.2016.
	    */

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (num, _length) {
	    var _this = this;
	
	    this.length = _length ? _length : 32;
	    this.value = Number(num);
	
	    this.byte = function (n, reverse) {
	        if (!reverse) return _this.value >> _this.length - n - 1 & 1;else return _this.value >> n & 1;
	    };
	
	    this.forEach = function (callback) {
	        for (var i = 0; i < _this.length; i++) {
	            callback(_this.byte(i), i, _this.value);
	        }
	    };
	
	    this.map = function (callback) {
	        var r = [];
	        _this.forEach(function (v) {
	            r.push(callback(v));
	        });
	        return r;
	    };
	
	    this.equal = function (n) {
	        return n.value === _this.value;
	    };
	
	    this.lessOrEqual = function (byteNumber) {
	        if (_this.length !== byteNumber.length) throw new Error("Bad arg");
	
	        var diffs = 0;
	        var diff_pos = -1;
	        for (var i = 0; i < _this.length; i++) {
	            var l = _this.byte(i);
	            var r = byteNumber.byte(i);
	            if (l !== r) {
	                diffs++;
	                diff_pos = i;
	                if (diffs > 1) {
	                    return null;
	                }
	            }
	        }
	
	        if (diffs === 0) return null;
	        if (diffs === 1) return _this.byte(diff_pos) < byteNumber.byte(diff_pos);
	    };
	};
	
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isFullSystem = exports.isL = exports.isM = exports.isS = exports.isT1 = exports.isT0 = undefined;
	
	var _BooleanFunction = __webpack_require__(2);
	
	var _BitNumber = __webpack_require__(3);
	
	var _BitNumber2 = _interopRequireDefault(_BitNumber);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by kotborealis on 26.09.2016.
	 */
	
	var isT0 = exports.isT0 = function isT0(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected, got " + JSON.stringify(booleanFunction));
	
	    return booleanFunction.value.byte(0) === 0;
	};
	
	var isT1 = exports.isT1 = function isT1(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    return booleanFunction.value.byte(booleanFunction.value.length - 1) === 1;
	};
	
	var isS = exports.isS = function isS(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    for (var i = 0; i < booleanFunction.value.length / 2; i++) {
	        var l = booleanFunction.value.byte(i);
	        var r = booleanFunction.value.byte(i, true);
	        if (l === r) return false;
	    }
	    return true;
	};
	
	var isM = exports.isM = function isM(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    for (var i = 0; i < booleanFunction.value.length; i++) {
	        for (var j = 0; j < booleanFunction.value.length; j++) {
	            var l = new _BitNumber2.default(i, booleanFunction.argc);
	            var r = new _BitNumber2.default(j, booleanFunction.argc);
	            var less_or_equal = l.lessOrEqual(r);
	
	            if (less_or_equal && !(booleanFunction.value.byte(i) <= booleanFunction.value.byte(j))) return false;
	        }
	    }
	
	    return true;
	};
	
	var isL = exports.isL = function isL(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    var ZhegalkinRows = [];
	    ZhegalkinRows.push(booleanFunction.value.map(function (b) {
	        return b;
	    }));
	
	    for (var reduced = ZhegalkinReduceRow(ZhegalkinRows[0]); reduced.length > 0; reduced = ZhegalkinReduceRow(ZhegalkinRows[ZhegalkinRows.length - 1])) {
	        ZhegalkinRows.push(reduced);
	    }var ZhegalkinPolynomial = ZhegalkinRows.map(function (row) {
	        return row[0];
	    });
	
	    var linearPolynomial = true;
	    ZhegalkinPolynomial.forEach(function (member, i) {
	        if (member && i !== 0 && !Number.isInteger(Math.log2(i))) linearPolynomial = false;
	    });
	
	    return linearPolynomial;
	};
	
	var isFullSystem = exports.isFullSystem = function isFullSystem(booleanFunctions) {
	    if (!Array.isArray(booleanFunctions)) throw new Error("Array expected");
	
	    for (var i = 0; i < booleanFunctions.length; i++) {
	        if (!(booleanFunctions[i] instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instances array expected");
	    }var postsCriterion = {
	        hasNotT0: false,
	        hasNotT1: false,
	        hasNotS: false,
	        hasNotM: false,
	        hasNotL: false
	    };
	
	    var functionsClasses = [];
	
	    booleanFunctions.forEach(function (booleanFunction) {
	        var functionClasses = {
	            f: booleanFunction.toString(),
	            isT0: isT0(booleanFunction),
	            isT1: isT1(booleanFunction),
	            isS: isS(booleanFunction),
	            isM: isM(booleanFunction),
	            isL: isL(booleanFunction)
	        };
	
	        postsCriterion.hasNotT0 = postsCriterion.hasNotT0 || !functionClasses.isT0;
	        postsCriterion.hasNotT1 = postsCriterion.hasNotT1 || !functionClasses.isT1;
	        postsCriterion.hasNotS = postsCriterion.hasNotS || !functionClasses.isS;
	        postsCriterion.hasNotM = postsCriterion.hasNotM || !functionClasses.isM;
	        postsCriterion.hasNotL = postsCriterion.hasNotL || !functionClasses.isL;
	
	        functionsClasses.push(functionClasses);
	    });
	
	    return {
	        isFullSystem: postsCriterion.hasNotT0 && postsCriterion.hasNotT1 && postsCriterion.hasNotS && postsCriterion.hasNotM && postsCriterion.hasNotL,
	        functions: functionsClasses
	    };
	};
	
	function ZhegalkinReduceRow(row) {
	    var reduced = [];
	    for (var i = 0; i < row.length - 1; i++) {
	        reduced.push((row[i] + row[i + 1]) % 2);
	    }return reduced;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map