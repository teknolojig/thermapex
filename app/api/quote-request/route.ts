import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, products, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Ad, email ve telefon alanları zorunludur.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz.' },
        { status: 400 }
      );
    }

    // Phone validation (Turkish phone number)
    const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
    const cleanPhone = phone.replace(/\s/g, '').replace(/-/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Geçerli bir telefon numarası giriniz.' },
        { status: 400 }
      );
    }

    // Here you would normally:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send SMS notification
    // 4. Create a ticket in CRM

    // For now, we'll just log the request
    console.log('New Quote Request:', {
      name,
      email,
      phone,
      products,
      message,
      createdAt: new Date().toISOString()
    });

    // You could save to database if you have a Quote model
    // Example with Prisma:
    /*
    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        phone,
        products,
        message,
      }
    });
    */

    // Send email notification (example with nodemailer or resend)
    /*
    await sendEmail({
      to: 'info@baykasoglu.com',
      subject: `Yeni Teklif Talebi - ${name}`,
      html: `
        <h2>Yeni Teklif Talebi</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>İlgilenilen Ürünler:</strong> ${products}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
        <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
      `
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Teklif talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}