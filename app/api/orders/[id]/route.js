import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Vérifier que le statut est valide
    const validStatuses = ["en attente", "payée", "livrée", "annulée"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Statut invalide" },
        { status: 400 }
      );
    }

    // Lire le fichier orders.json
    const filePath = path.join(process.cwd(), "data", "orders.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const orders = JSON.parse(fileData);

    // Trouver et mettre à jour la commande
    const orderIndex = orders.findIndex(order => order.id === id);

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Mettre à jour le statut
    orders[orderIndex].status = status;

    // Sauvegarder dans le fichier
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Statut mis à jour",
      order: {
        id: orders[orderIndex].id,
        status: orders[orderIndex].status,
      },
    });
  } catch (error) {
    console.error("❌ Erreur mise à jour statut:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur", error: error.message },
      { status: 500 }
    );
  }
}

