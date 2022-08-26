#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const baseDirectory = process.argv[2];
const sourceEnvPath = process.argv[3];
const destinationEnvPath = process.argv[4];

const errors = [];
if (!baseDirectory) {
  errors.push("Missing base directory env path");
}
if (!sourceEnvPath) {
  errors.push("Missing source env (relative) path");
}
if (!destinationEnvPath) {
  errors.push("Missing destination env (relative) path");
}

if (errors.length) {
  errors.map((err) => console.log(err));
  process.exit(0);
}

/**
 *
 * @param {string} sourceEnvPath - ".env.example", for example
 * @param {string} destinationEnvPath - ".env", for example
 * @return {{missing: string[], extra: string[]}}
 */
const diff = (sourceEnvPath, destinationEnvPath) => {
  const sourceContents = fs.readFileSync(sourceEnvPath, { encoding: "utf-8" });
  const sourceBuffer = Buffer.from(sourceContents);
  const sourceValues = dotenv.parse(sourceBuffer);
  const sourceVars = Object.keys(sourceValues);

  const destinationContents = fs.readFileSync(destinationEnvPath, {
    encoding: "utf-8",
  });
  const destinationBuffer = Buffer.from(destinationContents);
  const destinationValues = dotenv.parse(destinationBuffer);
  const destinationVars = Object.keys(destinationValues);

  const missing = [];
  sourceVars.forEach((envVar) => {
    if (!destinationValues.hasOwnProperty(envVar)) {
      missing.push(envVar);
    }
  });

  const extra = [];
  destinationVars.forEach((envVar) => {
    if (!sourceValues.hasOwnProperty(envVar)) {
      extra.push(envVar);
    }
  });

  return { missing, extra };
};

const results = diff(
  path.join(baseDirectory, sourceEnvPath),
  path.join(baseDirectory, destinationEnvPath)
);

console.log("Missing:");
results.missing.forEach((key) => console.log(key));
if (results.missing.length === 0) {
  console.log("All env vars present");
}

console.log("\nExtra:");
results.extra.forEach((key) => console.log(key));
if (results.extra.length === 0) {
  console.log("No extra vars present");
}
