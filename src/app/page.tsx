import Link from "next/link";
import fs from "fs";
import path from "path";

function getPages(dir: string): { url: string; name: string }[] {
  const pagesDir = path.join(process.cwd(), "src", "app");
  const entries = fs.readdirSync(path.join(pagesDir, dir), {
    withFileTypes: true,
  });

  return entries
    .filter((entry) => {
      // Skip files and directories that shouldn't be routes
      if (
        entry.name.startsWith("_") ||
        entry.name.startsWith(".") ||
        entry.name === "api" ||
        entry.name === "layout.tsx" ||
        entry.name === "page.tsx" ||
        entry.name.endsWith(".css") ||
        entry.name.endsWith(".js")
      ) {
        return false;
      }
      return entry.isDirectory() || entry.name === "page.tsx";
    })
    .map((entry) => {
      const urlPath = path.join(
        dir,
        entry.name === "page.tsx" ? "" : entry.name
      );
      // Convert directory name to display name
      const displayName =
        entry.name === "page.tsx"
          ? "Home"
          : entry.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

      return {
        url: "/" + urlPath.replace(/\\/g, "/"),
        name: displayName,
      };
    })
    .filter((page) => page.url !== "/page"); // Remove root page.tsx
}

export default function Home() {
  const pages = getPages("");

  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-[30%] gap-4">
      <h1 className="text-4xl font-bold mb-8">PLAYGROUND</h1>

      {pages.map((page, index) => (
        <Link key={index} href={page.url} className="underline">
          {page.name}
        </Link>
      ))}
    </main>
  );
}
