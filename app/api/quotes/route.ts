import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"

const quoteSchema = z.object({
  fullName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  company: z.string().optional(),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
  productIds: z.array(z.string()).min(1, "En az bir ürün seçmelisiniz"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = quoteSchema.parse(body)
    
    const quote = await prisma.quote.create({
      data: {
        fullName: validatedData.fullName,
        company: validatedData.company || "",
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        productIds: validatedData.productIds.join(","),
        status: "pending",
      },
    })

    return NextResponse.json(
      { success: true, message: "Teklif talebiniz başarıyla alındı", id: quote.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Quote creation error:", error)
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ success: true, quotes }, { status: 200 })
  } catch (error) {
    console.error("Quotes fetch error:", error)
    return NextResponse.json(
      { success: false, message: "Teklifler yüklenirken bir hata oluştu." },
      { status: 500 }
    )
  }
}