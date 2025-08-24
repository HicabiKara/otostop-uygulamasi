import { connectMongo } from "@/lib/mongodb";
import Trip from "@/models/Trip";

export async function GET() {
  try {
    await connectMongo();
    const trips = await Trip.find().sort({ date: 1 });
    return new Response(JSON.stringify(trips), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "İlanlar getirilemedi" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
