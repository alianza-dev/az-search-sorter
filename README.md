# az-search-sorter

[![npm version](https://img.shields.io/npm/v/az-search-sorter.svg?style=flat-square)](https://www.npmjs.org/package/az-search-sorter)
[![npm downloads](https://img.shields.io/npm/dm/az-search-sorter.svg?style=flat-square)](http://npm-stat.com/charts.html?package=az-search-sorter&from=2015-06-01)
[![Build Status](https://img.shields.io/travis/alianza-dev/az-search-sorter/master.svg?style=flat-square)](https://travis-ci.org/alianza-dev/az-search-sorter)
[![Code Coverage](https://img.shields.io/codecov/c/github/alianza-dev/az-search-sorter.svg?style=flat-square)](https://codecov.io/github/alianza-dev/az-search-sorter)

A function that takes a search term, things to search, and some configuration options and returns the things to search
in the most logical order.

## Usage:

```shell
$ npm install -S az-search-sorter
```

```javascript
var search = require('az-search-sorter'); // available as a global in other environments as azSearchSorter

// example from a test:
const results = search('hi', ['hello', 'hi', 'Hannah Istanbul', 'secret and hidden', 'this', 'Heidi', 'hurt']);
expect(results).to.eql(['hi', 'secret and hidden', 'this', 'Hannah Istanbul', 'Heidi']);

// Note, also works with objects with the propToMatch
```

### options

- `propToMatch` - allows you to specify a property of the objects in the array to match
- `keepNonMatching` - allows you to specify that you wish to keep the non-matching items (at the end of the result set)

## LICENSE

MIT

## Code of Conduct

[Contributor Covenant](http://contributor-covenant.org)

## Credits

This was originally developed by me ([Kent C. Dodds](https://twitter.com/kentcdodds)) as part of
[genie](https://github.com/kentcdodds/genie). I later pulled it out for use here at work at
[Alianza Inc.](http://www.alianza.com/) and then open sourced this piece here.
