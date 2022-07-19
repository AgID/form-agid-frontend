#!/bin/bash
# set -x

cd $PWD
versionStr=$(grep version package.json | head -1); 

if [[ $versionStr =~ [0-9]\.[0-9]\.[0-9] ]]; then
  version=${BASH_REMATCH[0]}
  echo "Deploying version " $version
else 
  echo "no version found in package.json"; 
  exit 10
fi

docker build -t nginx/agid-forms-frontend:$version .

docker push nginx/agid-forms-frontend:$version