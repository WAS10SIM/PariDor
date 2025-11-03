export function enrichProductsWithVariants(baseProducts, variantsList) {
  const bySlug = new Map(variantsList.map((v) => [v.slug, v]));
  return baseProducts.map((p) => {
    const slug = p.slug || p.id;
    const v = bySlug.get(slug);
    if (!v) return p;
    const variantImages = (v.colors || []).map((c) => c.image).filter(Boolean);
    return {
      ...p,
      basePrice: v.basePrice ?? p.price ?? p.priceFrom,
      images: variantImages.length ? variantImages : p.images || (p.image ? [p.image] : []),
      image: variantImages[0] || p.image,
      variants: v.colors,
    };
  });
}



