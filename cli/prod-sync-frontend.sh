#!/bin/sh

pushd frontend
npm run build-prod
popd

pushd backend
npx sls frontend:upload -s prod --verbose
popd
