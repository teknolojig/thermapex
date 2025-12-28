# Email Configuration - Baykasoğlu

## Overview
Complete email system setup for contact form and quote request submissions with admin notifications and user confirmations.

## Environment Variables (.env)

```env
# Email Configuration (Yandex SMTP)
SMTP_HOST=smtp.yandex.com.tr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@baykasoglu.com
SMTP_PASSWORD=your-password-here
SMTP_FROM_NAME=Baykasoğlu
SMTP_FROM_EMAIL=noreply@baykasoglu.com
ADMIN_EMAIL=f.tur@teknolojig.com
```

**IMPORTANT**: Replace `your-password-here` with the actual password for the noreply@baykasoglu.com email account.

## Components Created

### 1. Email Service (`lib/email.ts`)
- `sendContactFormEmail()` - Sends contact form submissions to admin
- `sendQuoteRequestEmail()` - Sends quote requests to admin
- `sendConfirmationEmail()` - Sends confirmation to users

### 2. API Routes

#### Contact Form API (`app/api/contact/route.ts`)
- Endpoint: `POST /api/contact`
- Validates form data
- Sends email to admin
- Sends confirmation to user
- Returns success/error response

#### Quote Request API (`app/api/quote/route.ts`)
- Endpoint: `POST /api/quote`
- Validates required fields (name, email, phone, productName, quantity)
- Optional fields: company, message
- Sends email to admin with quote details
- Sends confirmation to user
- Returns success/error response

### 3. Updated Components

#### ContactSection (`components/sections/ContactSection.tsx`)
- Real API integration with `/api/contact`
- Error handling and display
- Success message with auto-dismiss
- Loading states during submission
- Form reset after successful submission

#### QuoteModal (`components/QuoteModal.tsx`)
- Updated to use `/api/quote` endpoint
- New fields:
  - `company` (optional)
  - `productName` (required)
  - `quantity` (required)
  - `message` (optional)
- Category selection for header quote requests
- Product pre-fill for product detail page requests
- Success/error status messages
- Form validation

## Email Templates

### Admin Notification Emails
Professional HTML templates with:
- Company branding (Baykasoğlu colors)
- All form data clearly displayed
- Contact information with clickable links
- Timestamp of submission
- Responsive design

### User Confirmation Emails
- Success confirmation message
- Contact information for follow-up
- Professional branding
- Clear next steps

## How It Works

### Contact Form Flow
1. User fills out contact form on `/iletisim` page
2. Form data sent to `/api/contact`
3. API validates data
4. Email sent to admin (`f.tur@teknolojig.com`)
5. Confirmation email sent to user
6. Success message shown to user
7. Form reset

### Quote Request Flow
1. User clicks "Teklif Al" button (header or product page)
2. Modal opens with form
3. User fills required fields:
   - Name, email, phone (always required)
   - Product name or category selection
   - Quantity
   - Optional: company name, additional message
4. Form data sent to `/api/quote`
5. API validates data
6. Email sent to admin with quote details
7. Confirmation email sent to user
8. Success message shown
9. Modal closes after 2 seconds
10. Form reset

## Testing

### Local Testing
Before going live, test with a test email service or update SMTP credentials:

```typescript
// For development, you can use a service like Ethereal Email
// https://ethereal.email/
```

### Production Checklist
- [ ] Update `.env` with real `SMTP_PASSWORD`
- [ ] Verify `noreply@baykasoglu.com` email account exists and credentials work
- [ ] Test contact form submission
- [ ] Test quote request from header
- [ ] Test quote request from product page
- [ ] Verify admin receives emails at `f.tur@teknolojig.com`
- [ ] Verify users receive confirmation emails
- [ ] Check email deliverability (not in spam)

## Email Content Examples

### Contact Form Email to Admin
```
Subject: Yeni İletişim Formu - [User Name]

Body:
- Ad Soyad: [name]
- E-posta: [email]
- Telefon: [phone]
- Mesaj: [message]
- Tarih: [timestamp]
```

### Quote Request Email to Admin
```
Subject: Yeni Teklif Talebi - [Product Name]

Body:
- Ürün: [productName]
- Miktar: [quantity]
- Ad Soyad: [name]
- Firma: [company] (if provided)
- E-posta: [email]
- Telefon: [phone]
- Ek Not: [message] (if provided)
- Tarih: [timestamp]
```

### Confirmation Email to User
```
Subject: Mesajınız Alındı - Baykasoğlu (for contact)
         Teklif Talebiniz Alındı - Baykasoğlu (for quote)

Body:
- Thank you message
- Confirmation of receipt
- Contact information
- Expected response time
```

## Troubleshooting

### Emails Not Sending
1. Check SMTP credentials in `.env`
2. Verify SMTP_HOST and SMTP_PORT are correct
3. Check email account permissions
4. Review server logs for errors

### Emails Going to Spam
1. Set up SPF record for domain
2. Configure DKIM signing
3. Add DMARC policy
4. Use authenticated sender

### Form Submission Errors
1. Check browser console for API errors
2. Verify API routes are accessible
3. Check email field validation
4. Review server logs

## Security Considerations

1. **Environment Variables**: Never commit `.env` file with real credentials
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **Email Validation**: Already implemented in API routes
4. **CSRF Protection**: Consider adding for production
5. **Captcha**: May want to add reCAPTCHA for spam prevention

## Future Enhancements

- [ ] Add email templates for different languages
- [ ] Implement email queue for better performance
- [ ] Add attachment support for quote requests
- [ ] Create admin dashboard to view submissions
- [ ] Add SMS notifications for urgent requests
- [ ] Implement analytics tracking
- [ ] Add A/B testing for form variations

## Dependencies

```json
{
  "nodemailer": "^6.9.x",
  "@types/nodemailer": "^6.4.x"
}
```

## Support

For issues or questions:
- Check server logs
- Review API responses
- Test email credentials
- Verify form data format

---

**Last Updated**: January 2025
**Version**: 1.0.0
