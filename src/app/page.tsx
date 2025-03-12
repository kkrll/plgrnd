import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const pages: { url: string; name: string }[] = [
    { url: "/graph", name: "Graph" },
    { url: "/pricing", name: "Pricing" },
    { url: "/chat", name: "Chat" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-[30%] gap-4">
      <h1 className="text-4xl font-bold mb-8">PLAYGROUND</h1>
      {pages.map((page) => {
        return (
          <Link href={page.url} className="underline">
            {page.name}
          </Link>
        );
      })}
    </main>
  );
}
