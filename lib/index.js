#!/usr/bin/env node

const path = require("path");
const { Command } = require("commander");
const program = new Command();
const diff = require("./diff");
const sort = require("./sort");

program
  .name("env-scripts")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("diff")
  .description("Show env var differences between files")
  .argument("<sourceEnv>", "The source env file. Commonly '.env.example'")
  .argument("<destinationEnv>", "The env file in use. Commonly '.env'")
  .action((sourceEnv, destinationEnv) => {
    const sourcePath = path.join(process.cwd(), sourceEnv);
    const destPath = path.join(process.cwd(), destinationEnv);
    const results = diff(sourcePath, destPath);

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
  });

program
  .command("sort")
  .description("")
  .argument("<sourceEnv>", "The source env file. Commonly '.env.example'")
  .action((sourceEnv) => {
    const sourcePath = path.join(process.cwd(), sourceEnv);
    sort(sourcePath);
  });

program.parse();
