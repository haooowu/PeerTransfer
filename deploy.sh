#!/bin/sh
if [ -z "$1" ]
then
  echo "Select sub folder for deploy"
  exit 1
fi
git checkout deploy
git pull origin main
git rm -r --cached .
git add .

yarn run build
git add -A
git commit -m "update build"
git push origin
git subtree push --prefix $1 origin gh-pages

git checkout main
git rm -r --cached .
git add .
