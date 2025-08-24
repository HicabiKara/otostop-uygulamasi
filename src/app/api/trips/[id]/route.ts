import { connectMongo } from "@/lib/mongodb";
import Trip from "@/models/Trip";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const trip = await Trip.findById(params.id).populate(
      "driverId",
      "name birthDate gender image"
    );

    if (!trip) {
      return new Response(JSON.stringify({ message: "İlan bulunamadı" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Bir hata oluştu" }), {
      status: 500,
    });
  }
}
