#!/bin/sh

pushd frontend
npm run build-dev
popd

pushd backend
npx sls frontend:upload -s dev --verbose
popd
