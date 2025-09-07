import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const { status } = await request.json()

    const quote = await prisma.quote.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(
      { success: true, quote },
      { status: 200 }
    )
  } catch (error) {
    console.error("Quote update error:", error)
    return NextResponse.json(
      { success: false, message: "Güncelleme başarısız" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    await prisma.quote.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: "Teklif silindi" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Quote delete error:", error)
    return NextResponse.json(
      { success: false, message: "Silme başarısız" },
      { status: 500 }
    )
  }
}