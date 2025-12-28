import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteRequestEmail, sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, productName } = body;

    if (!name || !email || !phone || !productName) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurunuz.' },
        { status: 400 }
      );
    }

    // Set default quantity if not provided (for header form submissions)
    const quantity = body.quantity || 'Talep Edilecek';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmailResult = await sendQuoteRequestEmail({
      name,
      email,
      phone,
      company: body.company,
      productName,
      quantity,
      message: body.message,
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send quote request email:', adminEmailResult.error);
      return NextResponse.json(
        { error: 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationResult = await sendConfirmationEmail(
      email,
      name,
      'quote'
    );

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Teklif talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    });
  } catch (error) {
    console.error('Quote request submission error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
