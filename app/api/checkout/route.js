import { NextResponse } from "next/server";
import Stripe from "stripe";
import { promises as fs } from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });

export async function POST(req) {
  try {
    console.log('📥 Checkout API: reçu requête POST');
    const { items, customerInfo } = await req.json();
    console.log('📦 Items:', items?.length, 'items');
    console.log('👤 CustomerInfo:', customerInfo);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY manquante');
      return NextResponse.json({ error: "Configuration Stripe manquante" }, { status: 500 });
    }

    const host = req.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const BASE_URL = `${protocol}://${host}`;

    const line_items = items.map((it) => {
      const imageUrl = it.image ? (it.image.startsWith('http') ? it.image : `${BASE_URL}${it.image}`) : null;
      return {
        quantity: it.quantity,
        price_data: {
          currency: "mad",
          unit_amount: Math.round((it.price || 0) * 100),
          product_data: {
            name: `${it.name}${it.options?.taille ? ` (${it.options.taille})` : ""}${it.options?.color ? ` - ${it.options.color}` : ""}`.trim(),
            images: imageUrl ? [imageUrl] : [],
          },
        },
      };
    });

    console.log('🛒 Line items créés:', JSON.stringify(line_items, null, 2));

    // Calculer le montant total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Créer la session Stripe
    console.log('🔄 Création session Stripe...');
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerInfo?.email,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      metadata: {
        customerName: customerInfo?.name || "Client",
        customerPhone: customerInfo?.phone || "",
      },
    });

    // Enregistrer la commande dans orders.json (statut "en attente")
    try {
      const filePath = path.join(process.cwd(), "data", "orders.json");
      const fileData = await fs.readFile(filePath, "utf8");
      const orders = JSON.parse(fileData);

      // Créer une nouvelle commande
      const newOrder = {
        id: `CMD-${Date.now()}`, // Format demandé: CMD-timestamp
        sessionId: session.id, // Garder la session Stripe pour référence
        customerName: customerInfo?.name || "Client",
        customerEmail: customerInfo?.email || "client@paridor.com",
        customerPhone: customerInfo?.phone || "",
        customerAddress: customerInfo?.address || "",
        totalAmount: totalAmount,
        paymentMethod: "carte", // "carte" au lieu de "stripe"
        status: "en attente",
        date: new Date().toISOString(),
        articles: items.map((it) => ({
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          size: it.options?.taille || "",
          color: it.options?.color || "",
        })),
      };

      // Ajouter au début du tableau
      orders.unshift(newOrder);

      // Sauvegarder dans le fichier
      await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");

      console.log("✅ Commande Stripe créée (en attente) dans orders.json - Session:", session.id);
    } catch (fileError) {
      // Ne pas bloquer le paiement si l'écriture échoue
      console.error("⚠️ Erreur sauvegarde orders.json (non-bloquante):", fileError.message);
    }

    console.log('✅ Session Stripe créée:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Checkout error:", error.message);
    console.error("❌ Stack:", error.stack);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
