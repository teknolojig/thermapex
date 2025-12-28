'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, Package, FileText, Check, ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productCode?: string;
  isFromHeader?: boolean;
}

export default function QuoteModal({ isOpen, onClose, productName, productCode, isFromHeader = false }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productName: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch categories when modal opens from header
  useEffect(() => {
    if (isOpen && isFromHeader) {
      fetchCategories();
    }
  }, [isOpen, isFromHeader]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    // Ürün detay sayfasından geliyorsa ürün bilgisini otomatik ekle
    if (productName && productCode && !isFromHeader) {
      setFormData(prev => ({
        ...prev,
        productName: `${productName} (${productCode})`,
        quantity: '1'
      }));
    }
  }, [productName, productCode, isFromHeader]);

  // Update productName field when categories are selected
  useEffect(() => {
    if (isFromHeader && selectedCategories.length > 0) {
      const selectedCategoryNames = selectedCategories
        .map(id => categories.find(cat => cat.id === id)?.name)
        .filter(Boolean)
        .join(', ');

      setFormData(prev => ({
        ...prev,
        productName: selectedCategoryNames
      }));
    } else if (isFromHeader) {
      setFormData(prev => ({
        ...prev,
        productName: ''
      }));
    }
  }, [selectedCategories, categories, isFromHeader]);

  // Body scroll'u kilitle/aç ve dropdown'u kapat
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsDropdownOpen(false); // Modal kapandığında dropdown'u da kapat
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dropdown dışına tıklama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // If from header and no quantity, set default
      const submitData = isFromHeader && !formData.quantity
        ? { ...formData, quantity: 'Talep Edilecek' }
        : formData;

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          // Form verilerini sıfırla
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            productName: '',
            quantity: '',
            message: ''
          });
          setSelectedCategories([]);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        console.error('Quote submission error:', data.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl md:text-3xl font-bold font-heading">Teklif Al</h2>
              <p className="text-white/90 mt-2">
                Ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi almak için formu doldurun.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Ad Soyad */}
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Adınız ve Soyadınız *"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="E-posta *"
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Telefon *"
                    />
                  </div>
                </div>

                {/* Firma (optional) */}
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    Firma
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Firma Adı (opsiyonel)"
                    />
                  </div>
                </div>
              </div>

              {/* İlgilenilen Ürünler */}
              {isFromHeader ? (
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    İlgilenilen Ürün Kategorileri *
                  </label>
                  <div className="relative dropdown-container">
                    {/* Dropdown Button */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between pl-10 pr-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:ring-2 focus:ring-primary focus:border-primary bg-white transition-colors"
                    >
                      <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <span className={selectedCategories.length > 0 ? "text-gray-900" : "text-gray-500"}>
                        {selectedCategories.length > 0
                          ? `${selectedCategories.length} kategori seçildi`
                          : "İlgilenilen Ürün Kategorileri *"
                        }
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                        >
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => toggleCategory(category.id)}
                              className={`
                                w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left
                                ${selectedCategories.includes(category.id) ? 'bg-primary/5' : ''}
                              `}
                            >
                              <span className={`font-medium ${selectedCategories.includes(category.id) ? 'text-primary' : 'text-gray-700'}`}>
                                {category.name}
                              </span>
                              {selectedCategories.includes(category.id) && (
                                <Check className="w-5 h-5 text-primary" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    İlgilenilen Ürün *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="İlgilenilen Ürün *"
                      readOnly={productName && productCode ? true : false}
                    />
                  </div>
                </div>
              )}

              {/* Miktar - Only show for product detail pages */}
              {!isFromHeader && (
                <div>
                  <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                    Miktar *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Miktar * (Örn: 100 adet, 500 kg)"
                    />
                  </div>
                </div>
              )}

              {/* Talep/Mesaj */}
              <div>
                <label className="hidden md:block text-sm font-medium text-gray-700 mb-2">
                  Talebiniz / Mesajınız
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Talebinizi veya ihtiyacınızı detaylı olarak belirtebilirsiniz..."
                  />
                </div>
              </div>

              {/* Submit Button & Status */}
              <div className="pt-2">
                {/* Status Messages for Desktop */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden md:block text-green-600 font-medium text-center mb-4"
                  >
                    ✓ Talebiniz başarıyla gönderildi!
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden md:block text-red-600 font-medium text-center mb-4"
                  >
                    Bir hata oluştu. Lütfen tekrar deneyin.
                  </motion.div>
                )}

                {/* Button for Desktop */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    * İşaretli alanların doldurulması zorunludur.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Teklif Talebini Gönder
                      </>
                    )}
                  </button>
                </div>

                {/* Button and Required Text for Mobile */}
                <div className="md:hidden space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Talebini Gönder
                      </>
                    )}
                  </button>

                  <div className="text-xs text-gray-500 text-center">
                    * İşaretli alanların doldurulması zorunludur.
                  </div>

                  {/* Status Messages for Mobile */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 font-medium text-center text-sm"
                    >
                      ✓ Talebiniz başarıyla gönderildi!
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 font-medium text-center text-sm"
                    >
                      Bir hata oluştu. Lütfen tekrar deneyin.
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}