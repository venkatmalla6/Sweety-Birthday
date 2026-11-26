import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RotateCcw, X, Grid, Eye, FastForward } from 'lucide-react'

export interface CelebrationPhotoItem {
  id: string
  src: string
  title: string
  date: string
  tag: string
}

// Exactly 20 Milestone Photos for the 20 Spherical Balls
export const CELEBRATION_20_PHOTOS: CelebrationPhotoItem[] = [
  { id: 'photo-02', src: './photos/02-first-birthday-memory.jpg', title: 'First Birthday Smiles', date: 'Baby Milestone', tag: '01' },
  { id: 'photo-01', src: './photos/01-hero-childhood-portrait.jpg', title: 'The Little Star', date: 'Studio Days', tag: '02' },
  { id: 'photo-03', src: './photos/03-childhood-purple-jacket.jpg', title: 'Little Explorer', date: 'Growing Years', tag: '03' },
  { id: 'photo-04', src: './photos/04-classical-dance-portrait.jpg', title: 'Kuchipudi Devotion', date: 'Dance Heritage', tag: '04' },
  { id: 'photo-07', src: './photos/07-classical-dance-costume.jpg', title: 'Classical Splendor', date: 'Stage Radiance', tag: '05' },
  { id: 'photo-06', src: './photos/06-playful-traditional-portrait.jpg', title: 'Playful Charm', date: 'Traditional Poise', tag: '06' },
  { id: 'photo-10', src: './photos/10-guitar-memory.jpg', title: 'Winter Rhythm & Guitar', date: 'Musical Spark', tag: '07' },
  { id: 'photo-09', src: './photos/09-elegant-white-portrait.jpg', title: 'Serenity in White', date: 'Graceful Poise', tag: '08' },
  { id: 'photo-11', src: './photos/11-saree-memory.jpg', title: 'Timeless Saree Grace', date: 'Festive Charm', tag: '09' },
  { id: 'photo-12', src: './photos/12-playful-closeup.jpg', title: 'Playful Sparkle & Pout', date: 'Candid Gaze', tag: '10' },
  { id: 'photo-05', src: './photos/05-festive-black-outfit.jpg', title: 'Elegance in Black', date: 'Signature Style', tag: '11' },
  { id: 'photo-08', src: './photos/08-birthday-stage-memory.jpg', title: 'Evening Star in Black', date: 'Celebration Stage', tag: '12' },
  { id: 'photo-18', src: './photos/18-playful-casual-radiance.jpg', title: 'Carefree Casual Sparkle', date: 'Daily Radiance', tag: '13' },
  { id: 'photo-19', src: './photos/19-chic-mirror-reflection.jpg', title: 'Chic Mirror Reflection', date: 'Urban Aesthetic', tag: '14' },
  { id: 'photo-15', src: './photos/15-expressive-bangles-portrait.jpg', title: 'Silver Bangles & Expressive Eyes', date: 'Soulful Look', tag: '15' },
  { id: 'photo-16', src: './photos/16-outdoor-jhumka-poise.jpg', title: 'Outdoor Jhumka Poise', date: 'Graceful Breeze', tag: '16' },
  { id: 'photo-17', src: './photos/17-nature-pathway-grace.jpg', title: 'Serene Green Avenue', date: 'Nature Walk', tag: '17' },
  { id: 'photo-14', src: './photos/14-traditional-gold-saree.jpg', title: 'Royal Gold Saree Milestone', date: 'Golden Milestone', tag: '18' },
  { id: 'photo-20', src: './photos/20-autumn-trench-milestone.jpg', title: 'Parisian Autumn Dreams', date: 'Paris Aesthetic', tag: '19' },
  { id: 'photo-13', src: './photos/13-floral-celebration-portrait.jpg', title: 'Floral Radiance Finale', date: 'Birthday Finale', tag: '20' },
]

export interface BallCoord {
  letter: string
  letterX: number
  letterY: number
  floorX: number
  floorY: number
}

// 20 Exact Coordinates: 3 for S, 5 for W, 3 for E, 3 for E, 3 for T, 3 for Y = 20 balls!
export const SWEETY_BALL_COORDS: BallCoord[] = [
  // Letter S (3 balls)
  { letter: 'S', letterX: 13, letterY: 22, floorX: 5.0, floorY: 77 },
  { letter: 'S', letterX: 7.5, letterY: 46, floorX: 9.6, floorY: 81 },
  { letter: 'S', letterX: 13, letterY: 70, floorX: 14.2, floorY: 77 },

  // Letter W (5 balls)
  { letter: 'W', letterX: 19, letterY: 22, floorX: 18.8, floorY: 81 },
  { letter: 'W', letterX: 22.5, letterY: 70, floorX: 23.4, floorY: 77 },
  { letter: 'W', letterX: 26, letterY: 42, floorX: 28.0, floorY: 81 },
  { letter: 'W', letterX: 29.5, letterY: 70, floorX: 32.6, floorY: 77 },
  { letter: 'W', letterX: 33, letterY: 22, floorX: 37.2, floorY: 81 },

  // Letter E1 (3 balls)
  { letter: 'E', letterX: 45, letterY: 22, floorX: 41.8, floorY: 77 },
  { letter: 'E', letterX: 43.5, letterY: 46, floorX: 46.4, floorY: 81 },
  { letter: 'E', letterX: 45, letterY: 70, floorX: 51.0, floorY: 77 },

  // Letter E2 (3 balls)
  { letter: 'E', letterX: 58, letterY: 22, floorX: 55.6, floorY: 81 },
  { letter: 'E', letterX: 56.5, letterY: 46, floorX: 60.2, floorY: 77 },
  { letter: 'E', letterX: 58, letterY: 70, floorX: 64.8, floorY: 81 },

  // Letter T (3 balls)
  { letter: 'T', letterX: 66, letterY: 22, floorX: 69.4, floorY: 77 },
  { letter: 'T', letterX: 76, letterY: 22, floorX: 74.0, floorY: 81 },
  { letter: 'T', letterX: 71, letterY: 70, floorX: 78.6, floorY: 77 },

  // Letter Y (3 balls)
  { letter: 'Y', letterX: 82.5, letterY: 22, floorX: 83.2, floorY: 81 },
  { letter: 'Y', letterX: 93.5, letterY: 22, floorX: 87.8, floorY: 77 },
  { letter: 'Y', letterX: 88, letterY: 70, floorX: 92.4, floorY: 81 },
]

interface SkyCelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenPhoto: (id: string) => void
}

type CelebrationPhase = 'bouncing' | 'forming_sweety' | 'all_photos_grid'

export const SkyCelebrationModal: React.FC<SkyCelebrationModalProps> = ({
  isOpen,
  onClose,
  onOpenPhoto,
}) => {
  const [phase, setPhase] = useState<CelebrationPhase>('bouncing')
  const [visibleBalls, setVisibleBalls] = useState<number>(1)
  const [hoveredPhoto, setHoveredPhoto] = useState<CelebrationPhotoItem | null>(null)
  const timerRef = useRef<number | null>(null)

  // Web Audio celebratory starlight chime when SWEETY forms
  const playStarlightChimes = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12)
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12)
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.12)
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3)
      })
    } catch {
      // AudioContext policy handled
    }
  }

  // Master Sequential Release Timer: Drops 20 balls one by one onto the floor
  useEffect(() => {
    if (!isOpen) return

    if (phase === 'bouncing') {
      timerRef.current = window.setInterval(() => {
        setVisibleBalls((prev) => {
          if (prev >= 20) {
            if (timerRef.current) window.clearInterval(timerRef.current)
            // Once all 20 balls bounce on floor for 2 seconds, auto-form SWEETY
            window.setTimeout(() => {
              setPhase('forming_sweety')
              playStarlightChimes()
            }, 2000)
            return 20
          }
          return prev + 1
        })
      }, 550)
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [isOpen, phase])

  // Reset celebration to drop balls again
  const handleReplay = () => {
    setVisibleBalls(1)
    setPhase('bouncing')
  }

  // Fast forward straight to SWEETY formation
  const handleSkipToSweety = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    setVisibleBalls(20)
    setPhase('forming_sweety')
    playStarlightChimes()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="sky-celebration-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Twinkling Starlight Background */}
        <div className="sky-celebration-stars" />

        {/* Top Control Bar */}
        <div className="celebration-topbar">
          <div className="celebration-brand-pill">
            <span className="brand-dot">✦</span>
            {phase === 'bouncing' && (
              <span>RELEASING MEMORY ORB {visibleBalls} OF 20 · BOUNCING ON THE FLOOR</span>
            )}
            {phase === 'forming_sweety' && (
              <span>✦ 20 PRECIOUS MEMORIES FORMING "SWEETY" IN THE STARS ✦</span>
            )}
            {phase === 'all_photos_grid' && (
              <span>✦ ALL 20 CHERISHED BIRTHDAY MEMORIES ✦</span>
            )}
          </div>

          <div className="celebration-actions">
            {phase === 'bouncing' && (
              <button className="celebration-btn skip-btn" onClick={handleSkipToSweety} title="Form SWEETY right away">
                <FastForward size={14} />
                <span>FORM SWEETY NAME</span>
              </button>
            )}

            {phase !== 'all_photos_grid' ? (
              <button
                className="celebration-btn"
                onClick={() => setPhase('all_photos_grid')}
                title="Browse all photos in grid layout"
              >
                <Grid size={14} />
                <span>PHOTO GRID</span>
              </button>
            ) : (
              <button
                className="celebration-btn"
                onClick={() => setPhase('forming_sweety')}
                title="Return to SWEETY letter constellation"
              >
                <Sparkles size={14} />
                <span>SWEETY FORMATION</span>
              </button>
            )}

            <button className="celebration-btn" onClick={handleReplay} title="Replay balls dropping and bouncing">
              <RotateCcw size={14} />
              <span>REPLAY BOUNCE</span>
            </button>

            <button className="celebration-close-btn" onClick={onClose} aria-label="Close celebration modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ==========================================================
            VIEW 1 & 2: 3D BALLS (Bouncing on Floor -> Forming SWEETY)
            ========================================================== */}
        {phase !== 'all_photos_grid' && (
          <div className="celebration-stage-viewport">
            {/* Header Titles */}
            <div className="celebration-header-block">
              {phase === 'bouncing' ? (
                <motion.div
                  className="bouncing-counter-banner"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="kicker-tag">CHAPTER EIGHT · SKY CELEBRATION</span>
                  <h2>
                    Releasing Her Memories <em>One by One</em>
                  </h2>
                  <p>
                    Watch each 3D picture ball drop and bounce on the floor until all 20 are alive...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="sweety-title-banner"
                  initial={{ opacity: 0, scale: 0.9, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="kicker-tag">✦ WRITTEN IN THE STARS · NOVEMBER 27 ✦</span>
                  <h1 className="sweety-glowing-title">
                    ✨ S W E E T Y ✨
                  </h1>
                  <p className="sweety-subtext">
                    Twenty radiant years · Twenty precious memories assembled to spell your name
                  </p>
                </motion.div>
              )}
            </div>

            {/* Glowing Golden Floor Plane for Bouncing */}
            <div className={`celebration-floor-plane ${phase === 'forming_sweety' ? 'floor-fade' : ''}`}>
              <div className="floor-neon-beam" />
              <div className="floor-perspective-grid" />
            </div>

            {/* Glowing SVG Constellation Lines Connecting SWEETY */}
            <svg
              className={`sweety-constellation-lines ${phase === 'forming_sweety' ? 'active-lines' : ''}`}
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="gold-constellation-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="gold-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#fff3b0" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffae00" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* S: (130,90) -> (75,184) -> (130,280) */}
              <motion.path
                d="M 130 90 C 70 80, 60 160, 75 184 C 95 210, 140 230, 130 280 C 120 310, 80 310, 65 295"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.2, delay: 0.1 }}
              />

              {/* W: 5 points: (190,90) - (225,280) - (260,170) - (295,280) - (330,90) */}
              <motion.polyline
                points="190,90 225,280 260,170 295,280 330,90"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.4, delay: 0.25 }}
              />

              {/* E1: (450,90)-(390,90)-(390,280)-(450,280) + (390,184)-(435,184) */}
              <motion.path
                d="M 450 90 L 390 90 L 390 280 L 450 280 M 390 184 L 435 184"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.1, delay: 0.4 }}
              />

              {/* E2: (580,90)-(520,90)-(520,280)-(580,280) + (520,184)-(565,184) */}
              <motion.path
                d="M 580 90 L 520 90 L 520 280 L 580 280 M 520 184 L 565 184"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.1, delay: 0.55 }}
              />

              {/* T: (660,90)-(760,90) and stem (710,90)-(710,280) */}
              <motion.path
                d="M 660 90 L 760 90 M 710 90 L 710 280"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.1, delay: 0.7 }}
              />

              {/* Y: (825,90)-(880,184)-(935,90) and stem (880,184)-(880,280) */}
              <motion.path
                d="M 825 90 L 880 184 L 935 90 M 880 184 L 880 280"
                className="constellation-path"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === 'forming_sweety' ? 1 : 0,
                  opacity: phase === 'forming_sweety' ? 0.95 : 0,
                }}
                transition={{ duration: 1.1, delay: 0.85 }}
              />
            </svg>

            {/* ======================================================
                THE 20 SPHERICAL 3D PHOTO BALLS
                ====================================================== */}
            <div className="celebration-balls-canvas">
              {CELEBRATION_20_PHOTOS.map((photo, index) => {
                const coord = SWEETY_BALL_COORDS[index]
                const isVisible = visibleBalls > index
                if (!isVisible) return null

                const isBouncing = phase === 'bouncing'
                const targetX = isBouncing ? coord.floorX : coord.letterX
                const targetY = isBouncing ? coord.floorY : coord.letterY

                return (
                  <motion.div
                    key={photo.id}
                    className="celebration-ball-anchor"
                    style={{
                      left: `${targetX}%`,
                      top: `${targetY}%`,
                    }}
                    initial={{
                      left: `${coord.floorX}%`,
                      top: `${coord.floorY}%`,
                      opacity: 0,
                      scale: 0.4,
                    }}
                    animate={{
                      left: `${targetX}%`,
                      top: `${targetY}%`,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      left: { duration: 1.3, ease: [0.34, 1.25, 0.64, 1] },
                      top: { duration: 1.3, ease: [0.34, 1.25, 0.64, 1] },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.5 },
                    }}
                  >
                    {/* Floor Shadow Under Ball (Only during bouncing phase) */}
                    {isBouncing && (
                      <div
                        className="ball-floor-shadow"
                        style={{
                          animationDelay: `${(index % 4) * 0.15}s`,
                        }}
                      />
                    )}

                    {/* 3D Ball Container with Bounce Animation */}
                    <div
                      className={`ball-bounce-wrapper ${isBouncing ? 'animate-floor-bounce' : 'animate-constellation-float'}`}
                      style={{
                        animationDelay: isBouncing ? `${(index % 5) * 0.12}s` : `${index * 0.08}s`,
                      }}
                      onMouseEnter={() => setHoveredPhoto(photo)}
                      onMouseLeave={() => setHoveredPhoto(null)}
                      onClick={() => onOpenPhoto(photo.id)}
                      role="button"
                      tabIndex={0}
                      title={`Memory #${index + 1}: ${photo.title} (Tap to view full resolution)`}
                    >
                      <div className="photo-ball-3d">
                        <img src={photo.src} alt={photo.title} className="ball-photo-img" />

                        {/* 3D Glass Sphere Highlights */}
                        <div className="ball-specular-glare" />
                        <div className="ball-depth-vignette" />
                        <div className="ball-golden-ring" />

                        {/* Mini Tag */}
                        <span className="ball-number-badge">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Hover Tooltip Preview */}
            <AnimatePresence>
              {hoveredPhoto && (
                <motion.div
                  className="ball-hover-tooltip"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="tooltip-thumb">
                    <img src={hoveredPhoto.src} alt={hoveredPhoto.title} />
                  </div>
                  <div className="tooltip-info">
                    <span className="tooltip-tag">MEMORY #{hoveredPhoto.tag} · {hoveredPhoto.date}</span>
                    <h4>{hoveredPhoto.title}</h4>
                    <span className="tooltip-click-hint">✦ Tap to open in high resolution</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Celebration Badge / Message */}
            {phase === 'forming_sweety' && (
              <motion.div
                className="sweety-footer-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="footer-love-badge">
                  <Sparkles size={16} />
                  <span>HAPPY 20TH BIRTHDAY SWEETY THALLI</span>
                  <Sparkles size={16} />
                </div>
                <p>
                  You can tap on any glowing memory sphere to view its full resolution photograph ♥
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* ==========================================================
            VIEW 3: ALL 20 PHOTOS IN CHRONOLOGICAL GRID
            ========================================================== */}
        {phase === 'all_photos_grid' && (
          <div className="celebration-grid-stage">
            <div className="grid-stage-header">
              <span className="kicker-tag">✦ COMPLETE MEMORY ALBUM ✦</span>
              <h2>All 20 Memories in Chronological Order</h2>
              <p>Every photograph that shaped these two radiant decades.</p>
            </div>

            <div className="celebration-photos-grid">
              {CELEBRATION_20_PHOTOS.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  className="grid-photo-card"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.4 }}
                  onClick={() => onOpenPhoto(photo.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="grid-photo-frame">
                    <img src={photo.src} alt={photo.title} />
                    <span className="grid-photo-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="grid-zoom-icon">
                      <Eye size={13} />
                    </span>
                  </div>
                  <div className="grid-photo-caption">
                    <span className="grid-photo-date">{photo.date}</span>
                    <h4>{photo.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Sky Fireworks Animation Layer */}
        {phase === 'forming_sweety' && (
          <div className="grand-firecrackers-layer" aria-hidden="true">
            <div className="firework fw-1">✦</div>
            <div className="firework fw-2">✧</div>
            <div className="firework fw-3">✹</div>
            <div className="firework fw-4">✸</div>
            <div className="firework fw-5">✦</div>
            <div className="firework fw-6">✧</div>
            <div className="firework fw-7">✹</div>
            <div className="firework fw-8">✸</div>
            <div className="firework fw-9">✦</div>
            <div className="firework fw-10">✧</div>
            <div className="firework fw-11">✹</div>
            <div className="firework fw-12">✸</div>
            <div className="firework fw-sparkle-1">✦</div>
            <div className="firework fw-sparkle-2">✧</div>
            <div className="firework fw-sparkle-3">✹</div>
            <div className="firework fw-rocket-1">| ✦</div>
            <div className="firework fw-rocket-2">| ✧</div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
