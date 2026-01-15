// SEO İçerikleri - Her kategori için kapsamlı içerik
export function getSeoContent(categorySlug: string): React.ReactNode {
  // Full path slug ise son kısmı al (bakir-urunler/lwc-bakir-borular -> lwc-bakir-borular)
  const slugParts = categorySlug.split('/');
  const shortSlug = slugParts[slugParts.length - 1];

  const seoContents: { [key: string]: React.ReactNode } = {
    'lwc-bakir-borular': (
      <>
        <p>
          LWC bakır borular genellikle iklimlendirme, soğutma gibi sistemleri için kullanılan ve belirli standartlara göre üretilen bakır boru çeşitleridir. Çeşitli boy ve ölçülerde üretilen LWC bakır boruları web sitemiz üzerinden inceleyebilirsiniz.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">LWC Bakır Boru Nedir?</h3>
        <p>
          <strong>LWC bakır boru</strong>, "LWC" olarak da bilinen "Level Wound Coil" ifadesinin kısaltmasıdır. Bu terim, bir tür soğutma ve iklimlendirme sistemleri için kullanılan bakır boru çeşidini tanımlamaktadır.
        </p>
        <p>
          LWC bakır borular, yüksek kaliteli bir bakır alaşımından üretilir ve özel bir işlemle düşük su içeriğine sahip hale getirilir. Su içeriğinin düşük olması, boruların içerisindeki nem miktarını minimize eder, böylece içerideki su buharının donma riskini azaltır. Bu özellik, özellikle klima sistemleri gibi düşük sıcaklıklara maruz kalan uygulamalarda önemlidir.
        </p>
        <p>
          LWC borular, yüksek mukavemet, korozyon direnci ve termal iletkenlik gibi bakırın doğal avantajlarına sahiptir. Ayrıca, bakırın iyi bir şekilde işlenebilir olması nedeniyle, borular farklı çaplarda ve uzunluklarda üretilebilir, böylece farklı uygulamalara uyum sağlar.
        </p>
        <p>
          LWC bakır borular, soğutma sistemleri, iklimlendirme sistemleri, buzdolapları, dondurucular ve diğer endüstriyel uygulamalarda yaygın olarak kullanılır. Bu borular, enerji verimliliği, dayanıklılık ve uzun ömür gibi avantajları nedeniyle tercih edilen bir seçenek haline gelmiştir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">LWC Bakır Boru'da Dikkat Edilmesi Gerekenler</h3>
        <p>
          LWC bakır borular, soğutma ve iklimlendirme sistemlerinde kullanılan önemli bir bileşendir. Bu boruları kullanırken aşağıdaki noktalara dikkat etmek önemlidir:
        </p>
        <p>
          <strong>Doğru Boyutlandırma:</strong> Boru çapının ve duvar kalınlığının, sistemin gereksinimlerine uygun şekilde doğru bir şekilde boyutlandırılması gerekmektedir. İlgili standartlara ve sistem tasarımına uygun boyutlar seçilmelidir.
        </p>
        <p>
          <strong>Doğru Kurulum:</strong> LWC boruların doğru bir şekilde kurulması önemlidir. Boruların bükülmesi, kesilmesi ve bağlantı elemanlarının doğru bir şekilde monte edilmesi gerekmektedir. Montaj işlemlerinin uzmanlar tarafından yapılması önerilir.
        </p>
        <p>
          <strong>Korozyon Kontrolü:</strong> Bakır boruların korozyona karşı dayanıklı olmasına rağmen, uygun koruma önlemleri almak önemlidir. Özellikle su veya nemle temas eden alanlarda, korozyonu önlemek için uygun kaplamalar veya koruyucu yöntemler kullanılmalıdır.
        </p>
        <p>
          <strong>İyi İzolasyon:</strong> LWC borular, soğutma sistemlerinde sıcaklıkları kontrol etmek için kullanılır. Bu nedenle, boruların iyi bir şekilde izole edilmesi önemlidir. İyi kalitede izolasyon malzemeleri kullanarak enerji kayıplarını önlemek ve sistemin verimliliğini artırmak gerekmektedir.
        </p>
        <p>
          <strong>Bakım ve Temizlik:</strong> LWC boruların düzenli bakım ve temizlik gerektirdiği unutulmamalıdır. Boruların içinde biriken kir, tortu veya kireç gibi unsurların düzenli olarak temizlenmesi, sistemin performansının korunmasına yardımcı olur.
        </p>
        <p>
          <strong>Uygun Basınç ve Sıcaklık:</strong> LWC boruların kullanım sınırlamalarını aşmamak önemlidir. Belirli bir çalışma basıncı ve sıcaklık aralığında kullanılması gerekmektedir. Üretici tarafından belirtilen sınırlamalara dikkat edilmeli ve bu sınırlamaların aşılmaması sağlanmalıdır.
        </p>
        <p>
          <strong>Uzman Danışmanlık:</strong> LWC bakır boru sistemleriyle ilgili herhangi bir sorunuz veya endişeniz varsa, bir uzmana danışmanız önemlidir. Uzmanlar, doğru tasarım, kurulum ve bakım konusunda size rehberlik edebilir ve en iyi sonuçları elde etmenize yardımcı olabilir.
        </p>
        <p>
          Bu önlemleri alarak, LWC bakır boruları doğru şekilde kullanabilir ve sistemlerinizin verimli ve güvenli bir şekilde çalışmasını sağlayabilirsiniz.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">LWC Bakır Boru Fiyatları</h3>
        <p>
          Talep ve isteklerinize en uygun LWC bakır borularını satın alabileceğiniz web sitemiz üzerinden günlük olarak LWC bakır boru fiyatlarına erişebilirsiniz. Thermapex güvencesi ile stoktan anında teslim avantajı sağlıyoruz.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile her ölçüde taleplerinize uygun LWC bakır borulara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'kangal-bakir-boru': (
      <>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Kangal Bakır Boru Nedir?</h3>
        <p>
          <strong>Kangal Bakır Boru (Pancake)</strong>, minimum %99.9 saflıkta CU-DHP bakırdan üretilen, iklimlendirme ve soğutma sistemleri için özel olarak tasarlanmış küçük sarımlı bakır borulardır. EN 12735-1 ve JIS H 3300 C 1220 standartlarında üretilen kangal bakır borular, işlenebilirlik açısından oldukça yumuşaktır ve montaj / revizyon işlemleri sırasında taşınabilirlik ve hafiflik açısından oldukça avantajlıdır.
        </p>
        <p>
          Ortalama olarak bir Kangal Bakır Boru (Pancake) ağırlığı 5,00 – 15,00 Kg arasında gelmektedir.
        </p>
        <p>
          Dünyada standart olarak 50 metre olarak üretilmekte olup, özel projeler ve özel çözümler için talep edilen uzunluklarda, örneğin 30 Mt. – 15 Mt. gibi üretilebilmektedir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Üretilebilirlik Bilgisi</h3>
        <p>
          Dış çapları kılcak olarak, <strong>4mm ve 22,22 mm (7/8")</strong> aralığında ve et kalınlığı <strong>0,68 - 1,20 mm</strong> olarak üretilebilmektedir.
        </p>
        <p>
          Kangal Bakır Boru, özel bir tür bakır borudur. Kangal Bakır Boru, yüksek kalitede bir bakır alaşımından üretilir ve çeşitli endüstriyel uygulamalarda kullanılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kullanım Alanları</h3>
        <p>
          Kangal Bakır Boru, genellikle soğutma, iklimlendirme, tesisat, hidrolik sistemler, gaz ve sıvı iletimi gibi alanlarda kullanılan boru hatları için tercih edilen bir malzemedir. Boruların dayanıklılığı, korozyon direnci ve termal iletkenlik gibi özellikleri, onları bu tür uygulamalar için ideal hale getirir.
        </p>
        <p>
          Kangal Bakır Boru, çeşitli çaplarda ve duvar kalınlıklarında üretilir, böylece farklı sistem gereksinimlerini karşılayabilir. Ayrıca, boru hatlarının bükülmesi ve şekillendirilmesi gereken durumlarda da kolaylıkla işlenebilir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Teknik Özellikler</h3>
        <p>
          Bu borular, yüksek mukavemetleri ve uzun ömürlü yapıları sayesinde tercih edilir. Aynı zamanda, bakırın yüksek termal iletkenlik özelliği, ısı transferini etkin bir şekilde gerçekleştirmelerini sağlar.
        </p>
        <p>
          Kangal Bakır Boru, endüstri standartlarına ve kalite yönetim sistemlerine uygun olarak üretilir ve çeşitli testlerden geçer. Bu testler, boruların kalite, dayanıklılık ve performansını doğrulamayı amaçlar.
        </p>
        <p>
          Özetlemek gerekirse, Kangal Bakır Boru, özel bir bakır alaşımından üretilen ve genellikle soğutma, iklimlendirme ve tesisat gibi uygulamalarda kullanılan bir boru türüdür. Yüksek kaliteli ve dayanıklı yapısıyla tercih edilen bir seçenektir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kangal Bakır Boru Montajı</h3>
        <p>
          Montaj sırasında boruların yumuşak yapısı sayesinde bükme işlemleri kolayca yapılabilir. Boru bükme yarıçapı minimum boru çapının 3 katı olmalıdır. Keskin bükümlerde oval şekil almasını önlemek için boru bükme yayları kullanılmalıdır.
        </p>
        <p>
          Kaynak işlemlerinde gümüş alaşımlı sert lehim kullanılmalıdır. Kaynak sıcaklığı 600-750°C arasında olmalı ve mutlaka nitrojen gazı koruması altında yapılmalıdır. Bu şekilde boru iç yüzeyinde oksit oluşumu önlenir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile her ölçüde taleplerinize uygun bakır borulara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'boy-bakir-borular': (
      <>
        <p>
          Boy bakır borular, düz formda üretilen ve genellikle 5-6 metre uzunluğunda sunulan bakır boru çeşitleridir. Endüstriyel ve ticari projelerde yaygın olarak kullanılan boy bakır borular, yüksek basınçlı sistemler ve ağır yük taşıyan tesisatlarda tercih edilmektedir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Boy Bakır Boru Nedir?</h3>
        <p>
          <strong>Boy bakır borular</strong>, rijit yapıda üretilen, düz formlu bakır boru sistemleridir. EN 12735-1, ASTM B88 ve ASTM B280 standartlarına uygun olarak üretilen bu borular, özellikle merkezi klima sistemleri, yangın söndürme tesisatları ve endüstriyel proses hatlarında kullanılmaktadır.
        </p>
        <p>
          %99.9 saflıkta elektrolitik bakır (Cu-ETP) veya fosfor dezoksidize bakır (Cu-DHP) hammaddeden üretilen boy bakır borular, sert veya yarı sert tavlı olarak tedarik edilmektedir. Rijit yapıları sayesinde yüksek basınçlı uygulamalarda güvenle kullanılabilir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Teknik Özellikler</h3>
        <p>
          Boy bakır borularımız <strong>6mm'den 267mm'ye (10")</strong> kadar dış çap aralığında ve <strong>0,5mm'den 3,0mm'ye</strong> kadar et kalınlığında üretilebilmektedir. Standart uzunluk 5 metre olup, özel taleplere göre 3 metre veya 6 metre uzunluğunda da tedarik edilebilir.
        </p>
        <p>
          <strong>Sert tavlı (H)</strong> boy bakır borular, minimum 290 N/mm² çekme mukavemetine sahiptir ve yüksek basınçlı uygulamalar için uygundur. <strong>Yarı sert tavlı (1/2H)</strong> borular ise 250 N/mm² çekme mukavemeti ile hem dayanıklılık hem de işlenebilirlik sunar.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Boy Bakır Boru Kullanım Alanları</h3>
        <p>
          <strong>Merkezi Klima Sistemleri:</strong> Chiller hatları, soğutma kuleleri bağlantıları ve fan coil dağıtım hatlarında boy bakır borular yaygın olarak kullanılır. Büyük çaplı borular, yüksek debi gerektiren sistemlerde tercih edilir.
        </p>
        <p>
          <strong>Yangın Söndürme Sistemleri:</strong> NFPA 13 standardına uygun sprinkler sistemlerinde, boy bakır borular korozyon direnci ve uzun ömürlü yapısı ile güvenli bir seçimdir. Özellikle deniz suyu ile çalışan sistemlerde üstün performans gösterir.
        </p>
        <p>
          <strong>Endüstriyel Proses Hatları:</strong> Kimya endüstrisi, ilaç sektörü ve gıda işleme tesislerinde, boy bakır borular hijyenik ve korozyona dayanıklı yapısı ile tercih edilir. Buhar hatları, basınçlı hava sistemleri ve hidrolik tesisatlarda güvenle kullanılır.
        </p>
        <p>
          <strong>Medikal Gaz Sistemleri:</strong> Hastane ve sağlık tesislerinde oksijen, azot, vakum ve medikal hava dağıtım hatlarında boy bakır borular, EN 13348 standardına uygun olarak kullanılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Boy Bakır Borunun Avantajları</h3>
        <p>
          <strong>Yüksek Dayanım:</strong> Rijit yapısı sayesinde, mekanik darbelere ve basınca karşı üstün dayanım gösterir. Özellikle toprak altı ve duvar içi uygulamalarda deforme olmadan uzun yıllar hizmet verir.
        </p>
        <p>
          <strong>Hassas Boyutsal Tolerans:</strong> CNC kontrollü üretim hatlarımızda üretilen boy bakır borular, ±%0.5 çap toleransı ve ±%10 et kalınlığı toleransı ile teslim edilir.
        </p>
        <p>
          <strong>Kolay İşlenebilirlik:</strong> Düz form sayesinde kesme, kaynak ve montaj işlemleri hızlı ve hassas yapılabilir. Prefabrikasyon imalatlar için idealdir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Montaj ve Birleştirme</h3>
        <p>
          <strong>Sert Lehim (Brazing):</strong> En yaygın birleştirme yöntemi olan sert lehim, 450°C üzeri sıcaklıklarda gümüş veya fosfor bakır alaşımlı dolgu metalleri ile yapılır.
        </p>
        <p>
          <strong>Pres Bağlantı Sistemleri:</strong> Özel pres fittingsler kullanılarak, ısı kullanmadan güvenli ve hızlı bağlantı yapılabilir.
        </p>
        <p>
          <strong>Mekanik Bağlantılar:</strong> Grooved (yivli) bağlantı sistemleri, büyük çaplı boy bakır borularda hızlı montaj ve demontaj imkanı sağlar.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kalite Kontrol</h3>
        <p>
          Boy bakır borularımız, hidrostatik basınç testi, eddy current testi, ultrasonik et kalınlığı kontrolü ve boyutsal ölçüm kontrollerinden geçirilir. Her parti için malzeme test sertifikası (3.1) düzenlenir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile her ölçüde taleplerinize uygun boy bakır borulara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'yivli-bakir-boru': (
      <>
        <p>
          Yivli bakır borular, iç yüzeyinde özel yiv yapısı bulunan, ısı transfer verimliliğini maksimize eden ileri teknoloji bakır boru sistemleridir. Özellikle yüksek verimlilik gerektiren HVAC sistemlerinde tercih edilmektedir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Yivli Bakır Boru Nedir?</h3>
        <p>
          <strong>Yivli bakır borular</strong>, "Inner Grooved", "Rifled" veya "Enhanced Tube" olarak da adlandırılan, iç yüzeyinde spiral veya helisel formda mikro yivler bulunan bakır borulardır. Bu yiv yapısı, ısı transfer performansını geleneksel düz borulara göre %30-40 oranında artırır.
        </p>
        <p>
          ASTM B359, JIS H3300 ve EN 12735-2 standartlarına uygun olarak üretilen yivli bakır borularımız, %99.9 saflıkta fosfor dezoksidize bakırdan (Cu-DHP) üretilmektedir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Yiv Geometrisi ve Teknik Özellikler</h3>
        <p>
          Yivli bakır borularımızda <strong>yiv yüksekliği 0.15-0.25mm, yiv sayısı 50-70 adet, helis açısı 15-30 derece</strong> aralığında optimize edilmiştir. Bu parametreler, maksimum ısı transfer katsayısı sağlayacak şekilde belirlenmiştir.
        </p>
        <p>
          Yiv profili, üçgen, trapez veya sinüzoidal formda olabilir. Her bir geometri, farklı akışkan türleri ve çalışma koşulları için optimize edilmiştir. Mikro-yiv teknolojisi ile yüzey alanı %50-80 oranında artırılmış, bu da ısı transfer katsayısında önemli iyileşme sağlamıştır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Termodinamik Avantajlar</h3>
        <p>
          <strong>Isı Transfer Artışı:</strong> Yivli yapı, laminer alt tabakayı bozarak türbülans yaratır. Bu durum, konvektif ısı transfer katsayısını 1.5-2.5 kat artırır.
        </p>
        <p>
          <strong>Basınç Düşümü Optimizasyonu:</strong> Yiv geometrisi, ısı transfer artışı sağlarken basınç düşümünü minimize edecek şekilde tasarlanmıştır. Düz borulara göre basınç düşümü artışı %10-20 ile sınırlı tutulmuştur.
        </p>
        <p>
          <strong>İki Fazlı Akış Performansı:</strong> Buharlaşma ve yoğuşma proseslerinde, yivler çekirdeklenme bölgelerini artırır ve sıvı filminin homojen dağılımını sağlar.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kullanım Alanları</h3>
        <p>
          <strong>VRF/VRV Sistemleri:</strong> Değişken soğutucu akışkanlı sistemlerde, yivli bakır borular %25-30 enerji tasarrufu sağlar. Özellikle R410A ve R32 soğutucu gazları ile optimum performans gösterir.
        </p>
        <p>
          <strong>Isı Pompaları:</strong> Hava kaynaklı ve toprak kaynaklı ısı pompalarında, yivli borular COP değerini 4.5-5.5 aralığına yükseltir.
        </p>
        <p>
          <strong>Hassas Kontrollü Klima Sistemleri:</strong> Data center, temiz oda ve medikal alanlarda kullanılan hassas klimalar, yivli borularla ±0.5°C sıcaklık ve ±%2 nem kontrolü sağlayabilir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Montaj ve Bakım</h3>
        <p>
          <strong>Temizlik:</strong> Yivli borular, montaj öncesi özel fırçalar veya kimyasal temizleme ile debris ve oksit tabakasından arındırılmalıdır.
        </p>
        <p>
          <strong>Bükme İşlemleri:</strong> Yivli boruların bükülmesinde, yiv deformasyonunu önlemek için iç mandrel kullanılması zorunludur. Minimum bükme yarıçapı, boru çapının 4 katından az olmamalıdır.
        </p>
        <p>
          <strong>Kaynak:</strong> Yivli borularda genişletme ve bördeleme işlemleri özel aparatlar gerektirir. Soket tipi bağlantılarda, yiv yapısına uygun özel fittingsler kullanılmalıdır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Performans Testleri</h3>
        <p>
          Yivli bakır borularımız, AHRI 700 standardına göre termal performans testleri, ASTM E1004 eddy current testi, 80 bar hidrostatik basınç testi ve boyutsal kontroller ile sertifikalandırılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile yivli bakır borulara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'bakir-pul': (
      <>
        <p>
          Bakır pul ve levhalar, elektrik-elektronik, makine imalat, inşaat ve savunma sanayinde kullanılan, yüksek saflıkta bakırdan haddeleme yöntemiyle üretilen yassı metal ürünlerdir. Mükemmel elektrik iletkenliği ve ısı transfer özellikleri ile öne çıkmaktadır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Bakır Pul Nedir?</h3>
        <p>
          <strong>Bakır pul ve levhalar</strong>, %99.9 saflıkta elektrolitik bakır (Cu-ETP) veya oksijensiz bakır (Cu-OF) hammaddeden haddeleme yöntemiyle üretilen yassı bakır ürünlerdir. DIN EN 13601, ASTM B152 ve JIS C1100 standartlarına uygun olarak üretilmektedir.
        </p>
        <p>
          Ürünlerimiz, hassas toleranslar ve üstün yüzey kalitesi ile elektrik trafolarından elektronik devrelere, mimari uygulamalardan endüstriyel kalıplara kadar geniş bir kullanım alanına sahiptir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Teknik Özellikler</h3>
        <p>
          Bakır pul üretimimiz <strong>0.10mm'den 10mm'ye kadar kalınlık</strong>, <strong>10mm'den 1250mm'ye kadar genişlik</strong> aralığında yapılmaktadır. Levha formatında 2000x1000mm, 2500x1250mm standart ebatlarının yanı sıra, müşteri taleplerine göre özel kesim hizmeti sunulmaktadır.
        </p>
        <p>
          <strong>Farklı Sertlik Dereceleri:</strong> Yumuşak tavlı (O/F), çeyrek sert (1/4H), yarı sert (1/2H) ve tam sert (H) olarak tedarik edilebilir. Yumuşak tavlı ürünler minimum 210 N/mm², tam sert ürünler 360 N/mm² çekme mukavemetine sahiptir.
        </p>
        <p>
          <strong>Elektrik İletkenliği:</strong> Minimum %100 IACS (International Annealed Copper Standard) değerinde elektrik iletkenliği garanti edilir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Bakır Pul Kullanım Alanları</h3>
        <p>
          <strong>Elektrik Trafoları:</strong> Güç ve dağıtım trafolarında sargı malzemesi olarak kullanılan bakır pullar, yüksek elektrik iletkenliği sayesinde enerji kayıplarını minimize eder.
        </p>
        <p>
          <strong>Bara ve Topraklama Sistemleri:</strong> Elektrik panolarında bara olarak kullanılan 3-10mm kalınlığındaki bakır pullar, yüksek akım taşıma kapasitesine sahiptir.
        </p>
        <p>
          <strong>Elektronik Sanayi:</strong> PCB üretiminde, LED soğutucularında, EMI/RFI kalkanlamada kullanılan ince bakır pullar (0.10-0.50mm), mükemmel termal ve elektriksel performans sunar.
        </p>
        <p>
          <strong>Mimari Uygulamalar:</strong> Cephe kaplamaları, çatı örtüleri ve dekoratif elemanlarda kullanılan bakır levhalar, patina oluşumu ile estetik görünüm kazanır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Yüzey İşlemleri</h3>
        <p>
          <strong>Kalay Kaplama:</strong> Lehimlenebilirliği artırmak ve oksidasyon önlemek için 2-10 mikron kalınlığında sıcak daldırma veya elektroliz yöntemiyle kalay kaplama yapılır.
        </p>
        <p>
          <strong>Nikel Kaplama:</strong> Yüksek sıcaklık uygulamaları ve aşınma direnci gerektiren alanlarda 5-25 mikron nikel kaplama uygulanır.
        </p>
        <p>
          <strong>Gümüş Kaplama:</strong> Elektrik kontaklarında ve yüksek frekans uygulamalarında 2-5 mikron gümüş kaplama ile iletkenlik artırılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">İşleme ve Fabrikasyon</h3>
        <p>
          <strong>Kesim:</strong> Lazer, plazma, su jeti veya giyotin makas ile hassas kesim yapılabilir. Lazer kesimde ±0.1mm tolerans sağlanır.
        </p>
        <p>
          <strong>Bükme ve Şekillendirme:</strong> Abkant pres ile 90-180° bükme işlemleri yapılabilir. Minimum bükme yarıçapı, malzeme kalınlığının 1.5 katıdır.
        </p>
        <p>
          <strong>Delme ve Punçlama:</strong> CNC punch veya drill ile delik delme, şekil kesme işlemleri yapılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kalite Kontrol</h3>
        <p>
          Kimyasal analiz, elektrik iletkenlik testi, mekanik testler, yüzey kalitesi kontrolü ve boyutsal kontroller yapılır. Her parti için kalite sertifikası düzenlenir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile bakır pul ve levhalara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'izolasyonlu-bakir-boru': (
      <>
        <p>
          İzolasyonlu bakır borular, fabrika ortamında profesyonel olarak yalıtım uygulanmış, kullanıma hazır bakır boru sistemleridir. Split klima montajları, VRF sistemleri ve soğutma tesisatlarında işçilik ve zaman tasarrufu sağlayan bu ürünler kritik öneme sahiptir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">İzolasyonlu Bakır Boru Nedir?</h3>
        <p>
          <strong>İzolasyonlu bakır borular</strong>, EN 12735-1 standardına uygun bakır boru ve EN 14304 standardına uygun yalıtım malzemesi kullanılarak üretilen, fabrika çıkışlı yalıtım kaplamalı boru sistemleridir.
        </p>
        <p>
          Kapalı hücre yapılı polietilen (PE), genişletilmiş kauçuk köpük (FEF) veya poliüretan (PUR) yalıtım seçenekleri mevcuttur. Enerji verimliliği ve kondenzasyon kontrolü açısından kritik öneme sahiptir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">İzolasyon Malzemeleri</h3>
        <p>
          <strong>Polietilen (PE) Köpük İzolasyon:</strong> Kapalı hücre yapısı ile %95 oranında bağımsız hücre içerir. Isı iletim katsayısı λ = 0.038 W/mK (@20°C), su buharı difüzyon direnci μ ≥ 7000. -80°C ile +105°C sıcaklık aralığında kullanılabilir.
        </p>
        <p>
          <strong>Kauçuk Köpük (FEF) İzolasyon:</strong> Elastomerik yapısı ile mükemmel esneklik sağlar. Isı iletim katsayısı λ = 0.033 W/mK (@0°C), su buharı difüzyon direnci μ ≥ 10000. -50°C ile +110°C sıcaklık aralığında kullanılabilir.
        </p>
        <p>
          <strong>İzolasyon Kalınlıkları:</strong> 6mm, 9mm, 13mm, 19mm ve 25mm standart kalınlıklarda tedarik edilir. EN ISO 12241 standardına göre optimum kalınlık hesaplanır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Teknik Avantajlar</h3>
        <p>
          <strong>Enerji Verimliliği:</strong> Doğru kalınlıkta uygulanan izolasyon, soğutma sistemlerinde %15-25 enerji tasarrufu sağlar.
        </p>
        <p>
          <strong>Kondenzasyon Kontrolü:</strong> Yüzey sıcaklığını çiğ noktası üzerinde tutarak kondenzasyon oluşumunu önler. Bu sayede korozyon, küflenme ve yapısal hasarlar engellenir.
        </p>
        <p>
          <strong>Montaj Hızı:</strong> Sahada izolasyon uygulamasına gerek kalmadığı için montaj süresi %50-60 azalır.
        </p>
        <p>
          <strong>Homojen Kalite:</strong> Fabrika ortamında kontrollü koşullarda uygulanan izolasyon, %100 homojenlik sağlar.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kullanım Alanları</h3>
        <p>
          <strong>Split Klima Sistemleri:</strong> Duvar tipi, kaset tipi, kanallı tip split klimalarda, iç-dış ünite bağlantı hatlarında kullanılır.
        </p>
        <p>
          <strong>VRF/VRV Sistemleri:</strong> Değişken soğutucu akışkanlı sistemlerde, ana dağıtım hatları ve branşman bağlantılarında kullanılır.
        </p>
        <p>
          <strong>Chiller Sistemleri:</strong> Soğutulmuş su hatlarında, pompa odası ve AHU bağlantılarında kondenzasyon kontrolü için kullanılır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Yangın Güvenliği</h3>
        <p>
          <strong>Yangın Sınıfları:</strong> Standart PE izolasyon DIN 4102 B2 sınıfı, yangına dayanıklı FEF izolasyon B1 sınıfı, özel halojensiz malzemeler B-s1,d0 (EN 13501-1) sınıfındadır.
        </p>
        <p>
          <strong>Duman Yoğunluğu:</strong> ASTM E662 standardına göre test edilen ürünlerimiz, Ds ≤ 50 değeri ile düşük duman yayılımı sağlar.
        </p>
        <p>
          <strong>Toksik Gaz Emisyonu:</strong> Halojensiz (HFFR) malzemeler, yanma durumunda toksik gaz çıkarmaz. EN 60754-2 standardına göre pH &gt; 4.3, iletkenlik &lt; 10 μS/mm değerleri sağlanır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Montaj Kuralları</h3>
        <p>
          <strong>Kesim ve Birleştirme:</strong> İzolasyonlu borular, özel boru makası veya ince dişli testere ile kesilmelidir. Kesim sonrası izolasyon uç birleştirmeleri özel yapışkan bant veya soğuk kaynak ile yapılmalıdır.
        </p>
        <p>
          <strong>Askı ve Mesnetleme:</strong> İzolasyonlu borular, izolasyon ezilmesini önleyecek şekilde geniş yüzeyli askılarla desteklenmelidir.
        </p>
        <p>
          <strong>UV Koruması:</strong> Dış mekan uygulamalarında, UV dayanımlı kılıf veya alüminyum/PVC kaplama kullanılmalıdır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kalite Testleri</h3>
        <p>
          Isıl performans testleri, su emme testi, yaşlandırma testleri yapılır. CE işareti, FM Approved, Microban, Greenguard Gold sertifikaları mevcuttur.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile izolasyonlu bakır borulara stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    ),
    'bakir-urunler': (
      <>
        <p>
          Baykasoğlu Bakır A.Ş., yarım asırlık tecrübesi ile Türkiye'nin önde gelen bakır üreticilerinden biridir. HVAC, inşaat, elektrik-elektronik ve endüstriyel sektörlere yüksek kaliteli bakır ürünler sunmaktayız.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Thermapex Hakkında</h3>
        <p>
          1970 yılından bu yana Türkiye'nin lider bakır üreticilerinden biri olarak, modern tesislerimizde uluslararası standartlara uygun üretim yapmaktayız. 50.000 m² kapalı alana sahip tesislerimizde, yıllık 75.000 ton üretim kapasitesi ile hizmet vermekteyiz.
        </p>
        <p>
          ISO 9001:2015, ISO 14001:2015 ve ISO 45001:2018 yönetim sistemleri ile üretim yapan firmamız, Türkiye'nin ilk CE sertifikalı bakır boru üreticisi unvanına sahiptir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Ürün Portföyümüz</h3>
        <p>
          <strong>LWC Bakır Borular:</strong> İklimlendirme ve soğutma sistemleri için özel sarım teknolojisi ile üretilen bakır borular.
        </p>
        <p>
          <strong>Kangal Bakır Borular:</strong> Esnek yapısı ve kolay taşınabilirliği ile montaj kolaylığı sağlayan bakır borular.
        </p>
        <p>
          <strong>Boy Bakır Borular:</strong> Endüstriyel tesisatlar ve merkezi sistemler için rijit yapılı bakır borular.
        </p>
        <p>
          <strong>Yivli Bakır Borular:</strong> İç yüzey yiv teknolojisi ile yüksek ısı transfer performansı sağlayan borular.
        </p>
        <p>
          <strong>Bakır Pul ve Levhalar:</strong> Elektrik, elektronik ve mimari uygulamalar için yassı bakır ürünler.
        </p>
        <p>
          <strong>İzolasyonlu Bakır Borular:</strong> Fabrika çıkışlı yalıtım kaplamalı, montaja hazır bakır boru sistemleri.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Kalite Güvencesi</h3>
        <p>
          Tüm ürünlerimiz, uluslararası standartlara uygun olarak üretilmekte ve kapsamlı kalite kontrol süreçlerinden geçirilmektedir. Her parti için malzeme test sertifikası düzenlenmekte, ürünlerimizin kalitesi garanti altına alınmaktadır.
        </p>
        <p>
          CE uygunluk belgelerimiz ve uluslararası sertifikalarımız, ürünlerimizin kalitesinin güvencesidir. Ar-Ge departmanımız, sürekli olarak yeni ürün geliştirme ve mevcut ürünleri iyileştirme çalışmaları yürütmektedir.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Teknoloji ve İnovasyon</h3>
        <p>
          Modern üretim tesislerimizde, CNC kontrollü üretim hatları ve otomatik kalite kontrol sistemleri kullanılmaktadır. Industry 4.0 prensiplerine uygun olarak, üretim süreçlerimizi dijitalleştirmiş ve IoT sensörler ile gerçek zamanlı izleme sistemleri kurmuşuz.
        </p>
        <p>
          TÜRKAK akreditasyonlu test laboratuvarımızda kimyasal analiz, mekanik testler, korozyon testleri ve termal performans testleri yapılmaktadır.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Sürdürülebilirlik</h3>
        <p>
          Çevre dostu üretim proseslerimiz ile karbon ayak izimizi minimize etmekteyiz. %75 oranında geri dönüştürülmüş bakır kullanımı ile enerji tasarrufu sağlamakta ve çevresel etkilerimizi azaltmaktayız.
        </p>
        <p>
          Kapalı devre su sistemi ile yıllık 500.000 m³ su tasarrufu sağlıyoruz. 10 MW güneş enerjisi santralimiz ile üretim tesislerimizin enerji ihtiyacının önemli bir bölümünü karşılıyoruz.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Müşteri Hizmetleri</h3>
        <p>
          7/24 teknik danışmanlık hattımız, yerinde uygulama desteğimiz ve online eğitim platformumuz ile müşterilerimize kesintisiz hizmet sunmaktayız.
        </p>
        <p>
          B2B e-ticaret platformumuz ve mobil uygulamamız ile anlık stok ve fiyat bilgisine erişim sağlıyoruz. QR kod ile ürün takibi ve kalite sertifikalarına erişim mümkündür.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Global Erişim</h3>
        <p>
          45 ülkeye düzenli ihracat yapıyor, 5 kıtada 150+ distribütörümüz bulunmaktadır. Avrupa, Orta Doğu ve Afrika'da bölgesel depolarımız mevcuttur.
        </p>
        <p>
          15.000 ton kapasiteli otomatik depo sistemimiz, RFID ile stok takibi ve 48 saat içinde Türkiye geneli teslimat imkanımız ile hızlı ve güvenilir hizmet sunmaktayız.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Nasıl Satın Alırım?</h3>
        <p>
          Thermapex güvencesi ile tüm bakır ürünlerimize stoktan anında teslim avantajı ile sahip olabilirsiniz. Bizimle irtibata geçmek için iletişim sayfamızdan faydalanabilirsiniz. İster telefon numaralarımızdan, ister mail adresimizden isterseniz de whatsapp üzerinden bizlere 7/24 taleplerinizi iletebilirsiniz.
        </p>
      </>
    )
  };

  // Varsayılan içerik
  return seoContents[shortSlug] || (
    <>
      <p>
        <strong>Baykasoğlu Bakır A.Ş.</strong>, yüksek kaliteli bakır ürünleri ile sektörde öncü konumda bulunmaktadır.
        Bu kategorideki ürünlerimiz, uluslararası standartlara uygun olarak üretilmekte ve çeşitli endüstriyel uygulamalarda güvenle kullanılmaktadır.
      </p>
      <p>
        Ürünlerimiz, modern üretim tesislerimizde, deneyimli ekibimiz tarafından titizlikle üretilmekte ve kalite kontrol süreçlerinden geçirilmektedir.
        Müşteri memnuniyeti odaklı yaklaşımımız ve güvenilir teslimat süreçlerimiz ile projelerinizde çözüm ortağınız olmaktan gurur duyuyoruz.
      </p>
      <p>
        Detaylı bilgi ve fiyat teklifi için bizimle iletişime geçebilirsiniz. 7/24 teknik destek hattımız hizmetinizdedir.
      </p>
    </>
  );
}