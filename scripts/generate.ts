import fs from "node:fs";
import path from "node:path";
import { confirm, input } from "@inquirer/prompts";
import { plural } from "pluralize";

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

class TemplateGenerator {
  private moduleName: string = "todo";
  private includeTest: boolean = true;
  private includeApiController: boolean = true;
  private includeCmdController: boolean = true;
  private output: string;
  private templateDir: string;
  private outputDir: string;

  async generate() {
    await this.readInput();

    this.traverseTemplates(this.templateDir, "");
  }

  private async readInput() {
    this.moduleName = await input({
      message: "Enter module name: ",
      default: "todo",
      transformer: (val) => val.toLowerCase(),
    });

    this.includeTest = await confirm({
      message: "Include test?",
      default: true,
    });

    this.includeApiController = await confirm({
      message: "Include api controller",
      default: true,
    });

    this.includeCmdController = await confirm({
      message: "Include cmd controller",
      default: true,
    });

    this.output = await input({
      message: "Enter output dir: ",
      default: path.join(
        "src",
        "modules",
        plural(this.moduleName.toLowerCase()),
      ),
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

    if (!filePath.includes("__t__.module.ts")) {
      return lines.join("\n");
    }

    // Handle __t__.module.ts
    return lines
      .filter((line) => {
        // Remove comment
        if (line.includes("/** comment */")) {
          return false;
        }
        // Remove CMD controller
        if (!this.includeCmdController && line.includes("CmdController")) {
          return false;
        }
        // Remove API controller
        if (
          !this.includeApiController &&
          line.includes(`${capitalize(this.moduleName)}Controller`)
        ) {
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

      if (
        !this.includeCmdController &&
        entry.name.includes("__t__-cmd.controller")
      ) {
        return;
      }

      if (
        !this.includeApiController &&
        entry.name.includes("__t__.controller")
      ) {
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
        if (entry.parentPath.includes("__test__")) {
          const testFilePath = path.join(
            __dirname,
            "..",
            "test",
            "modules",
            plural(this.moduleName.toLocaleLowerCase()),
            outputSubDir.replace("__test__", ""),
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
