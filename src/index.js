// The bulk for this file was taken from genie.js
/* eslint no-underscore-dangle:0 */
const _matchRankMap = {
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

export default azSearchSorter;

function azSearchSorter(givenString = '', thingsToSearch = [], options = {}) {
  givenString = givenString.toLowerCase();
  return thingsToSearch
    .map(function(obj) { // score items
      const stringToMatch = options.propToMatch ? obj[options.propToMatch] : obj;
      const score = _stringsMatch(stringToMatch, givenString);
      return {obj, score};
    })
    .filter(item => options.keepNonMatching || item.score > -1)
    .sort((itemA, itemB) => itemA.score < itemB.score)
    .map(item => item.obj); // get the value and reverse it (best match first)
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

function getAcronymIndexes(stringToMatch = '', givenString = '') {
  let matchingIndexes = null;
  stringToMatch = stringToMatch.toLowerCase();
  givenString = givenString.toLowerCase();
  if (_isAcronym(stringToMatch, givenString)) {
    let charNumber = -1;
    matchingIndexes = [];
    givenString.split('').forEach(function(matchChar, index) {
      const isFirst = index === 0;
      const findIndex = isFirst ? matchChar : ' ' + matchChar;
      charNumber = stringToMatch.indexOf(findIndex, charNumber + 1);
      charNumber += isFirst ? 0 : 1;
      matchingIndexes.push(charNumber);
    });
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
  let acronym = '';
  const wordsInString = string.split(' ');
  wordsInString.forEach(function(wordInString) {
    const splitByHyphenWords = wordInString.split('-');
    splitByHyphenWords.forEach(function(splitByHyphenWord) {
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
  const matchingIndexes = getMatchingStringIndexes(stringToMatch, givenString);
  if (!matchingIndexes || !matchingIndexes.length) {
    return _matchRankMap.noMatch;
  } else {
    return _matchRankMap.matches;
  }
}

function getMatchingStringIndexes(stringToMatch, givenString) {
  let charNumber = -1;
  let matchingIndexes = [];
  givenString.split('').every(function(matchChar) {
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
