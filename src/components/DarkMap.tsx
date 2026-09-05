import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { FaCompass, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa'

interface DarkMapProps {
  lang: 'pt' | 'ar' | 'en'
}

const LAT = -23.5427429
const LNG = -46.6385625

export const DarkMap = ({ lang }: DarkMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  const t = {
    pt: {
      tag: 'Localização Privilegiada',
      title: 'No Coração do Centro Histórico',
      subtitle: 'Em frente à Galeria do Rock e a poucos minutos das estações São Bento e República do Metrô.',
      addressLabel: 'Endereço',
      addressValue: 'Largo do Paissandú, 55 - Centro Histórico, São Paulo - SP, 01034-010',
      hoursLabel: 'Horário de Atendimento',
      hoursValue: 'Segunda a Sábado: 09:00 às 20:00 (Domingos: Fechado)',
      metroLabel: 'Como Chegar de Metrô',
      metroValue: 'Estação São Bento (Linha 1-Azul) ou República (Linhas 3-Vermelha e 4-Amarela)',
      directionsBtn: 'Abrir no Google Maps',
      wazeBtn: 'Navegar com Waze',
      uberBtn: 'Pedir Uber para cá',
      mapTooltip: 'Aboud Síria — Clique para traçar rota',
    },
    ar: {
      tag: 'موقع مميز',
      title: 'في قلب المركز التاريخي لساو باولو',
      subtitle: 'أمام Galeria do Rock مباشرة وعلى بعد خطوات من محطتي مترو São Bento و República.',
      addressLabel: 'العنوان',
      addressValue: 'Largo do Paissandú, 55 - Centro Histórico, São Paulo - SP, 01034-010',
      hoursLabel: 'أوقات العمل',
      hoursValue: 'من الإثنين إلى السبت: 09:00 صباحاً حتى 20:00 مساءً (الأحد مغلق)',
      metroLabel: 'الوصول بالمترو',
      metroValue: 'محطة São Bento (الخط الأزرق 1) أو República (الخط الأحمر 3 والأصفر 4)',
      directionsBtn: 'فتح في خرائط Google',
      wazeBtn: 'التوجيه عبر Waze',
      uberBtn: 'طلب أوبر إلى المطعم',
      mapTooltip: 'أبوود سوريا — انقر للحصول على الاتجاهات',
    },
    en: {
      tag: 'Prime Location',
      title: 'In the Heart of Historic São Paulo',
      subtitle: 'Right in front of Galeria do Rock and steps away from São Bento and República Subway Stations.',
      addressLabel: 'Address',
      addressValue: 'Largo do Paissandú, 55 - Historic Center, São Paulo - SP, 01034-010',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Monday to Saturday: 09:00 AM – 08:00 PM (Sundays: Closed)',
      metroLabel: 'Subway Access',
      metroValue: 'São Bento Station (Blue Line 1) or República Station (Red Line 3 & Yellow Line 4)',
      directionsBtn: 'Open in Google Maps',
      wazeBtn: 'Navigate with Waze',
      uberBtn: 'Request Uber here',
      mapTooltip: 'Aboud Siria — Click for directions',
    },
  }[lang]

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    // Initialize Map with dark tiles
    const map = L.map(mapContainerRef.current, {
      center: [LAT, LNG],
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true,
    })

    mapInstanceRef.current = map

    // CartoDB Dark Matter tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    // Custom Pulse Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-map-marker-container',
      html: `
        <div class="custom-pulse-marker">
          <div class="pulse-ring"></div>
          <div class="pulse-core">
            <span class="marker-logo">🇸🇾</span>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -24],
    })

    const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map)

    const popupContent = `
      <div class="map-popup-card">
        <div class="popup-badge">🇸🇾 Restaurante Sírio Autêntico</div>
        <h4>Aboud Síria</h4>
        <p class="popup-addr">Lg. do Paissandú, 55 - Centro Histórico</p>
        <p class="popup-landmark">📍 Em frente à Galeria do Rock</p>
        <a href="https://www.google.com/maps/search/?api=1&query=Lg.+do+Paissandú,+55+-+Centro+Histórico+de+São+Paulo,+São+Paulo+-+SP,+01034-010" target="_blank" rel="noreferrer" class="popup-btn">
          ${t.directionsBtn} &rarr;
        </a>
      </div>
    `

    marker.bindPopup(popupContent, {
      className: 'dark-leaflet-popup',
      closeButton: true,
    }).openPopup()

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [t.directionsBtn])

  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Lg.+do+Paissandú,+55+-+Centro+Histórico+de+São+Paulo,+São+Paulo+-+SP,+01034-010'
  const wazeUrl = 'https://waze.com/ul?ll=-23.5427429,-46.6385625&navigate=yes'
  const uberUrl = 'https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-23.5427429&dropoff[longitude]=-46.6385625&dropoff[nickname]=Aboud%20Siria'

  return (
    <div className="dark-map-wrapper">
      <div className="map-canvas-container">
        <div ref={mapContainerRef} className="map-leaflet-canvas" aria-label="Interactive Map of Aboud Siria" />
        <div className="map-ambient-vignette" />
      </div>

      <div className="map-info-floating-panel">
        <div className="panel-header">
          <span className="section-tag-gold">
            <FaMapMarkerAlt /> {t.tag}
          </span>
          <h3>{t.title}</h3>
          <p className="panel-sub">{t.subtitle}</p>
        </div>

        <div className="panel-grid">
          <div className="panel-item">
            <span className="item-label">{t.addressLabel}</span>
            <p className="item-text font-bold">{t.addressValue}</p>
          </div>

          <div className="panel-item">
            <span className="item-label">{t.hoursLabel}</span>
            <p className="item-text highlight-gold">{t.hoursValue}</p>
          </div>

          <div className="panel-item">
            <span className="item-label">{t.metroLabel}</span>
            <p className="item-text">{t.metroValue}</p>
          </div>
        </div>

        <div className="panel-actions">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="map-action-btn primary">
            <FaExternalLinkAlt /> {t.directionsBtn}
          </a>
          <a href={wazeUrl} target="_blank" rel="noreferrer" className="map-action-btn secondary">
            <FaCompass /> {t.wazeBtn}
          </a>
          <a href={uberUrl} target="_blank" rel="noreferrer" className="map-action-btn tertiary">
            🚗 {t.uberBtn}
          </a>
        </div>
      </div>
    </div>
  )
}
