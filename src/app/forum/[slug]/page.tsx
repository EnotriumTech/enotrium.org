import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-space-grotesk)]">
      <Navbar />

      <section className="pt-28 px-6 lg:px-16 max-w-[1400px] mx-auto pb-24">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/forum"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Forum
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-3 mb-8">
          <div className="h-px w-full bg-foreground/30" />
          <div className="h-px w-full bg-foreground/10" />
        </div>

        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {post.date} — {post.author}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05]">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="h-px w-full bg-foreground/30 mb-14" />

        {/* Body */}
        <div className="max-w-3xl space-y-7">
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-base sm:text-lg font-light leading-relaxed text-foreground/85"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
