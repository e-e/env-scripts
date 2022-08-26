#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const baseDirectory = process.argv[2];
const sourceEnvPath = process.argv[3];

const errors = [];
if (!baseDirectory) {
  errors.push("Missing base directory env path");
}
if (!sourceEnvPath) {
  errors.push("Missing source env (relative) path");
}

if (errors.length) {
  errors.map((err) => console.log(err));
  process.exit(0);
}

const sourceContents = fs.readFileSync(
  path.join(baseDirectory, sourceEnvPath),
  { encoding: "utf-8" }
);
const sourceBuffer = Buffer.from(sourceContents);
const sourceMap = dotenv.parse(sourceBuffer);
const keys = Object.keys(sourceMap).sort();

const newContent = keys
.reduce((contents, key) => {
  contents.push(`${key}=${sourceMap[key]}`);
  return contents;
}, [])
.join("\n");

fs.writeFileSync(
  path.join(baseDirectory, `${sourceEnvPath}-sorted`),
  newContent
);
// console.log(newContent);
