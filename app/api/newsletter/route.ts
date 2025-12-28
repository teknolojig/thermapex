import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'E-posta adresi gereklidir' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletters.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten kayıtlı' },
          { status: 400 }
        );
      } else {
        // Reactivate inactive subscription
        await prisma.newsletters.update({
          where: { email: email.toLowerCase() },
          data: { active: true, updatedAt: new Date() },
        });

        return NextResponse.json({
          success: true,
          message: 'E-bültene başarıyla yeniden abone oldunuz!',
        });
      }
    }

    // Create new subscriber
    await prisma.newsletters.create({
      data: {
        id: `news-${Date.now()}`,
        email: email.toLowerCase(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'E-bültene başarıyla abone oldunuz!',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
