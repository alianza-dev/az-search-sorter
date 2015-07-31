#!/usr/bin/env bash
set -e

echo "-- Checking code --"
time npm run eslint
echo "-- Code is good --"

echo "-- Running tests with coverage --"
time npm run test:single
echo "-- Tests complete --"

echo "-- Checking coverage thresholds --"
time npm run check-coverage
echo "-- Coverage looks good --"

if [ "$CI" = "true" ]; then
  echo "-- Reporting code coverage --"
  cat ./coverage/lcov.info | node_modules/.bin/codecov
  echo "-- Code coverage reported --"
fi;

echo "-- Building --"
time npm run build
echo "-- Build successful --"
