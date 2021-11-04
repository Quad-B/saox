'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('package.json');
let student = JSON.parse(rawdata);
//console.log(student["build"]["publish"])
//console.log(student);
//let wow = student["build"]["publish"][0]
student["build"]["publish"][0]["releaseType"] = "prerelease";
//console.log(wow);
let data = JSON.stringify(student);
fs.writeFileSync('package.json', data);