import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName: string;
  quantity: string;
  message?: string;
}

/**
 * Send contact form email to admin
 */
export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Yeni İletişim Formu - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C87941; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #C87941; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Yeni İletişim Formu Mesajı</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Ad Soyad:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">E-posta:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Mesaj:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Bu mesaj Baykasoğlu web sitesi iletişim formundan gönderilmiştir.</p>
              <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, error };
  }
}

/**
 * Send quote request email to admin
 */
export async function sendQuoteRequestEmail(data: QuoteFormData) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Yeni Teklif Talebi - ${data.productName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C87941; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #C87941; }
            .value { margin-top: 5px; }
            .highlight { background-color: #fff3e0; padding: 10px; border-left: 4px solid #C87941; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Yeni Teklif Talebi</h2>
            </div>
            <div class="content">
              <div class="highlight">
                <div class="label">Ürün:</div>
                <div class="value" style="font-size: 18px; font-weight: bold;">${data.productName}</div>
              </div>
              <div class="field">
                <div class="label">Miktar:</div>
                <div class="value">${data.quantity}</div>
              </div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <div class="field">
                <div class="label">Ad Soyad:</div>
                <div class="value">${data.name}</div>
              </div>
              ${data.company ? `
              <div class="field">
                <div class="label">Firma:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">E-posta:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              ${data.message ? `
              <div class="field">
                <div class="label">Ek Not:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Bu mesaj Baykasoğlu web sitesi teklif alma formundan gönderilmiştir.</p>
              <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending quote request email:', error);
    return { success: false, error };
  }
}

/**
 * Send confirmation email to user
 */
export async function sendConfirmationEmail(
  recipientEmail: string,
  recipientName: string,
  type: 'contact' | 'quote'
) {
  try {
    const subject = type === 'contact'
      ? 'Mesajınız Alındı - Baykasoğlu'
      : 'Teklif Talebiniz Alındı - Baykasoğlu';

    const message = type === 'contact'
      ? 'İletişim formundan gönderdiğiniz mesajınızı aldık. En kısa sürede size geri dönüş yapacağız.'
      : 'Teklif talebinizi aldık. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.';

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: recipientEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C87941; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .icon { font-size: 48px; text-align: center; margin-bottom: 20px; }
            .message { text-align: center; font-size: 16px; margin-bottom: 20px; }
            .contact-info { background-color: white; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Baykasoğlu Bakır</h2>
            </div>
            <div class="content">
              <div class="icon">✅</div>
              <div class="message">
                <p>Merhaba <strong>${recipientName}</strong>,</p>
                <p>${message}</p>
              </div>
              <div class="contact-info">
                <p style="margin: 5px 0;"><strong>İletişim Bilgilerimiz:</strong></p>
                <p style="margin: 5px 0;">📞 Telefon: <a href="tel:+902128759557">0212 875 95 57</a></p>
                <p style="margin: 5px 0;">📧 E-posta: <a href="mailto:f.tur@teknolojig.com">f.tur@teknolojig.com</a></p>
                <p style="margin: 5px 0;">📍 Adres: Adnan Kahveci Mah. Büyükdere Cad. Şirin Sanayi Sitesi, B Blok No:22 F/7, 34528 Beylikdüzü / İSTANBUL</p>
              </div>
            </div>
            <div class="footer">
              <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
              <p>&copy; ${new Date().getFullYear()} Baykasoğlu Bakır. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}

export default transporter;
