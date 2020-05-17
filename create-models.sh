#!/bin/sh
rm -rf dist/pydt-shared-models
mkdir dist/pydt-shared-models
./node_modules/.bin/tsc -d projects/pydt-shared-lib/src/model/* --outDir dist/pydt-shared-models
cp projects/pydt-shared-lib/package.json dist/pydt-shared-models

node > dist/pydt-shared-models/package.json.new <<EOF
//Read data
var data = require('./dist/pydt-shared-models/package.json');

//Manipulate data
data.name = data.name + '-models';
data.main = 'index.js';

//Output data
console.log(JSON.stringify(data, null, 2));

EOF

mv dist/pydt-shared-models/package.json.new dist/pydt-shared-models/package.json