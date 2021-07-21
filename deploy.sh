#!/bin/sh
if [ -z "$1" ]
then
  echo "Select sub folder for deploy"
  exit 1
fi
git subtree push --prefix $1 origin gh-pages