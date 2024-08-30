import fs from "node:fs";
import path from "node:path";
import { confirm, input } from "@inquirer/prompts";
import { plural } from "pluralize";

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

class TemplateGenerator {
  private moduleName: string = "todo";
  private includeTest: boolean = true;
  private includePattern: boolean = true;
  private output: string;
  private templateDir: string;
  private outputDir: string;

  async generate() {
    await this.readInput();

    this.traverseTemplates(this.templateDir, "");
  }

  private async readInput() {
    const moduleName = await input({
      message: "Enter module name: ",
      default: "todo",
      transformer: (val) => val.toLowerCase(),
    });

    this.includeTest = await confirm({
      message: "Include test?",
      default: true,
    });

    this.includePattern = await confirm({
      message: "Include pattern",
      default: true,
    });

    this.output = await input({
      message: "Enter output dir: ",
      default: path.join("src", "modules", plural(moduleName.toLowerCase())),
      transformer: (val) => val.toLowerCase(),
    });

    this.templateDir = path.join(__dirname, "templates");

    this.outputDir = path.join(__dirname, "..", this.output);
  }

  readTemplate(filePath: string) {
    const lines = fs
      .readFileSync(filePath, "utf8")
      .replace(/__t__/g, this.moduleName.toLocaleLowerCase())
      .replace(/__T__/g, capitalize(this.moduleName))
      .replace(/__s__/g, plural(this.moduleName))
      .replace(/__S__/g, capitalize(plural(this.moduleName)))
      .split("\n");

    return lines
      .filter((line) => {
        if (line.includes("/** comment */")) {
          return false;
        }
        if (!this.includePattern && line.includes("CmdController")) {
          return false;
        }
        return true;
      })
      .join("\n");
  }

  generateFile(inputFilePath: string, outputFilePath: string) {
    const content = this.readTemplate(inputFilePath);
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, content);
  }

  traverseTemplates(currentDir: string, outputSubDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name);

      if (entry.name.includes("__test__") && !this.includeTest) {
        return;
      }

      if (entry.name.includes("-cmd.controller.") && !this.includePattern) {
        return;
      }

      const outputFilePath = path.join(
        this.outputDir,
        outputSubDir,
        entry.name.replace(/__t__/g, this.moduleName.toLocaleLowerCase()),
      );

      if (entry.isDirectory()) {
        this.traverseTemplates(entryPath, path.join(outputSubDir, entry.name));
      } else {
        if (entry.name.includes(".test.ts")) {
          const testFilePath = path.join(
            __dirname,
            "..",
            "test",
            "modules",
            plural(this.moduleName.toLocaleLowerCase()),
            entry.name.replace(/__t__/g, this.moduleName.toLocaleLowerCase()),
          );
          this.generateFile(entryPath, testFilePath);
        } else {
          this.generateFile(entryPath, outputFilePath);
        }
      }
    });
  }
}

const generator = new TemplateGenerator();

void generator.generate();
