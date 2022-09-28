const { javascript } = require("projen");
const project = new javascript.NodeProject({
  defaultReleaseBranch: "main",
  name: "env-scripts",
  majorVersion: 1,
  releaseToNpm: true,
  repository: "https://github.com/e-e/env-scripts",
  deps: [
    "command-line-args",
    "commander",
    "dotenv@^16.0.1",
  ] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ["prettier@^2.7.1"] /* Build dependencies for this module. */,
  // packageName: undefined,  /* The "name" in package.json. */
  bin: {
    "env-scripts": "lib/index.js",
  },
  gitignore: [".idea"],
  description: "A collection of scripts to perform actions related to .env files.",
  keywords: [".env file", ".env files", "sort .env file", ".env file diff", "find missing .env variables", ".env"]
});
project.synth();
