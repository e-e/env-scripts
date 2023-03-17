#!/usr/bin/env node

const path = require("path");
const { Command } = require("commander");
const program = new Command();
const diff = require("./diff");
const diffValues = require("./diffValues");
const sort = require("./sort");
const fs = require("fs");

program
  .name("env-scripts")
  .description("CLI to some JavaScript string utilities")
  .version("0.9.0");

program
  .command("diff")
  .description("Show env var differences between files")
  .argument("<sourceEnv>", "The source env file. Commonly '.env.example'")
  .argument("<destinationEnv>", "The env file in use. Commonly '.env'")
  .action((sourceEnv, destinationEnv) => {
    const sourcePath = path.join(process.cwd(), sourceEnv);
    const destPath = path.join(process.cwd(), destinationEnv);
    const results = diff(sourcePath, destPath);

    console.log("Example:");
    console.log("------------------------");
    console.log("VARIABLE_NAME");
    console.log(`<${sourceEnv}-value>`);
    console.log(`<${destinationEnv}-value>`);
    console.log("------------------------")
    for (const result of results) {
        console.log(result.variable);
        console.log(result.sourceValue);
        console.log(result.destValue);
    }
  });

program
    .command("diff-values")
    .description("Show env variable value differences between two files")
    .argument("<sourceEnv>", "The source env file. Commonly '.env.example'")
    .argument("<destinationEnv>", "The env file in use. Commonly '.env'")
    .action((sourceEnv, destinationEnv) => {
        const sourcePath = path.join(process.cwd(), sourceEnv);
        const sourceContents = fs.readFileSync(sourcePath, { encoding: "utf-8" });
        const destPath = path.join(process.cwd(), destinationEnv);
        const destinationContents = fs.readFileSync(destPath, {
            encoding: "utf-8",
        });
        const results = diffValues(sourceContents, destinationContents);

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
