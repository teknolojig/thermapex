"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FileText, LogOut, RefreshCw, Eye, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Quote {
  id: string
  fullName: string
  company: string
  email: string
  phone: string
  message: string
  productIds: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const products: Record<string, string> = {
    "pe-beyaz": "PE Beyaz İzolasyonlu Bakır Boru",
    "ciftli-beyaz": "Çiftli İzolasyonlu Beyaz Bakır Boru",
    "pe-siyah": "PE Siyah İzolasyonlu Bakır Boru",
    "ciftli-siyah": "Çiftli İzolasyonlu Siyah Bakır Boru",
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/quotes")
      if (response.ok) {
        const data = await response.json()
        setQuotes(data.quotes)
      } else {
        toast.error("Teklifler yüklenemedi")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      toast.error("Çıkış yapılırken bir hata oluştu")
    }
  }

  const handleStatusUpdate = async (quoteId: string, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success("Durum güncellendi")
        fetchQuotes()
      } else {
        toast.error("Güncelleme başarısız")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  const handleDelete = async (quoteId: string) => {
    if (!confirm("Bu teklifi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Teklif silindi")
        fetchQuotes()
      } else {
        toast.error("Silme başarısız")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "Beklemede", className: "bg-yellow-100 text-yellow-800" },
      contacted: { label: "İletişime Geçildi", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Tamamlandı", className: "bg-green-100 text-green-800" },
      cancelled: { label: "İptal Edildi", className: "bg-red-100 text-red-800" },
    }
    const statusInfo = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" }
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Toplam Teklif</CardDescription>
              <CardTitle className="text-2xl">{quotes.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Bekleyen</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">
                {quotes.filter((q) => q.status === "pending").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>İletişime Geçilen</CardDescription>
              <CardTitle className="text-2xl text-blue-600">
                {quotes.filter((q) => q.status === "contacted").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tamamlanan</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {quotes.filter((q) => q.status === "completed").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Teklif Talepleri</CardTitle>
                <CardDescription>Müşterilerden gelen teklif talepleri</CardDescription>
              </div>
              <Button onClick={fetchQuotes} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Yenile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Yükleniyor...</div>
            ) : quotes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Henüz teklif talebi yok</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Firma</TableHead>
                    <TableHead>E-posta</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="text-sm">
                        {formatDate(quote.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">{quote.fullName}</TableCell>
                      <TableCell>{quote.company || "-"}</TableCell>
                      <TableCell>{quote.email}</TableCell>
                      <TableCell>{quote.phone}</TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedQuote(quote)
                              setIsDetailOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(quote.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Teklif Detayları</DialogTitle>
            <DialogDescription>
              {selectedQuote && formatDate(selectedQuote.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ad Soyad</label>
                  <p className="font-medium">{selectedQuote.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Firma</label>
                  <p className="font-medium">{selectedQuote.company || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">E-posta</label>
                  <p className="font-medium">{selectedQuote.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                  <p className="font-medium">{selectedQuote.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">İlgilenilen Ürünler</label>
                <div className="mt-1 space-y-1">
                  {selectedQuote.productIds.split(",").map((productId) => (
                    <p key={productId} className="text-sm">
                      • {products[productId] || productId}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mesaj</label>
                <p className="mt-1 rounded-lg bg-muted p-3 text-sm">{selectedQuote.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Durum</label>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedQuote.status === "pending" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedQuote.id, "pending")}
                  >
                    Beklemede
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedQuote.status === "contacted" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedQuote.id, "contacted")}
                  >
                    İletişime Geçildi
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedQuote.status === "completed" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedQuote.id, "completed")}
                  >
                    Tamamlandı
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedQuote.status === "cancelled" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate(selectedQuote.id, "cancelled")}
                  >
                    İptal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}