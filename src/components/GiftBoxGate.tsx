import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, KeyRound, Lock, ArrowRight } from 'lucide-react'

interface GiftBoxGateProps {
  onUnlock: () => void
  onStartMusic: () => void
}

type GateStage = 'idle' | 'prompt' | 'untying' | 'bursting_cap' | 'bursting_photos' | 'love_symbol' | 'entering'

// 20 Photos for the spherical ball-dimension explosion
const BURST_PHOTOS = [
  { src: './photos/01-hero-childhood-portrait.jpg', title: 'The Little Star' },
  { src: './photos/02-first-birthday-memory.jpg', title: 'First Birthday' },
  { src: './photos/03-childhood-purple-jacket.jpg', title: 'Little Explorer' },
  { src: './photos/04-classical-dance-portrait.jpg', title: 'Kuchipudi Grace' },
  { src: './photos/05-festive-black-kurti.jpg', title: 'Black Kurti Radiance' },
  { src: './photos/06-casual-college-smile.jpg', title: 'College Days' },
  { src: './photos/07-classical-dance-costume.jpg', title: 'Art & Devotion' },
  { src: './photos/08-traditional-black-saree.jpg', title: 'Elegance in Black' },
  { src: './photos/09-golden-hour-portrait.jpg', title: 'Golden Hour' },
  { src: './photos/10-festive-twilight-celebration.jpg', title: 'Diwali Twilight' },
  { src: './photos/11-candid-sunlit-radiance.jpg', title: 'Pure Radiance' },
  { src: './photos/12-mirror-selfie-aesthetic.jpg', title: 'Mirror Aesthetic' },
  { src: './photos/13-festive-diya-celebration.jpg', title: 'Diya Glow' },
  { src: './photos/14-traditional-gold-saree.jpg', title: 'Royal Gold Saree' },
  { src: './photos/15-casual-chic-selfie.jpg', title: 'Sweet Smile' },
  { src: './photos/16-playful-candid-expression.jpg', title: 'Playful Charm' },
  { src: './photos/17-ethnic-grace-portrait.jpg', title: 'Silver Bangles' },
  { src: './photos/18-traditional-saree-pose.jpg', title: 'Festive Poise' },
  { src: './photos/19-outdoor-autumn-walk.jpg', title: 'Autumn Pathway' },
  { src: './photos/20-autumn-trench-coat.jpg', title: 'Golden Fall Grace' },
]

export const GiftBoxGate: React.FC<GiftBoxGateProps> = ({ onUnlock, onStartMusic }) => {
  const [stage, setStage] = useState<GateStage>('idle')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [shake, setShake] = useState(false)

  // Generate 3D Spherical Ball Coordinates for the 20 photos
  const sphereCoordinates = React.useMemo(() => {
    return BURST_PHOTOS.map((_, index) => {
      // Golden spiral / spherical distribution across angles
      const phi = Math.acos(-1 + (2 * index) / BURST_PHOTOS.length)
      const theta = Math.sqrt(BURST_PHOTOS.length * Math.PI) * phi
      
      // Radius distribution: inner layer (110-180px), outer layer (200-340px)
      const isOuter = index % 2 === 0
      const radius = isOuter ? 220 + (index % 4) * 35 : 130 + (index % 3) * 30
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.85 // slightly flatten vertically for viewport
      const z = radius * Math.cos(phi)
      const scale = isOuter ? 0.95 : 1.15
      const rotate = ((index * 29) % 30) - 15

      return { x, y, z, scale, rotate }
    })
  }, [])

  const handleBoxClick = () => {
    if (stage === 'idle') {
      setStage('prompt')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = password.trim().toLowerCase()

    if (trimmed === 'thalli') {
      setErrorMsg('')
      setStage('untying')
    } else {
      setErrorMsg('Oops! That\'s not the secret key. Try "Thalli" 💖')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  // Handle stage transitions after unlock
  useEffect(() => {
    if (stage === 'untying') {
      // Ribbon unties for 700ms, then cap bursts!
      const timer = setTimeout(() => {
        setStage('bursting_cap')
        // Automatically start Sid Sriram's "Undiporaadhey" right here!
        onStartMusic()
      }, 700)
      return () => clearTimeout(timer)
    }

    if (stage === 'bursting_cap') {
      // Cap flies up, then photos burst outward in ball dimension
      const timer = setTimeout(() => {
        setStage('bursting_photos')
      }, 600)
      return () => clearTimeout(timer)
    }

    if (stage === 'bursting_photos') {
      // Photos expand and orbit for 2.8s, then love symbol appears in the center
      const timer = setTimeout(() => {
        setStage('love_symbol')
      }, 2800)
      return () => clearTimeout(timer)
    }
  }, [stage, onStartMusic])

  const handleEnterWebsite = () => {
    setStage('entering')
    setTimeout(() => {
      onUnlock()
    }, 600)
  }

  if (stage === 'entering') {
    return (
      <motion.div
        className="gift-gate-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    )
  }

  return (
    <div className="gift-gate-overlay">
      {/* Background Starfield Particles */}
      <div className="gift-gate-stars" />
      <div className="gift-gate-glow" />

      {/* Main Container */}
      <div className="gift-gate-stage">
        {/* ==========================================================
            STAGE 1 & 2: THE 3D GIFT BOX (With Ribbon & Cap)
            ========================================================== */}
        {(stage === 'idle' || stage === 'prompt' || stage === 'untying' || stage === 'bursting_cap') && (
          <div className="gift-box-wrapper" onClick={handleBoxClick}>
            {/* "Tap on me" Floating Kicker Badge */}
            <motion.div
              className="gift-tap-badge"
              animate={{
                y: [0, -8, 0],
                boxShadow: [
                  '0 0 15px rgba(212, 175, 55, 0.4)',
                  '0 0 30px rgba(212, 175, 55, 0.8)',
                  '0 0 15px rgba(212, 175, 55, 0.4)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Sparkles size={16} className="gift-sparkle-icon" />
              <span>Tap on me 🎁</span>
            </motion.div>

            {/* 3D Gift Box Structure */}
            <motion.div
              className={`gift-box-3d ${shake ? 'box-shake' : ''}`}
              whileHover={{ scale: stage === 'idle' ? 1.05 : 1 }}
              whileTap={{ scale: stage === 'idle' ? 0.98 : 1 }}
            >
              {/* Box Cap / Lid */}
              <motion.div
                className="gift-box-cap"
                animate={
                  stage === 'bursting_cap'
                    ? {
                        y: -360,
                        x: 40,
                        rotateZ: 45,
                        rotateX: -60,
                        scale: 1.25,
                        opacity: 0,
                      }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.7, ease: [0.17, 0.67, 0.83, 0.67] }}
              >
                {/* Golden Ribbon Bow on Top */}
                <motion.div
                  className="gift-bow"
                  animate={
                    stage === 'untying' || stage === 'bursting_cap'
                      ? { scale: 1.4, opacity: 0, rotate: 180, y: -40 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <div className="bow-loop bow-left" />
                  <div className="bow-center" />
                  <div className="bow-loop bow-right" />
                  <div className="bow-ribbon-tail tail-left" />
                  <div className="bow-ribbon-tail tail-right" />
                </motion.div>

                {/* Horizontal & Vertical Ribbon over Cap */}
                <motion.div
                  className="cap-ribbon-v"
                  animate={stage === 'untying' ? { opacity: 0, scaleY: 0 } : { opacity: 1 }}
                />
                <motion.div
                  className="cap-ribbon-h"
                  animate={stage === 'untying' ? { opacity: 0, scaleX: 0 } : { opacity: 1 }}
                />
              </motion.div>

              {/* Box Base */}
              <div className="gift-box-base">
                {/* Horizontal & Vertical Ribbon on Base */}
                <motion.div
                  className="base-ribbon-v"
                  animate={stage === 'untying' ? { opacity: 0, scaleY: 0 } : { opacity: 1 }}
                />
                <motion.div
                  className="base-ribbon-h"
                  animate={stage === 'untying' ? { opacity: 0, scaleX: 0 } : { opacity: 1 }}
                />

                {/* Golden Burst Ray from Inside when cap bursts */}
                <AnimatePresence>
                  {stage === 'bursting_cap' && (
                    <motion.div
                      className="gift-box-burst-light"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 2.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Instruction Cue */}
            <p className="gift-box-cue">
              {stage === 'idle' ? 'A royal 20th birthday mystery awaits inside' : 'Unlock with your secret name'}
            </p>
          </div>
        )}

        {/* ==========================================================
            PASSWORD MODAL (Appears when she taps the box)
            ========================================================== */}
        <AnimatePresence>
          {stage === 'prompt' && (
            <motion.div
              className="gift-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="gift-modal-card"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="gift-modal-badge">
                  <Lock size={18} />
                  <span>SPECIAL SURPRISE</span>
                </div>

                <h3>Enter Your Secret Key 🗝️</h3>
                <p className="gift-modal-sub">
                  This universe was crafted for someone very special. Enter the secret name to untie the ribbon:
                </p>

                <form onSubmit={handlePasswordSubmit} className="gift-password-form">
                  <div className="gift-input-group">
                    <KeyRound size={18} className="gift-input-icon" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Enter secret name (e.g. Thalli)..."
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errorMsg) setErrorMsg('')
                      }}
                      className="gift-input"
                    />
                  </div>

                  {errorMsg && <p className="gift-error-msg">{errorMsg}</p>}

                  <p className="gift-hint-text">
                    Hint: What does he lovingly call you? (Fixed: <strong>"Thalli"</strong>)
                  </p>

                  <button type="submit" className="gift-submit-btn">
                    <span>Untie Ribbon & Burst Surprise ✨</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==========================================================
            STAGE 3: 3D BALL-DIMENSION PHOTO EXPLOSION
            Photos shoot out radially from the box in a 3D sphere!
            ========================================================== */}
        {(stage === 'bursting_photos' || stage === 'love_symbol') && (
          <div className="spherical-burst-container">
            {BURST_PHOTOS.map((photo, i) => {
              const coords = sphereCoordinates[i]
              const isLoveStage = stage === 'love_symbol'

              // In the love stage, photos smoothly expand slightly to form a halo ring
              const targetX = isLoveStage ? coords.x * 1.35 : coords.x
              const targetY = isLoveStage ? coords.y * 1.35 : coords.y
              const targetOpacity = isLoveStage ? 0.75 : 1

              return (
                <motion.div
                  key={i}
                  className="burst-photo-orb"
                  initial={{ x: 0, y: 0, scale: 0.1, opacity: 0, rotate: 0 }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: coords.scale,
                    opacity: targetOpacity,
                    rotate: coords.rotate,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 85,
                    damping: 14,
                    delay: i * 0.04, // staggered explosion!
                  }}
                >
                  <div className="burst-photo-inner">
                    <img src={photo.src} alt={photo.title} loading="eager" />
                    <div className="burst-photo-halo" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* ==========================================================
            STAGE 4: THE RADIANT LOVE SYMBOL ANIMATION
            Appears in the center with heart pulse & birthday note!
            ========================================================== */}
        <AnimatePresence>
          {stage === 'love_symbol' && (
            <motion.div
              className="love-symbol-container"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pulsing Glowing Neon Heart */}
              <div className="love-heart-wrapper">
                <motion.div
                  className="love-heart-glow"
                  animate={{
                    scale: [1, 1.22, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />

                <svg className="love-heart-svg" viewBox="0 0 100 90" width="120" height="110">
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff5e7e" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#ff2a5f" />
                    </linearGradient>
                    <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <motion.path
                    d="M 50,30 A 20,20 0,0,0 15,30 C 15,50 50,75 50,75 C 50,75 85,50 85,30 A 20,20 0,0,0 50,30 Z"
                    fill="url(#heartGradient)"
                    filter="url(#heartGlow)"
                    initial={{ pathLength: 0, scale: 0.8 }}
                    animate={{ pathLength: 1, scale: [0.95, 1.05, 0.95] }}
                    transition={{
                      pathLength: { duration: 1.2, ease: 'easeInOut' },
                      scale: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
                    }}
                  />
                </svg>

                <motion.div
                  className="heart-sparkle-center"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                >
                  <Sparkles size={28} color="#fff" />
                </motion.div>
              </div>

              {/* Title & Celebration Message */}
              <motion.div
                className="love-text-box"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="love-kicker">✦ WELCOME TO YOUR 20TH CELEBRATION ✦</span>
                <h2 className="love-title">
                  Happy Birthday, <em>Sweety Thalli!</em>
                </h2>
                <p className="love-desc">
                  Every star, every picture, and every melody inside was created just for you.
                </p>

                <button onClick={handleEnterWebsite} className="love-enter-btn">
                  <span>Enter Your Universe ❤️</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
