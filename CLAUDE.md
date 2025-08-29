# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

ghats is a TypeScript library for defining GitHub Actions workflows using TypeScript instead of YAML. It allows developers to write workflows with type safety and autocompletion, then compile them to standard GitHub Actions YAML files.

## Common Commands

### Development
- `bun install` - Install dependencies
- `bun run lint` - Run Biome linter with error-on-warnings flag
- `bun run fmt` - Format code with Biome (auto-fix mode)
- `bun test` - Run tests
- `bun test --coverage` - Run tests with coverage reporting

### Building
- `bun run build:package` - Build the package (runs tasks/build.ts)
- `bun run gha:build` - Build GitHub Actions workflows from TypeScript files

### ghats CLI Commands
- `ghats install [actions...]` or `bun run gha:install` - Install and generate type definitions for GitHub Actions
- `ghats build [workflows...]` or `bun run gha:build` - Build workflow YAML files from TypeScript
- `ghats cache clear` - Clear the action cache

### Testing Workflows
- When testing workflow generation, create an example TypeScript workflow and use `bun run ./lib/cli/index.ts build` to compile it

## High-Level Architecture

### Core Library Structure (`lib/`)
- **package/**: Core workflow definition classes
  - `workflow.ts`: Main Workflow class for defining GitHub Actions workflows
  - `job.ts`: Job class supporting both normal jobs and reusable workflow calls
  - `step.ts`, `on.ts`, `permissions.ts`, etc.: Type definitions for workflow components
  
- **internal/**: JSON serialization and transformation logic
  - Each component has a corresponding internal module that handles conversion to YAML-compatible JSON
  
- **cli/**: Command-line interface implementation
  - `commands/build/`: Compiles TypeScript workflows to YAML
  - `commands/install/`: Fetches action schemas and generates TypeScript type definitions
  - Stores action metadata in `.github/workflows/actions.json` and `actions-lock.json`

### Key Design Patterns

1. **Builder Pattern**: Jobs and workflows use method chaining for configuration
   ```typescript
   new Job("test", { runsOn: "ubuntu-latest" })
     .uses("actions/checkout@v4")
     .run("npm test")
   ```

2. **Type-Safe Actions**: The `action()` function provides typed inputs for installed actions
   - Action schemas are fetched from GitHub and stored locally
   - TypeScript definitions are generated in `.github/workflows/actions.d.ts`

3. **File Conventions**: 
   - Workflow TypeScript files in `.github/workflows/*.ts` are compiled to `*.yml`
   - Files starting with `_` (e.g., `_helpers.ts`) are ignored during build

### Build System

The project uses Bun as its runtime and build tool:
- `tasks/build.ts`: Custom build script that:
  - Generates TypeScript declarations using oxc-transform
  - Builds CLI entry point with Node target
  - Builds library with external packages

### Code Quality

- **Linter**: Biome with strict configuration (must pass with --error-on-warnings)
- **Formatter**: Biome with 2-space indentation and double quotes
- **TypeScript**: Strict mode enabled with ESNext target
- **Pre-commit**: Husky hooks configured (run with `husky` prepare script)