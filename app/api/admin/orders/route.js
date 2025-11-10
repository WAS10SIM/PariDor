import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  try {
    // Vérification basique du token (simple pour cet usage)
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Non autorisé" },
        { status: 401 }
      );
    }

    // Lire le fichier orders.json
    const filePath = path.join(process.cwd(), "data", "orders.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const orders = JSON.parse(fileData);

    // Trier par date décroissante
    const sortedOrders = orders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Formater les commandes pour l'admin
    const formattedOrders = sortedOrders.map(order => ({
      _id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone || "",
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status === "payée" ? "paid" : 
              order.status === "en attente" ? "pending" :
              order.status === "annulée" ? "cancelled" : 
              order.status === "livrée" ? "completed" : order.status,
      createdAt: order.date,
      items: order.articles || []
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
      count: formattedOrders.length,
    });
  } catch (error) {
    console.error("❌ Erreur lecture orders.json:", error);
    
    return NextResponse.json(
      { success: false, message: "Erreur serveur", error: error.message },
      { status: 500 }
    );
  }
}

// Route pour rafraîchir les commandes
export const dynamic = 'force-dynamic';

