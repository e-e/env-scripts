#!/usr/bin/env node

const fs = require("fs");
const dotenv = require("dotenv");

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

module.exports = diff;
