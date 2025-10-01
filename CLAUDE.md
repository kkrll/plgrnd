# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 playground application using TypeScript, Tailwind CSS, and React. The project serves as a testing ground for various UI components and features, with a dynamic page navigation system.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/page.tsx` - Homepage with dynamic navigation to all available pages
- `src/app/layout.tsx` - Root layout with IBM Plex Mono font
- `src/app/globals.css` - Global CSS styles with Tailwind imports

### Key Features

**Dynamic Page Discovery**: The homepage (`src/app/page.tsx`) automatically discovers and displays links to all available pages in the app directory. It filters out:
- Files/directories starting with `_` or `.`
- `api`, `layout.tsx`, `page.tsx` files
- CSS and JS files

**Page Structure**: Each feature/demo has its own directory under `src/app/` containing a `page.tsx` file.

**Styling**: Uses Tailwind CSS with custom configuration in `tailwind.config.ts`. The project uses IBM Plex Mono font loaded via next/font.

## Dependencies

### Main Dependencies
- **Next.js 14.2.4** - React framework with App Router
- **React 18** - UI library
- **@paper-design/shaders-react ^0.0.52** - Shader components library
- **recharts ^2.15.1** - Charts library

### Development Dependencies
- **TypeScript 5** - Type checking
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS 8** - CSS processing

## TypeScript Configuration

Path aliases configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

## Development Notes

- The project follows Next.js App Router conventions
- Each page is self-contained in its own directory
- Uses strict TypeScript configuration
- No test framework currently configured
- Standard Next.js build and deployment process