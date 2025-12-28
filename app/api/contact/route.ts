import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail, sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurmanız gerekmektedir.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmailResult = await sendContactFormEmail({
      name,
      email,
      phone,
      message,
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin email:', adminEmailResult.error);
      return NextResponse.json(
        { error: 'Mesajınız gönderilemedi. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationResult = await sendConfirmationEmail(
      email,
      name,
      'contact'
    );

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
