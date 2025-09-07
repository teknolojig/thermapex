import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              İletişim
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Size nasıl yardımcı olabiliriz? Uzman ekibimiz sorularınızı yanıtlamak için hazır.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
                <CardDescription>
                  Bize aşağıdaki kanallardan ulaşabilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">+90 555 555 5555</p>
                    <p className="text-sm text-muted-foreground">+90 555 555 5556 (Faks)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">E-posta</p>
                    <p className="text-sm text-muted-foreground">info@thermapex.com</p>
                    <p className="text-sm text-muted-foreground">satis@thermapex.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-sm text-muted-foreground">
                      Organize Sanayi Bölgesi<br />
                      1. Cadde No: 123<br />
                      34000 İstanbul, Türkiye
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Çalışma Saatleri</p>
                    <p className="text-sm text-muted-foreground">
                      Pazartesi - Cuma: 08:30 - 18:00<br />
                      Cumartesi: 09:00 - 14:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hızlı Teklif</CardTitle>
                <CardDescription>
                  Ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi almak için formumuzu doldurun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/teklif-al">
                    Teklif Formu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-[400px]">
              <CardContent className="h-full p-0">
                <div className="h-full w-full rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-primary/50" />
                    <p className="text-lg font-medium text-muted-foreground">Harita Alanı</p>
                    <p className="text-sm text-muted-foreground">Google Maps entegrasyonu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bölge Ofisleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">İstanbul Anadolu Yakası</p>
                  <p className="text-sm text-muted-foreground">+90 216 555 5555</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">Ankara Ofis</p>
                  <p className="text-sm text-muted-foreground">+90 312 555 5555</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">İzmir Ofis</p>
                  <p className="text-sm text-muted-foreground">+90 232 555 5555</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">Sıkça Sorulan Sorular</h2>
              <p className="mb-6 text-muted-foreground">
                Merak ettiğiniz konular hakkında bilgi almak için bize ulaşmaktan çekinmeyin.
              </p>
              <div className="grid gap-4 text-left md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Minimum sipariş miktarı nedir?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ürün tipine göre değişmekle birlikte, detaylı bilgi için satış ekibimizle iletişime geçebilirsiniz.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Teslimat süresi ne kadardır?</h4>
                  <p className="text-sm text-muted-foreground">
                    Stokta bulunan ürünler için 1-3 iş günü, özel üretimler için 7-15 iş günüdür.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Garanti koşulları nelerdir?</h4>
                  <p className="text-sm text-muted-foreground">
                    Tüm ürünlerimiz 2 yıl üretim hatalarına karşı garantilidir.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Teknik destek sağlıyor musunuz?</h4>
                  <p className="text-sm text-muted-foreground">
                    Evet, uzman teknik ekibimiz montaj ve kullanım konusunda destek vermektedir.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}