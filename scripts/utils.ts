import fs from "node:fs";
import path from "node:path";
import { plural } from "pluralize";

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const readTemplate = (filePath: string, moduleName: string) => {
  return fs
    .readFileSync(filePath, "utf8")
    .replace(/__t__/g, moduleName.toLocaleLowerCase())
    .replace(/__T__/g, capitalize(moduleName))
    .replace(/__s__/g, plural(moduleName))
    .replace(/__S__/g, capitalize(plural(moduleName)));
};

export const generateFile = ({
  moduleName,
  inputFilePath,
  outputFilePath,
}: { moduleName: string; inputFilePath: string; outputFilePath: string }) => {
  const content = readTemplate(inputFilePath, moduleName);
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  fs.writeFileSync(outputFilePath, content);
};
