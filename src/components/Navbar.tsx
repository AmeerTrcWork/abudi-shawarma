import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

export type Lang = 'pt' | 'ar' | 'en'

interface NavbarProps {
  lang: Lang
  onLangChange: (newLang: Lang) => void
}

export const Navbar = ({ lang, onLangChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLabels = {
    pt: {
      home: 'Início',
      menu: 'Cardápio',
      story: 'Tradição',
      gallery: 'Galeria',
      reviews: 'Avaliações',
      location: 'Localização',
      contact: 'Contato',
      status: 'Aberto Hoje até 20h',
      orderBtn: 'Pedir no WhatsApp',
      city: 'Centro Histórico • São Paulo',
    },
    ar: {
      home: 'الرئيسية',
      menu: 'القائمة',
      story: 'أصالتنا',
      gallery: 'المعرض',
      reviews: 'التقييمات',
      location: 'الموقع',
      contact: 'التواصل',
      status: 'مفتوح اليوم حتى 20:00',
      orderBtn: 'اطلب عبر واتساب',
      city: 'المركز التاريخي • ساو باولو',
    },
    en: {
      home: 'Home',
      menu: 'Menu',
      story: 'Tradition',
      gallery: 'Gallery',
      reviews: 'Reviews',
      location: 'Location',
      contact: 'Contact',
      status: 'Open Today until 8 PM',
      orderBtn: 'Order on WhatsApp',
      city: 'Historic Center • São Paulo',
    },
  }[lang]

  const navLinks = [
    { href: '#home', label: navLabels.home },
    { href: '#menu', label: navLabels.menu },
    { href: '#story', label: navLabels.story },
    { href: '#gallery', label: navLabels.gallery },
    { href: '#reviews', label: navLabels.reviews },
    { href: '#location', label: navLabels.location },
    { href: '#contact', label: navLabels.contact },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a href="#home" className="navbar-brand" onClick={handleLinkClick}>
          <div className="brand-badge-emblem">
            <span className="brand-letters">AS</span>
            <span className="brand-syria-pill">🇸🇾</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">ABOUD SÍRIA</span>
            <span className="brand-subtitle">
              <FaMapMarkerAlt /> {navLabels.city}
            </span>
          </div>
        </a>

        {/* Live Status Pill (Desktop) */}
        <div className="live-status-pill hidden-mobile">
          <span className="status-dot"></span>
          <FaClock className="status-icon" />
          <span>{navLabels.status}</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link-item">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Lang Switcher & WhatsApp CTA */}
        <div className="navbar-actions">
          <div className="language-selector" role="radiogroup" aria-label="Language Selector">
            {(['pt', 'ar', 'en'] as Lang[]).map((opt) => (
              <button
                key={opt}
                type="button"
                className={`lang-btn ${lang === opt ? 'active' : ''}`}
                onClick={() => onLangChange(opt)}
                aria-checked={lang === opt}
                role="radio"
              >
                {opt === 'pt' ? 'PT' : opt === 'ar' ? 'العربية' : 'EN'}
              </button>
            ))}
          </div>

          <a
            href="https://wa.me/5511958421962?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Aboud%20S%C3%ADria."
            target="_blank"
            rel="noreferrer"
            className="navbar-order-btn hidden-mobile"
          >
            <FaWhatsapp className="whatsapp-icon" />
            <span>{navLabels.orderBtn}</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-drawer-inner">
              <div className="mobile-status-row">
                <span className="status-dot"></span>
                <span>{navLabels.status}</span>
              </div>

              <nav className="mobile-links-list">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="mobile-nav-item"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mobile-drawer-footer">
                <div className="mobile-lang-row">
                  {(['pt', 'ar', 'en'] as Lang[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`lang-btn ${lang === opt ? 'active' : ''}`}
                      onClick={() => {
                        onLangChange(opt)
                        setMobileMenuOpen(false)
                      }}
                    >
                      {opt === 'pt' ? 'Português' : opt === 'ar' ? 'العربية' : 'English'}
                    </button>
                  ))}
                </div>

                <a
                  href="https://wa.me/5511958421962?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Aboud%20S%C3%ADria."
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-cta-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaWhatsapp />
                  <span>{navLabels.orderBtn}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
