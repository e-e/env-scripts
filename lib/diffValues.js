#!/usr/bin/env node

const fs = require("fs");
const dotenv = require("dotenv");

/**
 *
 * @param {string} sourceContents - ".env.example", for example
 * @param {string} destinationContents - ".env", for example
 * @return {{variable: string, sourceValue: string, destValue: string}[]}
 */
const diffValues = (sourceContents, destinationContents) => {
    const sourceBuffer = Buffer.from(sourceContents);
    const sourceValues = dotenv.parse(sourceBuffer);
    const sourceVars = Object.keys(sourceValues);

    const destinationBuffer = Buffer.from(destinationContents);
    const destinationValues = dotenv.parse(destinationBuffer);
    const destinationVars = Object.keys(destinationValues);

    const allKeys = {};
    sourceVars.forEach((envVar) => {
        allKeys[envVar] = 0;
    });
    destinationVars.forEach((envVar) => {
        allKeys[envVar] = 0;
    });

    const output = [];

    for (const envVar of Object.keys(allKeys)) {
        if (sourceValues.hasOwnProperty(envVar) && destinationValues.hasOwnProperty(envVar) && sourceValues[envVar] !== destinationValues[envVar]) {
            // console.log(envVar);
            // console.log(sourceValues[envVar]);
            // console.log(destinationValues[envVar]);
            output.push({
                variable: envVar,
                sourceValue: sourceValues[envVar],
                destValue: destinationValues[envVar],
            });
        } else if (!sourceValues.hasOwnProperty(envVar)) {
            // console.log(envVar);
            // console.log("<n/a>");
            // console.log(destinationValues[envVar]);
            output.push({
                variable: envVar,
                sourceValue: "<undefined>",
                destValue: destinationValues[envVar],
            });
        }  else if (!destinationValues.hasOwnProperty(envVar)) {
            // console.log(envVar);
            // console.log(sourceValues[envVar]);
            // console.log("<n/a>");
            output.push({
                variable: envVar,
                sourceValue: sourceValues[envVar],
                destValue: "<undefined>",
            });
        } else {
            // they match, print nothing
        }
    }

    return output;
};

module.exports = diffValues;
