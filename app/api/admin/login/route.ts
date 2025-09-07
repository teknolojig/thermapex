import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Geçersiz email veya şifre" },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Geçersiz email veya şifre" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "thermapex-jwt-secret-2024",
      { expiresIn: "24h" }
    )

    const response = NextResponse.json(
      { success: true, message: "Giriş başarılı" },
      { status: 200 }
    )

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu" },
      { status: 500 }
    )
  }
}