import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@thermapex.com"
  const password = "thermapex2024"
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin",
      },
    })
    
    console.log("Admin kullanıcısı oluşturuldu:")
    console.log("Email:", email)
    console.log("Şifre:", password)
    console.log("ID:", admin.id)
  } catch (error: any) {
    if (error.code === "P2002") {
      console.log("Admin kullanıcısı zaten mevcut")
    } else {
      console.error("Hata:", error)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })