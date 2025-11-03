import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F3] px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#C6A34F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-white font-semibold hover:scale-105 transition-transform duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}





