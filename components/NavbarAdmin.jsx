"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RefreshCw, LogOut } from "lucide-react";

export default function NavbarAdmin({ onRefresh }) {
  const router = useRouter();

  const handleLogout = () => {
    // Supprimer le token
    localStorage.removeItem("admin_token");
    
    // Rediriger vers la page d'accueil
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5] border-b border-[#C6A34F]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Pari D'Or Admin"
              width={140}
              height={60}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          {/* Admin Title */}
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-[#1a1a1a]">
              Tableau de bord <span className="text-[#C6A34F]">Admin</span>
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#C6A34F]/10 text-[#C6A34F] hover:bg-[#C6A34F]/20 transition-all duration-300 group"
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline font-medium">Actualiser</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


