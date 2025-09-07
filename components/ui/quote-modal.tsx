"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface QuoteModalProps {
  children: React.ReactNode
}

export function QuoteModal({ children }: QuoteModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setOpen(false)
          setIsSuccess(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            product: "",
            quantity: "",
            message: "",
          })
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting quote:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Teklif Talebi
          </DialogTitle>
          <DialogDescription>
            Size en uygun teklifi hazırlayabilmemiz için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Firma Adı</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Firma adınız"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ornek@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+90 555 555 55 55"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Ürün Kategorisi</Label>
                <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ürün seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pe-beyaz">PE Beyaz İzolasyonlu Bakır Boru</SelectItem>
                    <SelectItem value="ciftli-beyaz">Çiftli İzolasyonlu Beyaz Bakır Boru</SelectItem>
                    <SelectItem value="pe-siyah">PE Siyah İzolasyonlu Bakır Boru</SelectItem>
                    <SelectItem value="ciftli-siyah">Çiftli İzolasyonlu Siyah Bakır Boru</SelectItem>
                    <SelectItem value="diger">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Miktar/Metraj</Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="Örn: 100 metre, 50 rulo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Proje detayları, özel istekler..."
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full group" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <span>Teklif Talebini Gönder</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground">Teklif Talebiniz Alındı!</h3>
              <p className="text-muted-foreground">
                En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}