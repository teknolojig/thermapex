import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 justify-items-start max-w-6xl mx-auto">
          <div className="space-y-4">
            <img src="/logo.svg" alt="Thermapex Logo" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              Yüksek kaliteli bakır boru sistemleri ve endüstriyel çözümler
              sunan güvenilir partneriniz.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Ürünler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/urunler/pe-beyaz-izolasyonlu"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  PE Beyaz İzolasyonlu
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/ciftli-beyaz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Çiftli Beyaz İzolasyonlu
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/pe-siyah-izolasyonlu"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  PE Siyah İzolasyonlu
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/ciftli-siyah"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Çiftli Siyah İzolasyonlu
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href="/teklif-al"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Teklif Al
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">İletişim</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                +90 555 555 5555
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                info@thermapex.com
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                İstanbul, Türkiye
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Thermapex. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}