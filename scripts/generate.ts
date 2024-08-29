import fs from "node:fs";
import path from "node:path";
import { input } from "@inquirer/prompts";
import { plural } from "pluralize";
import { generateFile } from "./utils";
const generate = async () => {
  // const features = await checkbox({
  //   message: "Select features",
  //   choices: [
  //     { name: "events", value: "events", checked: false },
  //     { name: "queries", value: "queries", checked: true },
  //     { name: "commands", value: "commands", checked: true },
  //   ],
  // });

  // console.log(features);
  // return;

  const moduleName = await input({
    message: "Enter module name: ",
    transformer: (val) => val.toLowerCase(),
  });

  const output = await input({
    message: "Enter output dir: ",
    default: path.join("src", "modules", plural(moduleName.toLowerCase())),
    transformer: (val) => val.toLowerCase(),
  });

  const templateDir = path.join(__dirname, "templates");
  const outputDir = path.join(__dirname, "..", output);

  const traverseTemplates = (currentDir: string, outputSubDir: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name);
      const outputFilePath = path.join(
        outputDir,
        outputSubDir,
        entry.name.replace(/__t__/g, moduleName.toLocaleLowerCase()),
      );

      if (entry.isDirectory()) {
        traverseTemplates(entryPath, path.join(outputSubDir, entry.name));
      } else {
        generateFile({ moduleName, inputFilePath: entryPath, outputFilePath });
      }
    });
  };

  traverseTemplates(templateDir, "");
};

generate();
