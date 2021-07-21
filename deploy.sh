#!/bin/sh
if [ -z "$1" ]
then
  echo "Select sub folder for deploy"
  exit 1
fi

git checkout deployment
git rm -r --cached .
git add .
git pull origin main
yarn run build
git add -A
git commit -m 'merge main branch'
git push origin

git add build && git commit -m "update build"
git subtree push --prefix $1 origin gh-pages

git checkout main
git rm -r --cached .
git add .
