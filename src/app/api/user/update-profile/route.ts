import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });
  }

  const email = session.user.email;
  const body = await req.json();
  const { name, birthDate, email: newEmail } = body;

  if (!name || !birthDate) {
    return NextResponse.json({ message: "Ad ve doğum tarihi zorunludur" }, { status: 400 });
  }
  if (newEmail && newEmail !== email) {
  const existingUser = await User.findOne({ email: newEmail });
  if (existingUser) {
    return NextResponse.json({ message: "Bu e-posta adresi zaten kullanımda." }, { status: 409 });
  }
}

  const parsedBirthDate = new Date(birthDate);
  if (isNaN(parsedBirthDate.getTime())) {
    return NextResponse.json({ message: "Geçersiz doğum tarihi" }, { status: 400 });
  }

  try {
    await connectMongo();

    const updatedUser = await User.findOneAndUpdate(
  { email }, // eski email ile bul
  {
    name,
    birthDate: parsedBirthDate,
    email: newEmail,
  },
  { new: true }
).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profil güncellendi", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}