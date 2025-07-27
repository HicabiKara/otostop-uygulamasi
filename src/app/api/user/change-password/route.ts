import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { currentPassword, newPassword, confirmNewPassword } = await req.json();

  if (newPassword !== confirmNewPassword) {
    return NextResponse.json({ message: "Yeni şifreler eşleşmiyor." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
    }

     const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Mevcut şifre yanlış." }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save()

    return NextResponse.json({ message: "Şifre başarıyla güncellendi." }, { status: 200 });
  }

  catch(error){
    console.error("Şifre güncelleme hatası:", error);
    return NextResponse.json({ message: "Sunucu hatası." }, { status: 500 });
  }
}