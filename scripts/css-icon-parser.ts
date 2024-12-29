//"./node_modules/@phosphor-icons/web/src/regular/style.css",
//
//
//
// Types for our icon data structures
interface IconData {
  name: string;
  content: string;
}

interface GroupedIcons {
  [key: string]: {
    [key: string]: string;
  };
}

interface ParseResult {
  all: Record<string, string>;
  grouped: GroupedIcons;
  count: number;
  countByLetter: Record<string, number>;
}

interface ParserOptions {
  groupByLetter?: boolean;
  includeStats?: boolean;
  outputFormat?: "json" | "css" | "typescript";
}

class IconParser {
  private readonly iconRegex =
    /\.ph\.ph-([\w-]+):before\s*{\s*content:\s*"\\([^"]+)"/g;

  constructor(private readonly options: ParserOptions = {}) {
    this.options = {
      groupByLetter: true,
      includeStats: true,
      outputFormat: "typescript",
      ...options,
    };
  }

  /**
   * Parse a CSS file containing icon definitions
   * @param filePath Path to the CSS file
   * @returns ParseResult containing parsed icon data
   */
  async parseFile(filePath: string): Promise<ParseResult> {
    try {
      // Read file using Bun's built-in file system API
      const file = Bun.file(filePath);
      const fileContent = await file.text();

      return this.parseContent(fileContent);
    } catch (error) {
      throw new Error(
        `Failed to parse file ${filePath}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Parse CSS content directly
   * @param content CSS content as string
   * @returns ParseResult containing parsed icon data
   */
  parseContent(content: string): ParseResult {
    const icons: Record<string, string> = {};
    let match: RegExpExecArray | null;

    // Extract all icon definitions
    while ((match = this.iconRegex.exec(content)) !== null) {
      const [_, iconName, hexValue] = match;
      // Add the \u prefix to the hex value
      icons[iconName] = `\\u${hexValue}`;
    }

    // Initialize result object
    const result: ParseResult = {
      all: icons,
      grouped: {},
      count: Object.keys(icons).length,
      countByLetter: {},
    };

    // Group icons by first letter if requested
    if (this.options.groupByLetter) {
      result.grouped = this.groupIconsByLetter(icons);
      result.countByLetter = this.calculateCountsByLetter(result.grouped);
    }

    return result;
  }

  /**
   * Group icons by their first letter
   * @param icons Flat object of icon definitions
   * @returns Icons grouped by first letter
   */
  private groupIconsByLetter(icons: Record<string, string>): GroupedIcons {
    const grouped: GroupedIcons = {};

    Object.entries(icons).forEach(([name, value]) => {
      const firstLetter = name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = {};
      }
      grouped[firstLetter][name] = value;
    });

    return grouped;
  }

  /**
   * Calculate number of icons per letter
   * @param grouped Grouped icons object
   * @returns Object with counts per letter
   */
  private calculateCountsByLetter(
    grouped: GroupedIcons,
  ): Record<string, number> {
    return Object.fromEntries(
      Object.entries(grouped).map(([letter, icons]) => [
        letter,
        Object.keys(icons).length,
      ]),
    );
  }

  /**
   * Export the parsed data in various formats
   * @param data ParseResult to export
   * @returns Formatted string in requested format
   */
  exportData(data: ParseResult): string {
    switch (this.options.outputFormat) {
      case "css":
        return this.exportAsCSS(data.all);
      case "typescript":
        return this.exportAsTypeScript(data.all);
      case "json":
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  /**
   * Export icons as CSS classes
   * @param icons Icon definitions
   * @returns CSS string
   */
  private exportAsCSS(icons: Record<string, string>): string {
    return Object.entries(icons)
      .map(
        ([name, content]) => `.ph.ph-${name}:before { content: "${content}"; }`,
      )
      .join("\n");
  }

  /**
   * Export icons as TypeScript definitions
   * @param icons Icon definitions
   * @returns TypeScript string
   */
  private exportAsTypeScript(icons: Record<string, string>): string {
    const iconNames = Object.keys(icons).sort();
    const enumContent = iconNames
      .map((name) => `  "${name}" = "${icons[name]}"`)
      .join(",\n");

    return (
      `export enum PhosphorIcons {\n${enumContent}\n}\n\n` +
      `export type PhosphorIconName = keyof typeof PhosphorIcons;\n`
    );
  }
}

// Example usage:
const main = async () => {
  try {
    const parser = new IconParser({
      groupByLetter: true,
      includeStats: true,
      outputFormat: "typescript",
    });

    //"./node_modules/@phosphor-icons/web/src/regular/style.css",
    const result = await parser.parseFile(
      "./node_modules/@phosphor-icons/web/src/regular/style.css",
    );

    // Log some statistics
    console.log(`Total icons found: ${result.count}`);
    console.log("Icons per letter:", result.countByLetter);

    // Export the data
    const output = parser.exportData(result);
    await Bun.write("phosphor-icons.ts", output);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    process.exit(1);
  }
};

// Only run if this is the main module
if (import.meta.main) {
  main();
}

export { IconParser, type IconData, type ParseResult, type ParserOptions };
