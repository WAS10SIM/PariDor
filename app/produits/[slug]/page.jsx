import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "../../../data/products.json";
import variants from "../../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../../lib/mergeProducts";

export const revalidate = 3600; // 1 heure

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: "Produit non trouvé | Pari Dor",
    };
  }

  return {
    title: `${product.title} | Pari Dor`,
    description: product.excerpt || product.description || `Découvrez ${product.title} - Meuble haut de gamme fabriqué au Maroc.`,
    openGraph: {
      title: product.title,
      description: product.excerpt || product.description,
      images: [{ url: product.image, width: 1200, height: 630, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const enriched = enrichProductsWithVariants([product], variants);
  const enrichedProduct = enriched[0] || product;
  const displayImage = enrichedProduct?.variants?.[0]?.image || product.image;
  const displayPrice = enrichedProduct?.variants?.[0]?.price ?? enrichedProduct?.basePrice ?? product.price;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={displayImage}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="text-sm font-medium text-[#C7A451] uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="mt-2 text-4xl md:text-5xl font-playfair font-bold text-coal">
                {product.title}
              </h1>
            </div>

            <p className="text-lg text-coal/70 leading-relaxed">
              {product.excerpt || product.description || "Pièce d'exception conçue avec passion et savoir-faire artisanal marocain."}
            </p>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[#C7A451]">
                {displayPrice.toLocaleString("fr-MA")} MAD
              </span>
            </div>

            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-coal mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-coal/70">
                      <span className="w-2 h-2 rounded-full bg-[#C7A451]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="btn-luxury text-center"
              >
                Demander un devis
              </Link>
              <Link
                href="/produits"
                className="btn-luxury-outline text-center"
              >
                Retour au catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
