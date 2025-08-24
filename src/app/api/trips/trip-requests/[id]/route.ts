import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import TripRequest from "@/models/TripRequest";
import Trip from "@/models/Trip";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { status } = await req.json();

    const tripRequest = await TripRequest.findById(params.id).populate(
      "tripId"
    );
    if (!tripRequest) {
      return NextResponse.json({ error: "Talep bulunamadı" }, { status: 404 });
    }

    // İlan sahibinin kontrolü
    const trip: any = tripRequest.tripId;
    if (trip.driverId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Bu işlemi yapmaya yetkiniz yok" },
        { status: 403 }
      );
    }
    // Eğer zaten aynı statüye güncellenmişse boşuna tekrar yazma
    if (tripRequest.status === status) {
      return NextResponse.json({ success: true, tripRequest });
    }
    // seatsAvailable kontrolü (sadece onaylanınca düşecek)
    if (status === "APPROVED") {
      if (trip.seatsAvailable <= 0) {
        return NextResponse.json({ error: "Boş koltuk yok" }, { status: 400 });
      }
      trip.seatsAvailable -= 1;
      await trip.save();
    }
    tripRequest.status = status;
    await tripRequest.save();

    return NextResponse.json({ succes: true, tripRequest });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
