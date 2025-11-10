import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID manquant" },
        { status: 400 }
      );
    }

    // Lire le fichier orders.json
    const filePath = path.join(process.cwd(), "data", "orders.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const orders = JSON.parse(fileData);

    // Trouver la commande par sessionId (maintenant stocké dans le champ sessionId)
    const orderIndex = orders.findIndex(order => order.sessionId === sessionId);

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Mettre à jour le statut à "payée" (paiement confirmé)
    orders[orderIndex].status = "payée";

    // Sauvegarder dans le fichier
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Commande mise à jour",
      order: {
        id: orders[orderIndex].id,
        status: orders[orderIndex].status,
      },
    });
  } catch (error) {
    console.error("❌ Erreur mise à jour commande:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

