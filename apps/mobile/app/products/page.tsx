"use client";

import * as React from "react";


export default function ProductsPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<import("@shared/types").Product[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { fetchProducts } = await import("@shared/services");
        const data = await fetchProducts(12);
        if (!cancelled) setProducts(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold mb-4">Products</h1>
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold mb-4">Products</h1>
        <p className="text-sm text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <ul className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <li key={p.id} className="rounded-lg border overflow-hidden">
            {p.thumbnail ? (
              // Use regular <img> to keep static export simple
              <img src={p.thumbnail} alt={p.title} className="aspect-video object-cover w-full" />
            ) : null}
            <div className="p-3">
              <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-1">${p.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}