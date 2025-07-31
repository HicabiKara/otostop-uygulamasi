import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    await connectMongo();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Kullanıcıya özel public_id belirle
    const publicId = `profile_images/user_${session.user.id}_profile`;

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: publicId,
            overwrite: true,
            folder: "profile_images",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Kullanıcı modelinde resmi güncelle
    await User.findByIdAndUpdate(
      session.user.id,
      { image: result.secure_url },
      { new: true }
    );

    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}
