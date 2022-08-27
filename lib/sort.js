#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const sort = (sourcePath) => {
  const sourceContents = fs.readFileSync(sourcePath, { encoding: "utf-8" });
  const sourceBuffer = Buffer.from(sourceContents);
  const sourceMap = dotenv.parse(sourceBuffer);
  const keys = Object.keys(sourceMap).sort();

  const newContent = keys
    .reduce((contents, key) => {
      contents.push(`${key}=${sourceMap[key]}`);
      return contents;
    }, [])
    .join("\n");

  fs.writeFileSync(`${sourcePath}-sorted`, newContent);
};

module.exports = sort;
