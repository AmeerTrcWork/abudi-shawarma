import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaMapSigns,
  FaPhoneAlt,
  FaStar,
  FaUtensils,
  FaWhatsapp,
} from 'react-icons/fa'
import './App.css'

type Lang = 'pt' | 'ar' | 'en'

type Translation = {
  nav: { home: string; menu: string; about: string; location: string; contact: string }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    ctaTertiary: string
  }
  intro: {
    label: string
    heading: string
    text: string
  }
  highlights: { label: string; title: string; prefix: string }
  menu: {
    label: string
    heading: string
    note: string
    items: Array<{ name: string; description: string; tag: string }>
  }
  story: {
    label: string
    heading: string
    text: string
  }
  gallery: { label: string; heading: string }
  reviews: { label: string; heading: string; note: string }
  location: { label: string; heading: string; text: string }
  contact: { label: string; heading: string; text: string }
  footer: string
  address: string
  phone: string
  hours: string
  city: string
}

const translations: Record<Lang, Translation> = {
  pt: {
    nav: { home: 'Início', menu: 'Cardápio', about: 'Sobre', location: 'Localização', contact: 'Contato' },
    hero: {
      eyebrow: 'Comida síria em São Paulo',
      title: 'ABOUD SÍRIA',
      subtitle: 'Autêntico sabor sírio no coração de São Paulo.',
      ctaPrimary: 'Ver cardápio',
      ctaSecondary: 'Como chegar',
      ctaTertiary: 'Falar conosco',
    },
    intro: {
      label: 'Destaques',
      heading: 'Um conceito de sabor, tradição e acolhimento.',
      text:
        'O projeto apresenta uma proposta visual premium para um restaurante sírio/árabe localizado no Centro Histórico de São Paulo. As informações públicas disponíveis foram tratadas com cautela e mantidas verificáveis.',
    },
    highlights: { label: 'Mais pedidos', title: 'A base do convite', prefix: 'Menu' },
    menu: {
      label: 'Cardápio',
      heading: 'Sabores reconhecíveis e memoráveis.',
      note: 'Os itens abaixo são referências visuais do estilo e da identidade do espaço, com foco em pratos com forte presença no perfil do restaurante.',
      items: [
        { name: 'Shawarma', description: 'Clássico, fragrante e encorpado.', tag: 'Top seller' },
        { name: 'Falafel', description: 'Fritura crocante com sabor marcante.', tag: 'Veggie' },
        { name: 'Kibe', description: 'Tradição e textura que marcam a casa.', tag: 'Clássico' },
        { name: 'Baklava', description: 'Doce de tradição árabe com textura refinada.', tag: 'Sobremesa' },
      ],
    },
    story: {
      label: 'Sobre o Aboud Siria',
      heading: 'Um restaurante que une cultura, cheiro e convivência.',
      text:
        'Com referência ao centro histórico de São Paulo, a proposta visual busca responder ao público que procura comida síria, experiência acolhedora e presença forte na cidade.',
    },
    gallery: { label: 'Galeria', heading: 'A atmosfera da casa em imagem.' },
    reviews: {
      label: 'Avaliações',
      heading: 'Prova social com presença urbana.',
      note: 'A experiência de avaliação pública foi tratada com ressalva e sem números inventados.',
    },
    location: {
      label: 'Localização',
      heading: 'No coração do Centro Histórico.',
      text: 'Endereço público informado: Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010.',
    },
    contact: {
      label: 'Contato',
      heading: 'Pronto para receber clientes e pedidos.',
      text: 'Contato informado publicamente com foco em WhatsApp, mapas e ligação direta.',
    },
    footer: 'Projeto demonstrativo independente — desenvolvido por AmeerTrc.',
    address: 'Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010',
    phone: '(11) 95842-1962',
    hours: 'Horário: sob confirmação em fontes públicas',
    city: 'São Paulo - SP',
  },
  ar: {
    nav: { home: 'الرئيسية', menu: 'القائمة', about: 'عنا', location: 'الموقع', contact: 'تواصل' },
    hero: {
      eyebrow: 'مأكولات سورية في ساو باولو',
      title: 'ABOUD SÍRIA',
      subtitle: 'نكهة سورية أصيلة في قلب ساو باولو.',
      ctaPrimary: 'عرض القائمة',
      ctaSecondary: 'كيف تصل',
      ctaTertiary: 'تواصل معنا',
    },
    intro: {
      label: 'أبرز العناصر',
      heading: 'هوية تجمع بين النكهات والتقاليد والدفء.',
      text:
        'هذا المشروع يقدّم مفهومًا بصريًا فاخرًا لمطعم سوري/عربي في Centro Histórico de São Paulo، مع إبقاء المعلومات المعلنة قريبة من التحقق وعدم إدراج حقائق غير مؤكدة.',
    },
    highlights: { label: 'الأكثر طلبًا', title: 'أساس الدعوة', prefix: 'القائمة' },
    menu: {
      label: 'القائمة',
      heading: 'أطباق معروفة ومحبوبة.',
      note: 'العناصر أدناه تمثل الإطار المعماري البصري للقائمة، مع التركيز على أطباق مرتبطة بشكل واضح بالمطعم.',
      items: [
        { name: 'الشاورما', description: 'كلاسيكية، معطرة، ومشبعة.', tag: 'الأكثر طلبًا' },
        { name: 'الفلافل', description: 'مقرمشة ومليئة بالنكهة.', tag: 'خضار' },
        { name: 'الكبة', description: 'تراث عربي يبرز في كل قضمة.', tag: 'كلاسيكي' },
        { name: 'البقلاوة', description: 'حلوى تقليدية بلمسة أنيقة.', tag: 'حلوى' },
      ],
    },
    story: {
      label: 'عن أبوود سوريا',
      heading: 'مطعم يضم الثقافة والدفء والهوية.',
      text:
        'بروح Centro Histórico de São Paulo، يركز هذا العرض البصري على الزبائن الباحثين عن مأكولات سورية وتجربة مميزة في المدينة.',
    },
    gallery: { label: 'المعرض', heading: 'جو المطعم من خلال الصور.' },
    reviews: {
      label: 'التقييمات',
      heading: 'دليل اجتماعي قوي في المدينة.',
      note: 'تم التعامل مع تقييمات Google بعناية ودون إدراج رقم غير موثّق.',
    },
    location: {
      label: 'الموقع',
      heading: 'في قلب Centro Histórico.',
      text: 'العنوان المعلن: Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010.',
    },
    contact: {
      label: 'التواصل',
      heading: 'جاهز لاستقبال العملاء والطلبات.',
      text: 'تمت الإشارة إلى الهاتف وWhatsApp والخريطة كوسائل اتصال مباشرة.',
    },
    footer: 'مشروع توضيحي مستقل — تم تطويره بواسطة AmeerTrc.',
    address: 'Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010',
    phone: '(11) 95842-1962',
    hours: 'ساعات العمل: تحت التأكيد في المصادر العامة',
    city: 'ساو باولو - SP',
  },
  en: {
    nav: { home: 'Home', menu: 'Menu', about: 'About', location: 'Location', contact: 'Contact' },
    hero: {
      eyebrow: 'Syrian food in São Paulo',
      title: 'ABOUD SÍRIA',
      subtitle: 'Authentic Syrian flavor in the heart of São Paulo.',
      ctaPrimary: 'View menu',
      ctaSecondary: 'How to get there',
      ctaTertiary: 'Contact us',
    },
    intro: {
      label: 'Highlights',
      heading: 'A visual concept built around flavor, tradition and warmth.',
      text:
        'This concept presents a premium visual proposal for a Syrian/Arabic restaurant in the historical center of São Paulo using only publicly verifiable information and clear disclaimers.',
    },
    highlights: { label: 'Best sellers', title: 'The heart of the invitation', prefix: 'Menu' },
    menu: {
      label: 'Menu',
      heading: 'Recognizable and memorable flavors.',
      note: 'The items below represent the visual identity and culinary profile associated with the restaurant while keeping the presentation cautious and non-fabricated.',
      items: [
        { name: 'Shawarma', description: 'Classic, fragrant and comforting.', tag: 'Top seller' },
        { name: 'Falafel', description: 'Crisp, savory and iconic.', tag: 'Vegetarian' },
        { name: 'Kibe', description: 'A traditional staple with strong character.', tag: 'Classic' },
        { name: 'Baklava', description: 'A refined sweet from Arabic tradition.', tag: 'Dessert' },
      ],
    },
    story: {
      label: 'About Aboud Siria',
      heading: 'A space where culture and hospitality meet.',
      text:
        'Inspired by the historic center of São Paulo, this visual concept targets customers looking for Syrian food, warm service and a strong local identity.',
    },
    gallery: { label: 'Gallery', heading: 'The atmosphere and personality of the place.' },
    reviews: {
      label: 'Reviews',
      heading: 'Social proof in a vibrant urban setting.',
      note: 'Public review presence is acknowledged without claiming a speculative score.',
    },
    location: {
      label: 'Location',
      heading: 'In the heart of the historic center.',
      text: 'Address publicly listed: Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010.',
    },
    contact: {
      label: 'Contact',
      heading: 'Ready to welcome guests and orders.',
      text: 'Direct phone, WhatsApp and map access are used as practical conversion tools in this demo.',
    },
    footer: 'Independent demonstrative project — developed by AmeerTrc.',
    address: 'Lg. do Paissandú, 55 - Centro Histórico de São Paulo, São Paulo - SP, 01034-010',
    phone: '(11) 95842-1962',
    hours: 'Opening hours: subject to public confirmation',
    city: 'São Paulo - SP',
  },
}

const galleryImages = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
]

const schemaRestaurant = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Aboud Siria',
  description:
    'Demonstrative restaurant concept inspired by Syrian cuisine in São Paulo, Brazil.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lg. do Paissandú, 55',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01034-010',
    addressCountry: 'BR',
  },
  telephone: '+55-11-95842-1962',
  servesCuisine: ['Arabic', 'Syrian'],
  areaServed: 'São Paulo',
  priceRange: 'Moderate',
  sameAs: [],
}

function App() {
  const [lang, setLang] = useState<Lang>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const current = useMemo(() => translations[lang], [lang])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const menuCards = current.menu.items

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaRestaurant) }} />
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">AS</div>
          <div>
            <span className="brand-name">Aboud Siria</span>
            <small>{current.city}</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">{current.nav.home}</a>
          <a href="#menu">{current.nav.menu}</a>
          <a href="#about">{current.nav.about}</a>
          <a href="#location">{current.nav.location}</a>
          <a href="#contact">{current.nav.contact}</a>
        </nav>

        <div className="lang-switcher" aria-label="Language switcher">
          {(['pt', 'ar', 'en'] as Lang[]).map((option) => (
            <button
              key={option}
              type="button"
              className={option === lang ? 'active' : ''}
              onClick={() => setLang(option)}
              aria-label={`Switch language to ${option}`}
            >
              {option === 'pt' ? 'PT' : option === 'ar' ? 'AR' : 'EN'}
            </button>
          ))}
        </div>
      </header>

      <main id="home">
        <section className="hero-section">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="eyebrow">{current.hero.eyebrow}</span>
            <h1>{current.hero.title}</h1>
            <p>{current.hero.subtitle}</p>
            <div className="cta-row">
              <a href="#menu" className="primary-btn">
                {current.hero.ctaPrimary} <FaArrowRight />
              </a>
              <a href="#location" className="secondary-btn">
                {current.hero.ctaSecondary}
              </a>
              <a href="https://wa.me/5511958421962" className="tertiary-btn" target="_blank" rel="noreferrer">
                {current.hero.ctaTertiary}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-card card-top">
              <FaUtensils />
              <span>{current.highlights.label}</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
              alt="Plates of Syrian cuisine styled for a modern restaurant landing page"
            />
            <div className="hero-card card-bottom">
              <span>{current.highlights.prefix}</span>
              <strong>{current.highlights.title}</strong>
            </div>
          </motion.div>
        </section>

        <section className="info-band">
          <div>
            <FaMapMarkerAlt />
            <span>{current.address}</span>
          </div>
          <div>
            <FaPhoneAlt />
            <span>{current.phone}</span>
          </div>
          <div>
            <FaClock />
            <span>{current.hours}</span>
          </div>
        </section>

        <section className="feature-intro" id="about">
          <div className="section-tag">{current.intro.label}</div>
          <h2>{current.intro.heading}</h2>
          <p>{current.intro.text}</p>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-head">
            <div>
              <span className="section-tag">{current.menu.label}</span>
              <h2>{current.menu.heading}</h2>
            </div>
            <a href="#contact" className="text-link">{current.hero.ctaPrimary}</a>
          </div>

          <p className="menu-note">{current.menu.note}</p>

          <div className="menu-grid">
            {menuCards.map((item, index) => (
              <motion.article
                key={item.name}
                className="menu-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="menu-image-wrap">
                  <img
                    src={galleryImages[index % galleryImages.length]}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="menu-body">
                  <span>{item.tag}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="story-panel image-panel">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80"
              alt="Dining room experience for a Syrian restaurant concept"
              loading="lazy"
            />
          </div>
          <div className="story-panel text-panel">
            <span className="section-tag">{current.story.label}</span>
            <h2>{current.story.heading}</h2>
            <p>{current.story.text}</p>
            <ul>
              <li>Syrian / Arabic cuisine inspired</li>
              <li>Warm hospitality and urban context</li>
              <li>Premium visual identity for a pitch proposal</li>
            </ul>
          </div>
        </section>

        <section className="gallery-section">
          <div className="section-head simple">
            <div>
              <span className="section-tag">{current.gallery.label}</span>
              <h2>{current.gallery.heading}</h2>
            </div>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <figure key={src + index} className="gallery-item">
                <img src={src} alt="Restaurant interior and food photography for visual concept" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="review-section">
          <div className="section-tag">{current.reviews.label}</div>
          <h2>{current.reviews.heading}</h2>
          <p>{current.reviews.note}</p>
          <div className="review-card">
            <div className="stars" aria-label="Google reviews rating placeholder">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <strong>Google reviews</strong>
            <small>Public feedback presence represented in a mockup format without unverifiable precision.</small>
          </div>
        </section>

        <section className="location-section" id="location">
          <div className="location-copy">
            <span className="section-tag">{current.location.label}</span>
            <h2>{current.location.heading}</h2>
            <p>{current.location.text}</p>
            <div className="contact-list">
              <div>
                <FaMapMarkerAlt />
                <span>{current.address}</span>
              </div>
              <div>
                <FaPhoneAlt />
                <a href="tel:+5511958421962">{current.phone}</a>
              </div>
              <div>
                <FaMapSigns />
                <a href="https://www.google.com/maps/search/?api=1&query=Lg.+do+Paissandú,+55+-+Centro+Histórico+de+São+Paulo,+São+Paulo+-+SP,+01034-010" target="_blank" rel="noreferrer">
                  Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="map-card">
            <iframe
              title="Aboud Siria map"
              src="https://www.google.com/maps?q=Lg.%20do%20Paissand%C3%BA,%2055%20-%20Centro%20Hist%C3%B3rico%20de%20S%C3%A3o%20Paulo,%20S%C3%A3o%20Paulo%20-%20SP,%2001034-010&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-tag">{current.contact.label}</div>
          <h2>{current.contact.heading}</h2>
          <p>{current.contact.text}</p>

          <div className="contact-actions">
            <a href="tel:+5511958421962" className="primary-btn">
              <FaPhoneAlt /> {current.phone}
            </a>
            <a href="https://wa.me/5511958421962" className="secondary-btn" target="_blank" rel="noreferrer">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Lg.+do+Paissandú,+55+-+Centro+Histórico+de+São+Paulo,+São+Paulo+-+SP,+01034-010" className="tertiary-btn" target="_blank" rel="noreferrer">
              <FaMapSigns /> {current.hero.ctaSecondary}
            </a>
          </div>

          <div className="social-strip">
            <button type="button" className="social-button disabled" aria-label="Instagram not confirmed publicly">
              <FaInstagram /> Instagram
            </button>
            <button type="button" className="social-button disabled" aria-label="Facebook not confirmed publicly">
              <FaFacebookF /> Facebook
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{current.footer}</p>
      </footer>

      {!mounted && <div className="loading-screen" aria-hidden="true" />}
    </div>
  )
}

export default App
