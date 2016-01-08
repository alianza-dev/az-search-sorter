//! az-search-sorter version 1.0.1 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kentcdodds.com) (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["azSearchSorter"] = factory();
	else
		root["azSearchSorter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// The bulk for this file was taken from genie.js
	/* eslint no-underscore-dangle:0 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _matchRankMap = {
	  equals: 5,
	  startsWith: 4,
	  wordStartsWith: 3,
	  contains: 2,
	  acronym: 1,
	  matches: 0,
	  noMatch: -1
	};

	azSearchSorter.getMatchingStringIndexes = getMatchingStringIndexes;
	azSearchSorter.getAcronymIndexes = getAcronymIndexes;

	exports['default'] = azSearchSorter;

	function azSearchSorter() {
	  var givenString = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var thingsToSearch = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  givenString = givenString.toLowerCase();
	  return thingsToSearch.map(function (obj) {
	    // score items
	    var stringToMatch = options.propToMatch ? obj[options.propToMatch] : obj;
	    var score = _stringsMatch(stringToMatch, givenString);
	    return { obj: obj, score: score };
	  }).filter(function (item) {
	    return options.keepNonMatching || item.score > -1;
	  }).sort(function (itemA, itemB) {
	    if (itemA.score < itemB.score) {
	      return 1;
	    } else if (itemA.score > itemB.score) {
	      return -1;
	    } else {
	      return 0;
	    }
	  }).map(function (item) {
	    return item.obj;
	  }); // get the value and reverse it (best match first)
	}

	/**
	 * Gives a _matchRankMap score based on
	 * how well the two strings match.
	 * @param {string} stringToMatch - the string to rank against
	 * @param {string} givenString - the given string to rank
	 * @returns {number} - the rank
	 * @private
	 */
	function _stringsMatch(stringToMatch, givenString) {
	  /* eslint complexity:[2, 8] */
	  stringToMatch = ('' + stringToMatch).toLowerCase();

	  // too long
	  if (givenString.length > stringToMatch.length) {
	    return _matchRankMap.noMatch;
	  }

	  // equals
	  if (stringToMatch === givenString) {
	    return _matchRankMap.equals;
	  }

	  // starts with
	  if (stringToMatch.indexOf(givenString) === 0) {
	    return _matchRankMap.startsWith;
	  }

	  // word starts with
	  if (stringToMatch.indexOf(' ' + givenString) !== -1) {
	    return _matchRankMap.wordStartsWith;
	  }

	  // contains
	  if (stringToMatch.indexOf(givenString) !== -1) {
	    return _matchRankMap.contains;
	  } else if (givenString.length === 1) {
	    // If the only character in the given magic word
	    //   isn't even contained in the magic word, then
	    //   it's definitely not a match.
	    return _matchRankMap.noMatch;
	  }

	  // acronym
	  if (_isAcronym(stringToMatch, givenString)) {
	    return _matchRankMap.acronym;
	  }

	  return _stringsByCharOrder(stringToMatch, givenString);
	}

	function getAcronymIndexes() {
	  var stringToMatch = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var givenString = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var matchingIndexes = null;
	  stringToMatch = stringToMatch.toLowerCase();
	  givenString = givenString.toLowerCase();
	  if (_isAcronym(stringToMatch, givenString)) {
	    (function () {
	      var charNumber = -1;
	      matchingIndexes = [];
	      givenString.split('').forEach(function (matchChar, index) {
	        var isFirst = index === 0;
	        var findIndex = isFirst ? matchChar : ' ' + matchChar;
	        charNumber = stringToMatch.indexOf(findIndex, charNumber + 1);
	        charNumber += isFirst ? 0 : 1;
	        matchingIndexes.push(charNumber);
	      });
	    })();
	  }
	  return matchingIndexes;
	}

	function _isAcronym(stringToMatch, givenString) {
	  return _getAcronym(stringToMatch).indexOf(givenString) !== -1;
	}

	/**
	 * Generates an acronym for a string.
	 *
	 * @param {string} string - the string to generate the acronym for
	 * @returns {string} - the acronym
	 * @private
	 * @examples
	 * _getAcronym('i love candy') // => 'ilc'
	 * _getAcronym('water-fall in the spring-time') // => 'wfitst'
	 */
	function _getAcronym(string) {
	  var acronym = '';
	  var wordsInString = string.split(' ');
	  wordsInString.forEach(function (wordInString) {
	    var splitByHyphenWords = wordInString.split('-');
	    splitByHyphenWords.forEach(function (splitByHyphenWord) {
	      acronym += splitByHyphenWord.substr(0, 1);
	    });
	  });
	  return acronym;
	}

	/**
	 * Returns a _matchRankMap.matches or noMatch score based on whether
	 * the characters in the givenString are found in order in the
	 * stringToMatch
	 * @param {string} stringToMatch - the string to match
	 * @param {string} givenString - the string that is given
	 * @returns {number} - matches rank or noMatch rank
	 * @private
	 */
	function _stringsByCharOrder(stringToMatch, givenString) {
	  var matchingIndexes = getMatchingStringIndexes(stringToMatch, givenString);
	  if (!matchingIndexes || !matchingIndexes.length) {
	    return _matchRankMap.noMatch;
	  } else {
	    return _matchRankMap.matches;
	  }
	}

	function getMatchingStringIndexes(stringToMatch, givenString) {
	  var charNumber = -1;
	  var matchingIndexes = [];
	  givenString.split('').every(function (matchChar) {
	    charNumber = stringToMatch.indexOf(matchChar, charNumber + 1);
	    if (charNumber === -1) {
	      matchingIndexes = null;
	    } else {
	      matchingIndexes.push(charNumber);
	      return true;
	    }
	  });
	  return matchingIndexes;
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;