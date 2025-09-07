"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CheckCircle2, Loader2, Phone, Mail, MapPin } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  company: z.string().optional(),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
  productIds: z.array(z.string()).min(1, "En az bir ürün seçmelisiniz"),
})

const products = [
  { id: "pe-beyaz", name: "PE Beyaz İzolasyonlu Bakır Boru" },
  { id: "ciftli-beyaz", name: "Çiftli İzolasyonlu Beyaz Bakır Boru" },
  { id: "pe-siyah", name: "PE Siyah İzolasyonlu Bakır Boru" },
  { id: "ciftli-siyah", name: "Çiftli İzolasyonlu Siyah Bakır Boru" },
]

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      productIds: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Teklif talebiniz başarıyla alındı!")
        form.reset()
      } else {
        toast.error(data.message || "Bir hata oluştu")
      }
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold">Teşekkürler!</h2>
            <p className="mb-6 text-muted-foreground">
              Teklif talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Yeni Teklif Talebi
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Teklif Al
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            İhtiyaçlarınıza özel çözümler ve rekabetçi fiyatlar için formu doldurun.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Teklif Formu</CardTitle>
                <CardDescription>
                  Lütfen tüm alanları eksiksiz doldurun. 24 saat içinde size dönüş yapacağız.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Soyad *</FormLabel>
                            <FormControl>
                              <Input placeholder="Adınız Soyadınız" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Firma Adı</FormLabel>
                            <FormControl>
                              <Input placeholder="Firma adınız (opsiyonel)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-posta *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ornek@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon *</FormLabel>
                            <FormControl>
                              <Input placeholder="0555 555 55 55" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="productIds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İlgilendiğiniz Ürünler *</FormLabel>
                          <FormDescription>
                            Teklif almak istediğiniz ürünleri seçin
                          </FormDescription>
                          <div className="grid gap-3 md:grid-cols-2">
                            {products.map((product) => (
                              <label
                                key={product.id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={product.id}
                                  checked={field.value?.includes(product.id)}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    const newValue = e.target.checked
                                      ? [...(field.value || []), value]
                                      : (field.value || []).filter((v) => v !== value)
                                    field.onChange(newValue)
                                  }}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <span className="text-sm">{product.name}</span>
                              </label>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mesajınız *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="İhtiyaçlarınız, proje detayları veya sorularınız..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        "Teklif Talebi Gönder"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neden Thermapex?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hızlı Dönüş</p>
                    <p className="text-sm text-muted-foreground">24 saat içinde size dönüş yapıyoruz</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Rekabetçi Fiyatlar</p>
                    <p className="text-sm text-muted-foreground">En uygun fiyat garantisi</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Teknik Destek</p>
                    <p className="text-sm text-muted-foreground">Uzman ekibimiz her zaman yanınızda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">+90 555 555 5555</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-posta</p>
                    <p className="font-medium">info@thermapex.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Adres</p>
                    <p className="font-medium">İstanbul, Türkiye</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}