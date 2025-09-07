import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Users, Target, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Hakkımızda
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Thermapex olarak, bakır boru sistemleri sektöründe kalite ve güvenin adresi olmaktan gurur duyuyoruz.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold">Biz Kimiz?</h2>
              <p className="mb-4 text-muted-foreground">
                Thermapex, yılların tecrübesi ve uzman kadrosuyla bakır boru sistemleri üretiminde Türkiye&apos;nin önde gelen firmalarından biridir. 
                PE izolasyonlu bakır borular konusunda uzmanlaşmış firmamız, yüksek kaliteli ürünleri ve müşteri odaklı hizmet anlayışıyla sektörde fark yaratmaktadır.
              </p>
              <p className="text-muted-foreground">
                Modern üretim tesislerimizde, EN 12735-1 standardına uygun olarak ürettiğimiz ürünlerimiz, 
                klima sistemlerinden endüstriyel soğutma uygulamalarına kadar geniş bir yelpazede kullanılmaktadır.
              </p>
            </CardContent>
          </Card>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Misyonumuz</h3>
                <p className="text-sm text-muted-foreground">
                  Müşterilerimize en kaliteli bakır boru sistemlerini, en uygun fiyatlarla ve zamanında teslim ederek, 
                  projelerinin başarısına katkıda bulunmak.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Vizyonumuz</h3>
                <p className="text-sm text-muted-foreground">
                  Sürekli gelişim ve inovasyon ile bakır boru sistemleri sektöründe Türkiye&apos;nin ve bölgenin 
                  lider markası olmak.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Değerlerimiz</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Kalite Odaklılık</h4>
                    <p className="text-sm text-muted-foreground">
                      Ürünlerimizde ve hizmetlerimizde daima en yüksek kalite standartlarını hedefleriz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Müşteri Memnuniyeti</h4>
                    <p className="text-sm text-muted-foreground">
                      Müşterilerimizin ihtiyaçlarını anlar ve beklentilerini aşmaya çalışırız.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Güvenilirlik</h4>
                    <p className="text-sm text-muted-foreground">
                      Verdiğimiz sözleri tutar, taahhütlerimizi zamanında yerine getiririz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sürdürülebilirlik</h4>
                    <p className="text-sm text-muted-foreground">
                      Çevreye duyarlı üretim süreçleri ile geleceğe değer katarız.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-3xl font-bold">50+</h3>
                <p className="text-sm text-muted-foreground">Uzman Çalışan</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-3xl font-bold">15+</h3>
                <p className="text-sm text-muted-foreground">Yıllık Tecrübe</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-3xl font-bold">1000+</h3>
                <p className="text-sm text-muted-foreground">Mutlu Müşteri</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}