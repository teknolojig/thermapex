export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Baykasoğlu Bakır",
    "url": "https://baykasoglu.com",
    "logo": "https://baykasoglu.com/logo.svg",
    "description": "Türkiye'nin lider bakır boru tedarikçisi. LWC, kangal, boy, izolasyonlu bakır boru ve bakır pul çeşitleri.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Adnan Kahveci Mahallesi, Büyükdere Caddesi, Şirin Sanayi Sitesi, B Blok No:22 F/7",
      "postalCode": "34528",
      "addressLocality": "Beylikdüzü",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-212-875-95-57",
      "contactType": "sales",
      "areaServed": "TR",
      "availableLanguage": ["Turkish"]
    },
    "sameAs": [
      "https://baykasoglu.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
