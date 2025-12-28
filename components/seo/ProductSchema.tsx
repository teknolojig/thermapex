type ProductSchemaProps = {
  name: string;
  description: string;
  image?: string;
  sku: string;
  category: string;
};

export default function ProductSchema({ name, description, image, sku, category }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image || "https://thermapex.com/logo.svg",
    "sku": sku,
    "category": category,
    "brand": {
      "@type": "Brand",
      "name": "Thermapex"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Thermapex Bakır"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
