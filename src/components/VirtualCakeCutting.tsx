import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, RotateCcw, Volume2, ArrowRight } from 'lucide-react'

interface VirtualCakeCuttingProps {
  onProceedToCelebration?: () => void
}

export const VirtualCakeCutting: React.FC<VirtualCakeCuttingProps> = ({ onProceedToCelebration }) => {
  const [candlesLit, setCandlesLit] = useState(true)
  const [blownOut, setBlownOut] = useState(false)
  const [slicesCut, setSlicesCut] = useState(0)
  const [isKnifeActive, setIsKnifeActive] = useState(false)
  const [smokePuffs, setSmokePuffs] = useState(false)
  const [knifePos, setKnifePos] = useState({ x: 0, y: 0, cutting: false })

  // Blow out candles action
  const handleBlowCandles = () => {
    setCandlesLit(false)
    setBlownOut(true)
    setSmokePuffs(true)
    setTimeout(() => setSmokePuffs(false), 2500)
  }

  // Cut next slice action (up to 6)
  const handleCutSlice = () => {
    if (slicesCut < 6) {
      setKnifePos({ x: 0, y: 0, cutting: true })
      setTimeout(() => {
        setSlicesCut((prev) => Math.min(6, prev + 1))
        setKnifePos({ x: 0, y: 0, cutting: false })
      }, 350)
    }
  }

  // Reset to replay cake cutting
  const handleReset = () => {
    setCandlesLit(true)
    setBlownOut(false)
    setSlicesCut(0)
  }

  // 6 Slices data with angles (60 degrees each)
  const slices = [
    { id: 1, angle: 0, label: 'Sweet Beginnings', icon: '🍓' },
    { id: 2, angle: 60, label: 'Kuchipudi Grace', icon: '💃' },
    { id: 3, angle: 120, label: 'Endless Laughter', icon: '✨' },
    { id: 4, angle: 180, label: 'Unbreakable Bond', icon: '❤️' },
    { id: 5, angle: 240, label: 'Golden Dreams', icon: '🌟' },
    { id: 6, angle: 300, label: 'Paris Lights', icon: '🗼' },
  ]

  return (
    <div className="virtual-cake-container">
      {/* Kicker & Heading */}
      <div className="cake-header">
        <span className="cake-sub-kicker">✦ CHAPTER SEVEN · VIRTUAL CELEBRATION ✦</span>
        <h2 className="cake-title">
          Make a wish, <em>blow the candles & cut the cake!</em>
        </h2>
        <p className="cake-desc">
          {!blownOut
            ? 'Close your eyes, make a secret birthday wish, and blow out the candles.'
            : slicesCut === 0
            ? 'Now take the golden knife (chaku) and slice your 20th birthday cake!'
            : slicesCut < 6
            ? `Slice ${slicesCut} of 6 cut! Keep cutting all 6 slices...`
            : 'All 6 delicious slices cut! Here is my personal wish for you, Thalli.'}
        </p>
      </div>

      {/* Interactive 3D Cake Arena */}
      <div className="cake-3d-arena">
        {/* Cake Glow Aura */}
        <div className={`cake-aura ${!candlesLit ? 'dimmed' : ''}`} />

        {/* 3D Tiered Cake Board */}
        <div className="cake-board-3d">
          {/* Gold Rimmed Serving Platter */}
          <div className="cake-platter-disc" />

          {/* 6 Interactive 3D Cake Slices */}
          <div className="cake-pie-wrapper">
            {slices.map((slice, index) => {
              const isCut = index < slicesCut
              // Radial outward offset when cut (angle in radians)
              const rad = ((slice.angle + 30) * Math.PI) / 180
              const offsetX = isCut ? Math.cos(rad) * 44 : 0
              const offsetY = isCut ? Math.sin(rad) * 34 : 0

              return (
                <motion.div
                  key={slice.id}
                  className={`cake-slice-sector slice-${index + 1} ${isCut ? 'is-separated' : ''}`}
                  animate={{
                    x: offsetX,
                    y: offsetY,
                    scale: isCut ? 1.04 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                  onClick={blownOut ? handleCutSlice : undefined}
                >
                  {/* SVG Isometric Wedge Shape */}
                  <svg viewBox="0 0 100 100" className="slice-svg">
                    <defs>
                      <linearGradient id={`sliceGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7a1a30" />
                        <stop offset="45%" stopColor="#a3324c" />
                        <stop offset="85%" stopColor="#571120" />
                      </linearGradient>
                      <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fff6ee" />
                        <stop offset="100%" stopColor="#f3d8c7" />
                      </linearGradient>
                    </defs>

                    {/* Wedge Path (60 degrees) */}
                    <path
                      d="M 50,50 L 50,5 A 45,45 0 0,1 89,27.5 Z"
                      fill={`url(#sliceGrad-${index})`}
                      stroke="#d4af37"
                      strokeWidth="1.2"
                      transform={`rotate(${slice.angle} 50 50)`}
                    />
                  </svg>

                  {/* Slice Garnish & Sprinkles */}
                  <div
                    className="slice-garnish"
                    style={{
                      transform: `rotate(${slice.angle + 30}deg) translate(0, -32px)`,
                    }}
                  >
                    <span className="garnish-dot" />
                  </div>
                </motion.div>
              )
            })}

            {/* Cake Center Medallion: "20" */}
            <div className="cake-center-rosette">
              <span className="cake-age-num">20</span>
              <span className="cake-heart-mini">♥</span>
            </div>

            {/* 3 Birthday Candles with Flickering Flames */}
            <div className="cake-candles-rig">
              {[
                { id: 1, posClass: 'candle-pos-1' },
                { id: 2, posClass: 'candle-pos-2' },
                { id: 3, posClass: 'candle-pos-3' },
              ].map((c) => (
                <div key={c.id} className={`birthday-candle ${c.posClass}`} onClick={handleBlowCandles}>
                  <div className="candle-body-spiral" />
                  <div className="candle-wick" />
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div
                        className="candle-flame-glow"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.95, 1.1] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Smoke wisps after blowing out */}
                  {smokePuffs && (
                    <motion.div
                      className="smoke-wisp"
                      initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
                      animate={{ y: -40, opacity: 0, scale: 1.8 }}
                      transition={{ duration: 1.8 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================================
            THE GOLDEN CAKE KNIFE (CHAKU)
            Appears after blowing out the candles!
            ========================================================== */}
        <AnimatePresence>
          {blownOut && (
            <motion.div
              className={`cake-knife-chaku ${knifePos.cutting ? 'is-cutting-motion' : ''}`}
              initial={{ opacity: 0, y: -40, rotate: -25 }}
              animate={{ opacity: 1, y: 0, rotate: knifePos.cutting ? 15 : -15 }}
              exit={{ opacity: 0 }}
              drag
              dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
              onDragEnd={() => handleCutSlice()}
              onClick={handleCutSlice}
              title="Click or drag to slice the cake!"
            >
              <div className="knife-blade-metal">
                <div className="knife-edge-sparkle" />
              </div>
              <div className="knife-guard-gold" />
              <div className="knife-hilt-ruby" />

              {/* Floating Knife Prompt Pill */}
              <motion.div
                className="knife-hint-pill"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              >
                <span>🔪 Tap or Drag Knife to Cut!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Buttons & Progress */}
      <div className="cake-actions-row">
        {!blownOut ? (
          <button onClick={handleBlowCandles} className="primary-button blow-candle-btn">
            <span>🌬️ BLOW OUT THE CANDLES</span>
            <Sparkles size={16} />
          </button>
        ) : (
          <div className="cake-slicing-panel">
            <button
              onClick={handleCutSlice}
              disabled={slicesCut >= 6}
              className={`primary-button cut-slice-btn ${slicesCut >= 6 ? 'btn-completed' : ''}`}
            >
              <span>{slicesCut < 6 ? `🍰 CUT SLICE (${slicesCut}/6)` : '✨ ALL 6 SLICES CUT!'}</span>
              <Sparkles size={16} />
            </button>

            <button onClick={handleReset} className="sound-button cake-reset-btn" title="Replay cake cutting">
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* ==========================================================
          HEARTFELT LONG-DISTANCE CAKE CUTTING MESSAGE
          Appears once she cuts the cake!
          ========================================================== */}
      <AnimatePresence>
        {slicesCut > 0 && (
          <motion.div
            className="cake-love-letter-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="cake-letter-seal">
              <Heart size={20} fill="currentColor" />
            </div>

            <span className="cake-letter-tag">✦ ACROSS THE MILES · WITH ALL MY HEART ✦</span>

            <h3>I may not be with you today to cut this cake in person...</h3>

            <p className="cake-letter-body">
              <em>
                "I was not with you today to hold your hand for a physical cake cutting, Thalli... but I will always find
                a way to celebrate you, no matter how many miles stand between us.
              </em>
            </p>

            <p className="cake-letter-highlight">
              <em>
                May your 20th year be as sweet, vibrant, and blessed as every single slice of this cake. Whenever you
                smile, you make the whole world brighter. Happy 20th Birthday, my favorite person! 🎂❤️"
              </em>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
