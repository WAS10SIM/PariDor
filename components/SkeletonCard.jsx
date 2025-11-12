"use client";

/**
 * Skeleton élégant avec effet shimmer doré pour les cartes produits
 * Utilisé pendant le chargement des sections lourdes
 */
export default function SkeletonCard() {
  return (
    <div className="h-full flex animate-pulse">
      <div className="flex flex-col justify-between h-full w-full bg-white rounded-2xl shadow-sm p-5">
        {/* Image Skeleton */}
        <div className="relative w-full h-[280px] overflow-hidden rounded-xl mb-3 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        
        {/* Content Skeleton */}
        <div className="flex flex-col gap-2 flex-grow">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
          
          {/* Description */}
          <div className="h-4 bg-gray-100 rounded w-full mb-1" />
          <div className="h-4 bg-gray-100 rounded w-5/6 mb-3" />
          
          {/* Price */}
          <div className="h-6 bg-gradient-to-r from-[#C7A451]/20 to-[#D4B975]/20 rounded w-24 mb-3" />
          
          {/* Color variants */}
          <div className="flex gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
        </div>
        
        {/* Actions Skeleton */}
        <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
          <div className="h-12 flex-1 bg-gray-200 rounded-2xl" />
          <div className="h-12 flex-1 bg-gradient-to-r from-[#C7A451]/30 to-[#D4B975]/30 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

