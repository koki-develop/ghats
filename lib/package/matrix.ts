import type { Expression } from "./expression";

/**
 * A build matrix is a set of different configurations of the virtual environment.
 * For example you might run a job against more than one supported version of a language, operating system, or tool.
 * Each configuration is a copy of the job that runs and reports a status.
 * You can specify a matrix by supplying an array for the configuration options.
 * For example, if the GitHub virtual environment supports Node.js versions 6, 8, and 10 you could specify an array of those versions in the matrix.
 * When you define a matrix of operating systems, you must set the required runs-on keyword to the operating system of the current job, rather than hard-coding the operating system name.
 * To access the operating system name, you can use the matrix.os context parameter to set runs-on.
 * @see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
 */
export type Matrix =
  | Expression
  | { [key: string]: Expression | Configuration[] }
  | {
      include?: Expression | { [key: string]: Expression | Configuration[] }[];
      exclude?: Expression | { [key: string]: Expression | Configuration[] }[];
    };

type Configuration =
  | string
  | number
  | boolean
  | {
      [key: string]: Configuration;
    }
  | Configuration[];
