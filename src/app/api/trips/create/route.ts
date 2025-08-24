// app/api/trips/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      origin,
      destination,
      departureDate,
      departureTime,
      price,
      availableSeats,
      description,
      driverId,
    } = body;

    
    if (!origin || !destination || !departureDate || !departureTime || price === undefined || availableSeats === undefined) {
      return NextResponse.json({ message: "Eksik alanlar var" }, { status: 400 });
    }

    
    if (origin === destination) {
      return NextResponse.json({ message: "Kalkış ve varış aynı olamaz" }, { status: 400 });
    }

    
    const dateParts = departureDate.split("-");
    const timeParts = departureTime.split(":");
    if (dateParts.length !== 3 || timeParts.length < 2) {
      return NextResponse.json({ message: "Geçersiz tarih veya saat formatı" }, { status: 400 });
    }

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS ay 0-index
    const day = parseInt(dateParts[2], 10);
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    const departure = new Date(year, month, day, hour, minute);
    if (isNaN(departure.getTime())) {
      return NextResponse.json({ message: "Geçersiz tarih veya saat" }, { status: 400 });
    }

   
    const now = new Date();
    if (departure < now) {
      return NextResponse.json({ message: "Geçmiş bir tarih seçilemez" }, { status: 400 });
    }

    
    const seats = parseInt(String(availableSeats), 10);
    if (!Number.isInteger(seats) || seats < 1) {
      return NextResponse.json({ message: "Geçersiz koltuk sayısı" }, { status: 400 });
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ message: "Geçersiz ücret" }, { status: 400 });
    }

    // driverId kontrolü (zorunlu)
    if (!driverId) {
      return NextResponse.json({ message: "Sürücü bilgisi (driverId) eksik" }, { status: 401 });
    }

    let driverObjectId: ObjectId;
    try {
      driverObjectId = new ObjectId(driverId);
    } catch (e) {
      return NextResponse.json({ message: "Geçersiz driverId" }, { status: 400 });
    }

    // DB bağlantısı ve kullanıcı kontrolü
    const client = await MongoClient.connect(uri);
    const db = client.db();

    const user = await db.collection("users").findOne({ _id: driverObjectId });
    if (!user) {
      client.close();
      return NextResponse.json({ message: "Kayıtlı kullanıcı bulunamadı" }, { status: 404 });
    }

    const tripDoc = {
      driverId: driverObjectId,
      from: origin,
      to: destination,
      date: departure,
      seatsAvailable: seats,
      price: parsedPrice,
      notes: description || "",
      createdAt: new Date(),
    };

    const result = await db.collection("trips").insertOne(tripDoc);
    client.close();

    return NextResponse.json({ message: "İlan oluşturuldu", tripId: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("create trip error:", err);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
