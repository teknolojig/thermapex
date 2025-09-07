import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: "pe-beyaz-izolasyonlu",
    title: "PE Beyaz İzolasyonlu Bakır Boru",
    description: "Yüksek kaliteli beyaz PE izolasyonlu bakır borular. Mükemmel ısı yalıtımı ve dayanıklılık.",
    features: [
      "9.52mm - 34.92mm çap aralığı",
      "0.8mm - 1.5mm et kalınlığı",
      "13mm PE izolasyon kalınlığı",
      "EN 12735-1 standardına uygun"
    ],
    applications: "Klima sistemleri, soğutma sistemleri, ısıtma tesisatları"
  },
  {
    id: "ciftli-beyaz",
    title: "Çiftli İzolasyonlu Beyaz Bakır Boru",
    description: "Çift katmanlı izolasyon teknolojisi ile üstün performans ve uzun ömür.",
    features: [
      "Çift boru sistemi",
      "Beyaz PE kaplama",
      "Yüksek ısı yalıtımı",
      "Kolay montaj"
    ],
    applications: "VRF sistemler, merkezi klima sistemleri, endüstriyel soğutma"
  },
  {
    id: "pe-siyah-izolasyonlu",
    title: "PE Siyah İzolasyonlu Bakır Boru",
    description: "UV dayanımlı siyah PE kaplama ile dış mekan kullanımına uygun.",
    features: [
      "UV dayanımlı kaplama",
      "Dış mekan kullanımına uygun",
      "9.52mm - 34.92mm çap aralığı",
      "Uzun ömürlü"
    ],
    applications: "Dış mekan klima hatları, endüstriyel tesisatlar, güneş enerjisi sistemleri"
  },
  {
    id: "ciftli-siyah",
    title: "Çiftli İzolasyonlu Siyah Bakır Boru",
    description: "Endüstriyel uygulamalar için ideal çift katmanlı siyah izolasyonlu borular.",
    features: [
      "Çift boru sistemi",
      "Siyah PE kaplama",
      "UV dayanımlı",
      "Endüstriyel kalite"
    ],
    applications: "Endüstriyel soğutma sistemleri, büyük ölçekli VRF sistemler"
  }
]

export default function ProductsPage() {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ürünlerimiz
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Thermapex olarak farklı ihtiyaçlara yönelik geniş ürün yelpazemiz ile 
          her türlü projeye uygun çözümler sunuyoruz.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-5xl font-bold text-primary/30">THERMAPEX</div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{product.title}</CardTitle>
              <CardDescription className="text-base">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Özellikler:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Uygulama Alanları:</h4>
                <p className="text-sm text-muted-foreground">{product.applications}</p>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/urunler/${product.id}`}>
                  Detaylı Bilgi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-muted/50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">İhtiyacınıza Uygun Ürünü Bulamadınız mı?</h2>
        <p className="mb-6 text-muted-foreground">
          Uzman ekibimiz size özel çözümler sunmak için hazır. Hemen iletişime geçin.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/teklif-al">
              Teklif Al
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/iletisim">İletişime Geç</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}