import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export interface LightboxImage {
  src: string
  title: string
  subtitle: string
  tag: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  useEffect(() => {
    if (currentIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [currentIndex, onClose, onNext, onPrev])

  if (currentIndex === null || !images[currentIndex]) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <FaTimes />
        </button>

        <button
          type="button"
          className="lightbox-nav-btn prev"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>

        <button
          type="button"
          className="lightbox-nav-btn next"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>

        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lightbox-image-frame">
            <img src={currentImage.src} alt={currentImage.title} />
          </div>

          <div className="lightbox-caption">
            <div className="caption-tag">{currentImage.tag}</div>
            <h3>{currentImage.title}</h3>
            <p>{currentImage.subtitle}</p>
            <span className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
