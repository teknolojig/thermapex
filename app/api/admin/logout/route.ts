import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Çıkış yapıldı" },
    { status: 200 }
  )

  response.cookies.delete("admin-token")

  return response
}