// const commandLineArgs = require("command-line-args");
//
// /* first - parse the main command name */
// let mainDefinitions = [{ name: "name", defaultOption: true }];
// const mainCommand = commandLineArgs(mainDefinitions, {
//   stopAtFirstUnknown: true,
// });
// let argv = mainCommand._unknown || [];
//
// const getOptionsAndSubCommand = () => {
//   const runDefinitions = [
//     { name: "detached", alias: "d", type: Boolean },
//     { name: "target", defaultOption: true },
//   ];
//   const runOptions = commandLineArgs(runDefinitions, {
//     argv,
//     stopAtFirstUnknown: true,
//   });
//   argv = runOptions._unknown || [];
//
//   console.log("\nrunOptions\n==========");
//   console.log(runOptions);
//
//   /* third - parse the sub-command  */
//   const subCommandDefinitions = [{ name: "name", defaultOption: true }];
//   const subCommand = commandLineArgs(subCommandDefinitions, {
//     argv,
//     stopAtFirstUnknown: true,
//   });
//
//   console.log("\nsubCommand\n==========");
//   console.log(subCommand);
//
//   return {
//     subCommand,
//     options: runOptions,
//   };
// };
//
// console.log("mainCommand\n===========");
// console.log(mainCommand);
//
// switch (mainCommand.name) {
//   case "diff":
//     console.log("running diff");
//     const { options: diffOptions, subCommand: diffSubCommand } =
//       getOptionsAndSubCommand();
//     console.log(diffOptions, diffSubCommand);
//
//     break;
//   case "sort":
//     console.log("running sort");
//     const { options: sortOptions, subCommand: sortSubCommand } =
//       getOptionsAndSubCommand();
//     console.log(sortOptions, sortSubCommand);
//     break;
//   default:
//     console.log("unknown command");
//     break;
// }

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
