import { notFound } from "next/navigation";
import products from "../../../data/products.json";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
      <img src={product.image} alt={product.title} className="rounded-2xl w-full h-auto object-cover" />
      <div>
        <div className="text-sm text-coal/60">{product.category}</div>
        <h1 className="font-poppins text-4xl font-bold">{product.title}</h1>
        <p className="mt-3 text-coal/80">{product.excerpt || product.description}</p>
        <div className="mt-4 font-semibold">
          À partir de {(product.price || product.priceFrom || 0).toLocaleString("fr-MA")} MAD
        </div>
        {(product.specs || []).length > 0 && (
          <ul className="mt-6 list-disc pl-5 space-y-1 text-coal/80">
            {product.specs.map((s) => <li key={s}>{s}</li>)}
          </ul>
        )}
        <div className="mt-8 flex gap-3">
          <a href="/contact" className="rounded-full bg-gold text-coal px-5 py-2 font-medium shadow-glow">
            Demander un devis
          </a>
          <a href="/produits" className="rounded-full border px-5 py-2">
            Retour au catalogue
          </a>
        </div>
      </div>
    </div>
  );
}


