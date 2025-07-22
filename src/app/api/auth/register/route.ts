import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI!

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, password, birthDate, gender  } = body

  if (!name || !email || !password || !birthDate || !gender) {
    return NextResponse.json({ message: 'Eksik alanlar var' }, { status: 400 })
  }

  const parsedBirthDate = new Date(birthDate);
if (isNaN(parsedBirthDate.getTime())) {
  return NextResponse.json({ message: 'Geçersiz doğum tarihi' }, { status: 400 });
}

  try {
    const client = await MongoClient.connect(uri)
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      client.close()
      return NextResponse.json({ message: 'Bu e-posta ile kayıtlı kullanıcı zaten var' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({
      name,
      email,
      password:hashedPassword,
      birthDate: parsedBirthDate,
      gender,
      createdAt: new Date(),
    })

    client.close()

    return NextResponse.json({ message: 'Kayıt başarılı' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 })
  }
}