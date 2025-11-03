import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Vérification des identifiants
    const ADMIN_USER = process.env.ADMIN_USER || "adminparidor";
    const ADMIN_PASS = process.env.ADMIN_PASS || "WF2025SuperSecure";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Générer un token simple (timestamp + hash)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: "Connexion réussie"
      });
    }

    return NextResponse.json(
      { success: false, message: "Identifiants incorrects" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erreur login admin:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}






