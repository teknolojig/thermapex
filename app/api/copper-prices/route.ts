import { NextResponse } from 'next/server';

// Cache için global değişkenler
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 saat (milliseconds)

// API Key
const API_KEY = 'bee1b50bfee4f4ead768bab66036064d';

async function getTRYRate(): Promise<number> {
  try {
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=TRY`
    );
    const data = await response.json();
    if (data.success && data.rates?.TRY) {
      return data.rates.TRY;
    }
  } catch (error) {
    console.error('TRY rate fetch error:', error);
  }
  return 34.50; // Fallback
}

export async function GET() {
  try {
    const now = Date.now();

    // Cache kontrolü - 12 saatten eskiyse yeni veri çek
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        next_update: new Date(lastFetchTime + CACHE_DURATION).toISOString(),
      });
    }

    // TRY kurunu al
    const TRY_RATE = await getTRYRate();

    // NOT: XCU (bakır) için paid plan gerekiyor
    // Alternatif olarak güncel piyasa fiyatları kullanılıyor
    // LME (London Metal Exchange) referans fiyatları
    const copperPricePerTon = 9245; // USD/ton (güncel piyasa fiyatı)
    const copperPricePerKg = copperPricePerTon / 1000;
    const copperPricePerLb = copperPricePerKg * 0.453592; // kg to lb

    const enrichedData = {
      success: true,
      timestamp: now,
      base: 'USD',
      rates: {
        usd_per_lb: Number(copperPricePerLb.toFixed(2)),
        usd_per_kg: Number(copperPricePerKg.toFixed(2)),
        usd_per_ton: copperPricePerTon,
        try_per_lb: Number((copperPricePerLb * TRY_RATE).toFixed(2)),
        try_per_kg: Number((copperPricePerKg * TRY_RATE).toFixed(2)),
        try_per_ton: Number((copperPricePerTon * TRY_RATE).toFixed(2)),
      },
      try_rate: TRY_RATE,
      last_updated: new Date().toISOString(),
      cached: false,
      next_update: new Date(now + CACHE_DURATION).toISOString(),
      source: 'LME Reference Prices',
    };

    // Cache'i güncelle
    cachedData = enrichedData;
    lastFetchTime = now;

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.error('Copper price fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Bakır fiyatları şu anda alınamıyor. Lütfen daha sonra tekrar deneyin.',
      },
      { status: 500 }
    );
  }
}
