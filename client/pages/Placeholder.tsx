import Layout from "@/components/layout/Layout";

import type { ReactNode } from "react";

export default function Placeholder({ title }: { title: string }) {
  return (
    <Layout>
      <section className="container py-16">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground max-w-prose">
          This page is ready to be designed next. Tell me what to show here
          (content, sections, or a Figma link) and I will complete it.
        </p>
      </section>
    </Layout>
  );
}
