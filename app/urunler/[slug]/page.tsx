import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Download, FileText } from "lucide-react"

const products = {
  "pe-beyaz-izolasyonlu": {
    title: "PE Beyaz İzolasyonlu Bakır Boru",
    description: "Yüksek kaliteli beyaz PE izolasyonlu bakır borular, mükemmel ısı yalıtımı ve uzun ömürlü performans sunar.",
    longDescription: "Thermapex PE Beyaz İzolasyonlu Bakır Borular, modern klima ve soğutma sistemlerinin ihtiyaçlarını karşılamak üzere özel olarak tasarlanmıştır. EN 12735-1 standardına uygun olarak üretilen borularımız, yüksek kaliteli bakır malzeme ve dayanıklı PE izolasyon ile üstün performans sağlar.",
    technicalSpecs: [
      { label: "Çap Aralığı", value: "6.35mm - 34.92mm" },
      { label: "Et Kalınlığı", value: "0.8mm - 1.5mm" },
      { label: "İzolasyon Kalınlığı", value: "13mm PE" },
      { label: "Çalışma Sıcaklığı", value: "-40°C / +120°C" },
      { label: "Maksimum Basınç", value: "50 bar" },
      { label: "Standart", value: "EN 12735-1" },
      { label: "Uzunluk", value: "15m / 25m / 50m kangal" }
    ],
    features: [
      "Yüksek ısı yalıtım performansı",
      "Korozyona karşı dayanıklı",
      "Kolay montaj ve şekillendirme",
      "Uzun ömürlü kullanım",
      "Çevre dostu üretim",
      "Geniş çap seçenekleri"
    ],
    applications: [
      "Split klima sistemleri",
      "VRF sistemler",
      "Merkezi klima sistemleri",
      "Soğutma sistemleri",
      "Isı pompaları",
      "Endüstriyel soğutma"
    ]
  },
  "ciftli-beyaz": {
    title: "Çiftli İzolasyonlu Beyaz Bakır Boru",
    description: "Çift katmanlı izolasyon teknolojisi ile üstün performans, maksimum enerji verimliliği ve uzun ömür.",
    longDescription: "Thermapex Çiftli İzolasyonlu Beyaz Bakır Borular, özellikle VRF sistemler ve büyük ölçekli klima projeleri için idealdir. Çift boru sistemi sayesinde montaj süresi kısalır ve işçilik maliyetleri düşer.",
    technicalSpecs: [
      { label: "Boru Kombinasyonu", value: "6.35+9.52mm / 6.35+12.7mm / 9.52+15.88mm" },
      { label: "Et Kalınlığı", value: "0.8mm - 1.0mm" },
      { label: "İzolasyon Kalınlığı", value: "13mm PE" },
      { label: "Çalışma Sıcaklığı", value: "-40°C / +120°C" },
      { label: "Maksimum Basınç", value: "50 bar" },
      { label: "Standart", value: "EN 12735-1" },
      { label: "Uzunluk", value: "25m / 50m kangal" }
    ],
    features: [
      "Çift boru tek izolasyon sistemi",
      "Montaj süresinden tasarruf",
      "Azaltılmış işçilik maliyeti",
      "Profesyonel görünüm",
      "Yüksek enerji verimliliği",
      "Kolay taşıma ve depolama"
    ],
    applications: [
      "VRF sistemler",
      "Multi split klimalar",
      "Merkezi sistem klimalar",
      "Otel ve hastane projeleri",
      "AVM projeleri",
      "Büyük ölçekli ticari projeler"
    ]
  },
  "pe-siyah-izolasyonlu": {
    title: "PE Siyah İzolasyonlu Bakır Boru",
    description: "UV dayanımlı siyah PE kaplama ile dış mekan kullanımına uygun, dayanıklı bakır borular.",
    longDescription: "Thermapex PE Siyah İzolasyonlu Bakır Borular, özellikle dış mekan uygulamaları için geliştirilmiştir. UV dayanımlı siyah PE kaplama, güneş ışınlarına karşı maksimum koruma sağlar.",
    technicalSpecs: [
      { label: "Çap Aralığı", value: "6.35mm - 34.92mm" },
      { label: "Et Kalınlığı", value: "0.8mm - 1.5mm" },
      { label: "İzolasyon Kalınlığı", value: "13mm UV dayanımlı PE" },
      { label: "Çalışma Sıcaklığı", value: "-40°C / +120°C" },
      { label: "UV Dayanımı", value: "10+ yıl" },
      { label: "Standart", value: "EN 12735-1" },
      { label: "Uzunluk", value: "15m / 25m / 50m kangal" }
    ],
    features: [
      "UV dayanımlı özel kaplama",
      "Dış mekan kullanımına uygun",
      "Hava koşullarına dayanıklı",
      "Uzun ömürlü koruma",
      "Solmaya karşı dirençli",
      "Yüksek mekanik dayanım"
    ],
    applications: [
      "Çatı tipi klimalar",
      "Dış mekan klima hatları",
      "Güneş enerjisi sistemleri",
      "Endüstriyel soğutma",
      "Soğuk hava depoları",
      "Tarımsal sulama sistemleri"
    ]
  },
  "ciftli-siyah": {
    title: "Çiftli İzolasyonlu Siyah Bakır Boru",
    description: "Endüstriyel uygulamalar için ideal, UV dayanımlı çift katmanlı siyah izolasyonlu borular.",
    longDescription: "Thermapex Çiftli İzolasyonlu Siyah Bakır Borular, büyük ölçekli endüstriyel projeler için özel olarak tasarlanmıştır. UV dayanımlı siyah kaplama ve çift boru sistemi ile maksimum verimlilik sağlar.",
    technicalSpecs: [
      { label: "Boru Kombinasyonu", value: "9.52+15.88mm / 12.7+19.05mm / 12.7+25.4mm" },
      { label: "Et Kalınlığı", value: "1.0mm - 1.2mm" },
      { label: "İzolasyon Kalınlığı", value: "13mm UV dayanımlı PE" },
      { label: "Çalışma Sıcaklığı", value: "-40°C / +120°C" },
      { label: "UV Dayanımı", value: "10+ yıl" },
      { label: "Standart", value: "EN 12735-1" },
      { label: "Uzunluk", value: "25m / 50m kangal" }
    ],
    features: [
      "Endüstriyel kalite",
      "UV dayanımlı çift izolasyon",
      "Yüksek basınç dayanımı",
      "Korozyon direnci",
      "Hızlı montaj imkanı",
      "Profesyonel görünüm"
    ],
    applications: [
      "Endüstriyel soğutma sistemleri",
      "Büyük ölçekli VRF projeler",
      "Proses soğutma",
      "Data center soğutma",
      "Hastane ve laboratuvar sistemleri",
      "Gıda işleme tesisleri"
    ]
  }
}

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products[slug as keyof typeof products]

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/urunler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Ürünler
          </Link>
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-6xl font-bold text-primary/30">THERMAPEX</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-4xl font-bold">{product.title}</h1>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <p className="text-muted-foreground">{product.longDescription}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1" asChild>
              <Link href="/teklif-al">
                Teklif Al
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Teknik Döküman
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Özellikler</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Teknik Özellikler</h3>
            <dl className="space-y-2">
              {product.technicalSpecs.map((spec, index) => (
                <div key={index} className="text-sm">
                  <dt className="font-medium text-muted-foreground">{spec.label}:</dt>
                  <dd className="font-semibold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Uygulama Alanları</h3>
            <ul className="space-y-2">
              {product.applications.map((application, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{application}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-lg bg-muted/50 p-8 text-center">
        <FileText className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-4 text-2xl font-bold">Detaylı Bilgi İçin</h2>
        <p className="mb-6 text-muted-foreground">
          Ürünlerimiz hakkında daha fazla bilgi almak veya özel projeleriniz için çözüm önerileri almak ister misiniz?
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/iletisim">İletişime Geç</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/teklif-al">Teklif Al</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({
    slug,
  }))
}