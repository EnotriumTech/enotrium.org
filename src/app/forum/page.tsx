import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { posts } from "./posts";

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-space-grotesk)]">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="space-y-3">
          <div className="h-px w-full bg-foreground/30" />
          <div className="h-px w-full bg-foreground/10" />
        </div>
        <div className="pt-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
            Forum
          </h1>
          <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">
            Written by Enotrium
          </p>
        </div>
        <div className="mt-8 h-px w-full bg-foreground/20" />
      </section>

      {/* Post list */}
      <section className="px-6 lg:px-16 max-w-[1400px] mx-auto pb-24">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/forum/${post.slug}`}
            target="_self"
            className={`group flex items-start justify-between gap-8 py-10 ${
              i < posts.length - 1 ? "border-b border-foreground/10" : ""
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 flex-1">
              <div className="space-y-1 pt-1">
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  {post.date}
                </p>
                <p className="text-xs text-muted-foreground">{post.author}</p>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-2 group-hover:opacity-60 transition-opacity">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}
