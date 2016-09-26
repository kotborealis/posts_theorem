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
	
	var _test = __webpack_require__(5);
	
	var Test = _interopRequireWildcard(_test);
	
	var _gui = __webpack_require__(6);
	
	var GUI = _interopRequireWildcard(_gui);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	Test.testPostsClasses('./test/set1.json');
	Test.testPostsClasses('./test/set2.json');
	
	Test.testPostsCriterionFullSystem('./test/set1.json');
	Test.testPostsCriterionFullSystem('./test/set2.json');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BooleanFunction = undefined;
	
	var _BinaryString = __webpack_require__(2);
	
	var BinaryString = _interopRequireWildcard(_BinaryString);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var BooleanFunction = exports.BooleanFunction = function BooleanFunction(output_values) {
	    var _this = this;
	
	    //constructor
	    var values = output_values.split('').map(function (v) {
	        return Number.parseInt(v);
	    });
	    var argc = Math.log2(values.length);
	
	    if (!Number.isInteger(argc)) {
	        throw new Error("Boolean function must have 2^n values!");
	    }
	
	    for (var i = 0; i < values; i++) {
	        if (!Number.isInteger(values[i])) {
	            throw new Error("Boolean function must consist of integers!");
	        }
	        if (values[i] !== 0 || values[i] !== 1) {
	            throw new Error("Wrong values for boolean function!");
	        }
	    }
	
	    this.argc = argc;
	
	    this.data = {};
	    this.data.values = values;
	    this.data.binaryString = {};
	    for (var _i = 0; _i < values.length; _i++) {
	        this.data.binaryString[BinaryString.create(_i, this.argc)] = this.data.values[_i];
	    }this.forEach = function (callback) {
	        for (var _i2 = 0; _i2 < _this.data.values.length; _i2++) {
	            callback(_this.data.values[_i2], BinaryString.create(_i2, _this.argc));
	        }
	    };
	
	    this.toString = function () {
	        return values.join('');
	    };
	}; /**
	    * Created by kotborealis on 26.09.2016.
	    */

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var create = exports.create = function create(num, length) {
	    return ('0'.repeat(length) + num.toString(2)).slice(-length);
	};
	
	var invert = exports.invert = function invert(string) {
	    return string.split('').map(function (i) {
	        return Number.parseInt(i);
	    }).map(function (i) {
	        return Number(!i);
	    }).join('');
	};
	
	var lessOrEqual = exports.lessOrEqual = function lessOrEqual(l, r) {
	    if (l.length !== r.length) throw new Error("bad boolean strings");
	
	    var diffs = 0;
	    var diff_pos = -1;
	    for (var i = 0; i < l.length; i++) {
	        if (l[i] !== r[i]) {
	            diffs++;
	            diff_pos = i;
	        }
	    }
	
	    if (diffs > 1) return null;
	    if (diffs === 0) return null;
	    if (diffs === 1) return Number.parseInt(l[diff_pos]) < Number.parseInt(r[diff_pos]);
	};
	
	var isZhegalkinPolynomialLinearMember = exports.isZhegalkinPolynomialLinearMember = function isZhegalkinPolynomialLinearMember(string) {
	    var _ = 0; //I dunno lol
	    string.split('').forEach(function (i) {
	        if (i === '1') _++;
	    });
	
	    return _ < 2;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isFullSystem = exports.isL = exports.isM = exports.isS = exports.isT1 = exports.isT0 = undefined;
	
	var _BooleanFunction = __webpack_require__(1);
	
	var _BinaryString = __webpack_require__(2);
	
	var BinaryString = _interopRequireWildcard(_BinaryString);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Created by kotborealis on 26.09.2016.
	 */
	
	var isT0 = exports.isT0 = function isT0(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected, got " + JSON.stringify(booleanFunction));
	
	    return booleanFunction.data.values[0] === 0;
	};
	
	var isT1 = exports.isT1 = function isT1(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    return booleanFunction.data.values[booleanFunction.data.values.length - 1] === 1;
	};
	
	var isS = exports.isS = function isS(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    for (var i = 0; i < booleanFunction.data.values.length / 2; i++) {
	        var i_bin = BinaryString.create(i, booleanFunction.argc);
	        var l = booleanFunction.data.binaryString[i_bin];
	        var r = booleanFunction.data.binaryString[BinaryString.invert(i_bin)];
	        if (l === r) return false;
	    }
	    return true;
	};
	
	var isM = exports.isM = function isM(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    for (var i = 0; i < booleanFunction.data.values.length; i++) {
	        for (var j = 0; j < booleanFunction.data.values.length; j++) {
	            var l = BinaryString.create(i, booleanFunction.argc);
	            var r = BinaryString.create(j, booleanFunction.argc);
	            var less_or_equal = BinaryString.lessOrEqual(l, r);
	
	            if (less_or_equal && !(booleanFunction.data.values[i] <= booleanFunction.data.values[j])) return false;
	        }
	    }
	
	    return true;
	};
	
	var isL = exports.isL = function isL(booleanFunction) {
	    if (!(booleanFunction instanceof _BooleanFunction.BooleanFunction)) throw new Error("BooleanFunction instance expected");
	
	    var ZhegalkinRows = [];
	    ZhegalkinRows.push(booleanFunction.data.values);
	
	    for (var reduced = ZhegalkinReduceRow(ZhegalkinRows[0]); reduced.length > 0; reduced = ZhegalkinReduceRow(ZhegalkinRows[ZhegalkinRows.length - 1])) {
	        ZhegalkinRows.push(reduced);
	    }var ZhegalkinPolynomial = ZhegalkinRows.map(function (row) {
	        return row[0];
	    });
	
	    var linearPolynomial = true;
	    ZhegalkinPolynomial.forEach(function (member, i) {
	        if (member && !BinaryString.isZhegalkinPolynomialLinearMember(BinaryString.create(i, booleanFunction.argc))) linearPolynomial = false;
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var loadJSONfromURL = exports.loadJSONfromURL = function loadJSONfromURL(url, callback) {
	    var _ = new XMLHttpRequest();
	    _.overrideMimeType("application/json");
	    _.open('GET', url, true);
	    _.onreadystatechange = function () {
	        if (_.readyState == 4 && _.status == "200") {
	            callback(JSON.parse(_.responseText));
	        }
	    };
	    _.send(null);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.testPostsCriterionFullSystem = exports.testPostsClasses = undefined;
	
	var _BooleanFunction = __webpack_require__(1);
	
	var _PostTheorem = __webpack_require__(3);
	
	var PostTheorem = _interopRequireWildcard(_PostTheorem);
	
	var _utils = __webpack_require__(4);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var testLogStyle = {
	    error: 'background: #ffcccc; color: #0c0c0c;',
	    success: 'background: #ccffcc; color: #0c0c0c;',
	    info: 'background: #050505; color: #fcfcfc;'
	};
	
	var testPostsClassesProps = ["isT0", "isT1", "isS", "isM", "isL"];
	
	var testPostsClasses = exports.testPostsClasses = function testPostsClasses(filename) {
	    utils.loadJSONfromURL(filename, function (data) {
	        console.log('%cPost\'s Classes tests from file ' + filename, testLogStyle.info);
	        data.functions.forEach(function (testData) {
	            console.log('%cPost\'s Classes test for function ' + testData.f, testLogStyle.info);
	            testPostsClassesProps.forEach(function (p) {
	                if (PostTheorem[p]) {
	                    var testResult = {};
	                    testResult.result = PostTheorem[p](new _BooleanFunction.BooleanFunction(testData.f));
	                    testResult.expected = testData[p];
	                    testResult.valid = testResult.result === testResult.expected;
	
	                    console.log('%c' + p + ': got ' + testResult.result + ', expected ' + testResult.expected, testResult.valid ? testLogStyle.success : testLogStyle.error);
	                }
	            });
	        });
	    });
	};
	
	var testPostsCriterionFullSystem = exports.testPostsCriterionFullSystem = function testPostsCriterionFullSystem(filename) {
	    utils.loadJSONfromURL(filename, function (data) {
	        console.log('%cPost\'s Criterion tests for file ' + filename, testLogStyle.info);
	        var testData = data.functions.map(function (f) {
	            return new _BooleanFunction.BooleanFunction(f.f);
	        });
	        var result = PostTheorem.isFullSystem(testData).isFullSystem;
	        var expected = data.isFullSystem;
	        var valid = result === expected;
	
	        console.log('%cGot ' + result + ', expected ' + expected, valid ? testLogStyle.success : testLogStyle.error);
	    });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BooleanFunction = __webpack_require__(1);
	
	var _PostTheorem = __webpack_require__(3);
	
	var PostTheorem = _interopRequireWildcard(_PostTheorem);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var input = document.getElementById("_input");
	var output = document.getElementById("_output");
	
	input.onkeydown = function (event) {
	    if (event.keyCode == 13) processInput(input.value);
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
	            output.innerHTML = '\n                <div style="color: red;">\n                    Error: ' + e + '\n                </div>\n            ';
	            return;
	        }
	    }
	
	    var data = PostTheorem.isFullSystem(functions);
	    output.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map