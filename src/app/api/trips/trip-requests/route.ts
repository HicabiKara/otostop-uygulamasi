import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongo } from "@/lib/mongodb";
import TripRequest from "@/models/TripRequest";
import Trip from "@/models/Trip";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const { tripId } = await req.json();
    if (!tripId) {
      return NextResponse.json({ error: "TripId gerekli" }, { status: 400 });
    }
    // İlanı bul
    const trip = await Trip.findById(tripId).populate("driverId");
    if (!trip) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }
    const passengerId = session.user.id;
    const driverId = trip.driverId._id;
    
    if (driverId.toString() === passengerId) {
      return NextResponse.json(
        { error: "Kendi ilanınıza talep gönderemezsiniz." },
        { status: 400 }
      );
    }

    // Aynı yolcu daha önce talep göndermiş mi?
    const existing = await TripRequest.findOne({
      tripId,
      passengerId,
      status: { $in: ["PENDING", "APPROVED"] }, // aktif istekler
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu ilana zaten talepte bulundunuz." },
        { status: 400 }
      );
    }
    // Yeni talep oluştur
    const newRequest = await TripRequest.create({
      tripId,
      passengerId,
      driverId,
    });
    return NextResponse.json(newRequest, { status: 201 });
  } catch (err: any) {
    console.error("TripRequest POST error:", err);
    return NextResponse.json(
      { error: "Bir hata oluştu", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("tripId");
    const type = searchParams.get("type"); // "sent" | "incoming"

    await connectMongo();

    // 1) Geriye dönük uyumluluk: belirli ilana başvurmuş mu?
    if (tripId) {
      const existingRequest = await TripRequest.findOne({
        tripId,
        passengerId: session.user.id,
        status: { $in: ["PENDING", "APPROVED"] }, // aktif sayıyoruz
      });

      return NextResponse.json({
        hasRequested: !!existingRequest,
        request: existingRequest || null,
      });
    }

    // 2) Listeleme modu: type=sent | incoming
    if (!type || !["sent", "incoming"].includes(type)) {
      return NextResponse.json(
        { error: "Geçersiz veya eksik 'type'. 'sent' | 'incoming' olmalı." },
        { status: 400 }
      );
    }

    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limitRaw = parseInt(searchParams.get("limit") || "10", 10);
    const limit = Math.min(Math.max(limitRaw, 1), 50);
    const skip = (page - 1) * limit;

    const filter =
      type === "sent"
        ? { passengerId: session.user.id }
        : { driverId: session.user.id };

    const [items, total] = await Promise.all([
      TripRequest.find(filter)
        .populate("tripId", "from to date price seatsAvailable createdAt")
        .populate("passengerId", "name image gender")
        .populate("driverId", "name image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TripRequest.countDocuments(filter),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error("TripRequests GET error:", err);
    return NextResponse.json(
      { error: "Sunucu hatası", details: err.message },
      { status: 500 }
    );
  }
}



