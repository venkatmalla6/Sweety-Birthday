import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Eye,
  EyeOff,
  Flame,
  Gift,
  Heart,
  Mail,
  MapPin,
  Maximize2,
  Music,
  Music2,
  PartyPopper,
  Pause,
  RotateCcw,
  Send,
  SkipForward,
  Sparkles,
  Star,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  Wand2,
  X,
} from 'lucide-react'
import { generateOracleBlessing } from './services/groq'
import { GiftBoxGate } from './components/GiftBoxGate'

const BIRTHDAY = new Date('2026-11-27T00:00:00')

export interface PhotoMemory {
  id: string
  number: string
  title: string
  category: 'hero' | 'childhood' | 'talents' | 'gallery' | 'finale'
  categoryLabel: string
  date: string
  note: string
  teaser: string
  src: string
  objectPosition: string
}

export const allPhotos: PhotoMemory[] = [
  {
    id: 'photo-14',
    number: '01',
    title: 'A Royal Aura',
    category: 'hero',
    categoryLabel: 'Hero Portrait',
    date: 'The Golden Milestone',
    note: 'Radiant in traditional gold, glowing with timeless elegance, quiet dignity, and graceful warmth.',
    teaser: 'A royal milestone glowing in gold and tradition...',
    src: './photos/14-traditional-gold-saree.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-01',
    number: '02',
    title: 'The Little Star',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    date: 'Studio Portrait',
    note: "That confident posture, bright sparkle in your eyes, and sweet smile — carrying courage from the very start.",
    teaser: 'A confident, sweet childhood studio memory...',
    src: './photos/01-hero-childhood-portrait.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-02',
    number: '03',
    title: 'First Birthday Smiles',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    date: 'The Very Beginning',
    note: 'Pure, carefree laughter in a ruffled blue dress. Where your beautiful journey in this world began.',
    teaser: 'A precious first birthday laugh in a little blue dress...',
    src: './photos/02-first-birthday-memory.jpg',
    objectPosition: 'center 35%',
  },
  {
    id: 'photo-03',
    number: '04',
    title: 'Little Explorer',
    category: 'childhood',
    categoryLabel: 'Childhood Days',
    date: 'Growing Years',
    note: 'Rocking that cool purple jacket and cap with endless charm and sweet childhood confidence.',
    teaser: 'Sporting a cool purple jacket and twin braids with pure charm...',
    src: './photos/03-childhood-purple-jacket.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-04',
    number: '05',
    title: 'Rhythm & Devotion',
    category: 'talents',
    categoryLabel: 'Classical Dance',
    date: 'Dance Heritage',
    note: 'Elegance in every mudra and pose. Professional dedication in Kuchipudi and the poise of a true artist.',
    teaser: 'The poise and mudras of a dedicated Kuchipudi dancer...',
    src: './photos/04-classical-dance-portrait.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-07',
    number: '06',
    title: 'Artistry & Poise',
    category: 'talents',
    categoryLabel: 'Classical Dance',
    date: 'Stage & Tradition',
    note: 'Adorned in traditional dance jewels and saree — embodying centuries of Kuchipudi heritage with quiet dignity.',
    teaser: 'Adorned in traditional dance jewels and stage poise...',
    src: './photos/07-classical-dance-costume.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-05',
    number: '07',
    title: 'Festive Radiance in Black',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Festive Celebrations',
    note: 'Dressed in your favorite color black amidst bright marigolds, stealing the spotlight with your radiant smile.',
    teaser: 'Dressed in her favorite color black by festive marigolds...',
    src: './photos/05-festive-black-outfit.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-06',
    number: '08',
    title: 'Framing Happiness',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Playful Moments',
    note: 'Spontaneous, playful, and framing happiness with your hands — your fun-loving energy is unforgettable.',
    teaser: 'A spontaneous smile framing pure joy...',
    src: './photos/06-playful-traditional-portrait.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-08',
    number: '09',
    title: 'Celebration on Stage in Black',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Milestone Evening',
    note: 'Gracefully seated in black before floral blessings on your special day, timeless and cherished.',
    teaser: 'Surrounded by flowers and blessings on a milestone evening...',
    src: './photos/08-birthday-stage-memory.jpg',
    objectPosition: 'center 40%',
  },
  {
    id: 'photo-09',
    number: '10',
    title: 'Serenity in White',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Timeless Grace',
    note: 'Quiet elegance and gentle simplicity. A calm presence that brings warmth without a single word.',
    teaser: 'Quiet elegance and a serene presence dressed in white...',
    src: './photos/09-elegant-white-portrait.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-10',
    number: '11',
    title: 'Acoustic Soul & Western Beats',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Melodies & Dreams',
    note: 'Puffer jacket, acoustic guitar, and rockstar flair. Celebrating your love for western beats, rhythm, and dreams.',
    teaser: 'Rockstar flair, winter jacket, and acoustic rhythm...',
    src: './photos/10-guitar-memory.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-11',
    number: '12',
    title: 'Traditional Charm',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Classic Grace',
    note: 'Draped in timeless silk, carrying yourself with effortless poise, modesty, and charm.',
    teaser: 'Poised in timeless traditional silk with effortless grace...',
    src: './photos/11-saree-memory.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-12',
    number: '13',
    title: 'Candid & Sweet',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Unfiltered Smiles',
    note: 'Hands on cheeks, cute spectacles, and zero filters — completely authentic, carefree, and adorable.',
    teaser: 'Candid spectacles, cute pout, and genuine laughter...',
    src: './photos/12-playful-closeup.jpg',
    objectPosition: 'center 35%',
  },
  {
    id: 'photo-15',
    number: '14',
    title: 'Expressive Eyes & Silver Bangles',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Poetic Charm',
    note: 'Captivating eyes framed by silver bangles in black and white — effortless charisma, traditional beauty, and quiet mystery.',
    teaser: 'Expressive eyes framed by traditional silver bangles...',
    src: './photos/15-expressive-bangles-portrait.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-16',
    number: '15',
    title: 'Outdoor Jhumka Poise',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Sunlit Moments',
    note: 'Adjusting your hair and silver jhumkas under the open sky — modern elegance blending with timeless tradition.',
    teaser: 'Gentle sunlight, silver jhumkas, and effortless poise...',
    src: './photos/16-outdoor-jhumka-poise.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-17',
    number: '16',
    title: 'The Serene Green Avenue',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Nature & Peace',
    note: 'Walking through tree-lined pathways with your signature blue spectacles — peaceful, grounded, and graceful.',
    teaser: 'A peaceful walk along tree-lined pathways...',
    src: './photos/17-nature-pathway-grace.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-18',
    number: '17',
    title: 'Carefree Casual Sparkle',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Playful Smiles',
    note: 'Cute spectacles, playful pout, and relaxed casual charm — reminding everyone that your everyday happiness is contagious.',
    teaser: 'Cute spectacles and carefree playful energy...',
    src: './photos/18-playful-casual-radiance.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-19',
    number: '18',
    title: 'Chic Mirror Reflection',
    category: 'gallery',
    categoryLabel: 'Main Gallery',
    date: 'Modern Style',
    note: 'A trendy mirror selfie in lace and black — embracing modern youth with confidence, individuality, and flair.',
    teaser: 'Trendy lace and confident modern style...',
    src: './photos/19-chic-mirror-reflection.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-20',
    number: '19',
    title: 'Autumn Dreams & Paris Aesthetic',
    category: 'gallery',
    categoryLabel: 'Turning 20 Milestone',
    date: 'Stepping into 20',
    note: 'Standing in a carpet of golden leaves wearing a classic belted trench coat — evoking the dreamy streets of Paris as you step into your 20th year.',
    teaser: 'Walking through golden autumn leaves in a classic trench coat...',
    src: './photos/20-autumn-trench-milestone.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'photo-21',
    number: '20',
    title: 'Autumn Whispers & Golden Leaves',
    category: 'gallery',
    categoryLabel: 'Turning 20 Milestone',
    date: 'Parisian Warmth',
    note: 'Golden autumn foliage, classic beige trench coat, and quiet reflection — carrying the elegance of Paris and the warmth of a new decade.',
    teaser: 'Golden leaves, trench coat elegance, and a quiet autumn breeze...',
    src: './photos/21-autumn-leaves-reflection.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'photo-13',
    number: '21',
    title: 'May Life Always Bloom',
    category: 'finale',
    categoryLabel: 'Birthday Finale',
    date: 'Wishing You Well, Always',
    note: 'Standing radiant amidst roses and greenery — wishing your future overflows with happiness, peace, and blooms.',
    teaser: 'Radiant amidst roses — a wish for your future to blossom...',
    src: './photos/13-floral-celebration-portrait.jpg',
    objectPosition: 'center 20%',
  },
]

// Chronological arrangement of Sweety's journey for the cinematic video
export const chronologicalJourney: PhotoMemory[] = [
  allPhotos.find((p) => p.id === 'photo-02')!, // 1. First Birthday Baby (2007)
  allPhotos.find((p) => p.id === 'photo-01')!, // 2. Childhood Studio Portrait (2009)
  allPhotos.find((p) => p.id === 'photo-03')!, // 3. Childhood Purple Jacket & Cap (2010)
  allPhotos.find((p) => p.id === 'photo-04')!, // 4. Classical Dance Mudra (2014)
  allPhotos.find((p) => p.id === 'photo-07')!, // 5. Classical Dance Costume & Jewels (2016)
  allPhotos.find((p) => p.id === 'photo-06')!, // 6. Playful Traditional Portrait
  allPhotos.find((p) => p.id === 'photo-10')!, // 7. Winter Jacket with Guitar
  allPhotos.find((p) => p.id === 'photo-09')!, // 8. Serenity in White
  allPhotos.find((p) => p.id === 'photo-11')!, // 9. Traditional Saree Memory
  allPhotos.find((p) => p.id === 'photo-12')!, // 10. Candid Spectacles & Pout
  allPhotos.find((p) => p.id === 'photo-05')!, // 11. Festive Black Outfit with Marigolds
  allPhotos.find((p) => p.id === 'photo-08')!, // 12. Birthday Stage Evening in Black
  allPhotos.find((p) => p.id === 'photo-18')!, // 13. Carefree Casual Sparkle
  allPhotos.find((p) => p.id === 'photo-19')!, // 14. Chic Mirror Reflection
  allPhotos.find((p) => p.id === 'photo-15')!, // 15. Expressive Eyes & Silver Bangles
  allPhotos.find((p) => p.id === 'photo-16')!, // 16. Outdoor Jhumka Poise
  allPhotos.find((p) => p.id === 'photo-17')!, // 17. The Serene Green Avenue
  allPhotos.find((p) => p.id === 'photo-14')!, // 18. Royal Gold Saree Milestone
  allPhotos.find((p) => p.id === 'photo-20')!, // 19. Autumn Dreams & Paris Aesthetic
  allPhotos.find((p) => p.id === 'photo-21')!, // 20. Autumn Whispers & Golden Leaves
  allPhotos.find((p) => p.id === 'photo-13')!, // 21. Floral Celebration Finale
]

export interface StarTribute {
  year: number
  calendarYear: number
  title: string
  tribute: string
  icon: string
}

export const twentyStars: StarTribute[] = [
  { year: 1, calendarYear: 2006, title: 'The Miracle Arrives', tribute: 'November 27, 2006: The heavens sent a baby girl whose smile would illuminate the world.', icon: '🌟' },
  { year: 2, calendarYear: 2007, title: 'First Giggles & Baby Steps', tribute: 'Pure ruffled blue dress laughter and tiny footprints beginning a grand adventure.', icon: '👶' },
  { year: 3, calendarYear: 2008, title: 'Sweet Little Wonder', tribute: 'Curious brown eyes finding marvel and laughter in every corner of life.', icon: '✨' },
  { year: 4, calendarYear: 2009, title: 'Studio Star Radiance', tribute: 'Sitting with poise before the camera, already carrying a queen’s quiet charm.', icon: '📸' },
  { year: 5, calendarYear: 2010, title: 'The Purple Jacket Swag', tribute: 'Sporting that cool cap and jacket with an adorable, unforgettable confidence.', icon: '🧢' },
  { year: 6, calendarYear: 2011, title: 'First Steps of Dance', tribute: 'Hearing the rhythm, discovering the first anklet bells, and loving the beat.', icon: '🩰' },
  { year: 7, calendarYear: 2012, title: 'Playful Childhood Spark', tribute: 'Laughter ringing through classrooms, playgrounds, and afternoon games.', icon: '🎈' },
  { year: 8, calendarYear: 2013, title: 'Framing Happiness', tribute: 'Finger-framing the camera with that playful, unforgettable twinkle in your eye.', icon: '✌️' },
  { year: 9, calendarYear: 2014, title: 'Artistry & Poise', tribute: 'Adorning classical jewellery and stepping onto the stage like a seasoned dancer.', icon: '🌺' },
  { year: 10, calendarYear: 2015, title: 'A Decade of Light', tribute: 'Turning 10 with a heart as pure as gold and dreams growing bigger every day.', icon: '🔟' },
  { year: 11, calendarYear: 2016, title: 'The Kuchipudi Devotion', tribute: 'Transforming classical mudras and rhythmic footwork into a true soul art.', icon: '💃' },
  { year: 12, calendarYear: 2017, title: 'Rhythm in Two Worlds', tribute: 'Mastering classical tradition while grooving with boundless energy to western beats.', icon: '🎶' },
  { year: 13, calendarYear: 2018, title: 'Becoming a Teenager', tribute: 'Standing taller, discovering your own voice, and stepping boldly into adolescence.', icon: '🌸' },
  { year: 14, calendarYear: 2019, title: 'Grace in White', tribute: 'Growing into timeless elegance, inner calm, and a heart full of empathy.', icon: '🕊️' },
  { year: 15, calendarYear: 2020, title: 'Resilience & Courage', tribute: 'Weathering unpredictable times with quiet courage and a steady, beautiful spirit.', icon: '🛡️' },
  { year: 16, calendarYear: 2021, title: 'The Power of Black', tribute: 'Finding your signature color and commanding every room with understated elegance.', icon: '🖤' },
  { year: 17, calendarYear: 2022, title: 'Parisian Daydreams & Chicken Feasts', tribute: 'Craving spicy chicken with dear friends and dreaming of the twinkling Eiffel Tower.', icon: '🗼' },
  { year: 18, calendarYear: 2023, title: 'Royal Gold Milestone', tribute: 'Draped in traditional gold silk, radiating maturity, majesty, and warmth.', icon: '👑' },
  { year: 19, calendarYear: 2024, title: 'Grace Through Every Season', tribute: 'Honoring your growth, treasuring true memories, and holding your head high.', icon: '💎' },
  { year: 20, calendarYear: 2026, title: 'Turning 20 · Two Decades of Wonder', tribute: 'Here you stand today: 20 radiant years old, deeply cherished, and destined for greatness.', icon: '🎉' },
]

const story = [
  {
    number: '01',
    title: 'The beginning',
    date: 'A chapter worth remembering',
    text: 'Every meaningful story has a beginning. This is where a collection of memories, shared laughter, and genuine warmth started.',
  },
  {
    number: '02',
    title: 'The little moments',
    date: 'A collection of smiles',
    text: 'The conversations, silly jokes, dance rehearsals, food cravings, and little memories that always bring a smile.',
  },
  {
    number: '03',
    title: 'What I will always value',
    date: 'With gratitude',
    text: 'You made ordinary days feel extraordinary. I will always be grateful for the happiness, lessons, and beauty you brought into my life.',
  },
  {
    number: '04',
    title: 'A wish for your journey',
    date: 'From the depths of my heart',
    text: 'Wherever life takes you, I hope it brings you peace, boundless laughter, Paris dreams fulfilled, and everything good you deserve.',
  },
]

const reasons = [
  ['Your smile', 'It has a genuine way of making even the heaviest day feel instantly lighter and warmer.'],
  ['Your Kuchipudi & Western Dance', 'The fierce passion and dedication you bring to dance — graceful in classical, vibrant in western!'],
  ['Your love for the color Black', 'You carry black with unmatched confidence, sophistication, and breathtaking elegance.'],
  ['Your favorite cravings', 'How your face instantly lights up over a delicious plate of your favorite chicken food!'],
  ['Your Paris dream', 'The spark in your eyes whenever you talk about seeing the Eiffel Tower and Paris lights.'],
  ['Simply Sweety Thalli', 'You do not have to be anything other than yourself to be deeply admired, cherished, and wished the best.'],
]

function useCountdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const diff = Math.max(0, BIRTHDAY.getTime() - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    arrived: diff === 0,
  }
}

function App() {
  const [musicOn, setMusicOn] = useState(false)
  const [cakeLit, setCakeLit] = useState(true)
  const [wished, setWished] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState<number | null>(null)
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'gallery' | 'childhood' | 'talents'>('gallery')
  const [toast, setToast] = useState('')
  const [revealedPhotos, setRevealedPhotos] = useState<Record<string, boolean>>({})

  // Interactive "All About Sweety" Card Expansions
  const [openedAboutCards, setOpenedAboutCards] = useState<Record<string, boolean>>({})

  // Interactive Long-Distance Birthday Hug Counter
  const [hugCount, setHugCount] = useState(108)
  const [flyingHearts, setFlyingHearts] = useState<{ id: number; x: number; y: number }[]>([])

  // Interactive "Open When..." Capsules
  const [openWhenSelected, setOpenWhenSelected] = useState<string | null>(null)

  // Cinematic Video Recap & Sky Celebration State
  const [cinematicActive, setCinematicActive] = useState(false)
  const [cinematicStep, setCinematicStep] = useState(0)
  const [cinematicPhase, setCinematicPhase] = useState<'slideshow' | 'assembled'>('slideshow')
  const [fireworks, setFireworks] = useState(false)

  // Groq AI Cosmic Starlight Oracle State
  const [oracleTheme, setOracleTheme] = useState('Turning 20 (Two Decades of Light)')
  const [oracleCustomQuery, setOracleCustomQuery] = useState('')
  const [oracleBlessing, setOracleBlessing] = useState<string | null>(null)
  const [oracleLoading, setOracleLoading] = useState(false)
  const [copiedBlessing, setCopiedBlessing] = useState(false)

  // 20 Stars for 20 Years Wishing Constellation
  const [illuminatedStars, setIlluminatedStars] = useState<Record<number, boolean>>({
    1: true,
    20: true,
  })
  const [selectedStar, setSelectedStar] = useState<number | null>(20)

  const handleConsultOracle = async () => {
    setOracleLoading(true)
    try {
      const result = await generateOracleBlessing(oracleTheme, oracleCustomQuery)
      setOracleBlessing(result)
    } catch (err) {
      console.error(err)
    } finally {
      setOracleLoading(false)
    }
  }

  const handleCopyBlessing = () => {
    if (oracleBlessing) {
      navigator.clipboard.writeText(oracleBlessing)
      setCopiedBlessing(true)
      setTimeout(() => setCopiedBlessing(false), 2000)
    }
  }

  const toggleStar = (num: number) => {
    setIlluminatedStars((prev) => ({ ...prev, [num]: true }))
    setSelectedStar(num === selectedStar ? null : num)
  }

  const illuminateAllStars = () => {
    const all: Record<number, boolean> = {}
    for (let i = 1; i <= 20; i++) all[i] = true
    setIlluminatedStars(all)
  }

  const [isGateUnlocked, setIsGateUnlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [songTitle, setSongTitle] = useState("Undiporaadhey (Hushaaru)")
  const countdown = useCountdown()

  const startMusicFromGate = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().then(() => {
        setMusicOn(true)
      }).catch(() => {
        // Autoplay policy handled
      })
    }
  }, [])

  // Toggle reveal state for a specific photo card
  const togglePhotoReveal = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setRevealedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Toggle all cards in a chapter
  const toggleChapterReveal = (ids: string[]) => {
    const allOpen = ids.every((id) => !!revealedPhotos[id])
    setRevealedPhotos((prev) => {
      const next = { ...prev }
      ids.forEach((id) => {
        next[id] = !allOpen
      })
      return next
    })
  }

  // Find index in allPhotos by id and open in Lightbox
  const openPhotoById = (id: string) => {
    const idx = allPhotos.findIndex((p) => p.id === id)
    if (idx !== -1) {
      setPhotoIndex(idx)
      setRevealedPhotos((prev) => ({ ...prev, [id]: true }))
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (photoIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPhotoIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setPhotoIndex((prev) => {
          if (prev === null) return 0
          const nextIdx = (prev + allPhotos.length - 1) % allPhotos.length
          setRevealedPhotos((r) => ({ ...r, [allPhotos[nextIdx].id]: true }))
          return nextIdx
        })
      } else if (e.key === 'ArrowRight') {
        setPhotoIndex((prev) => {
          if (prev === null) return 0
          const nextIdx = (prev + 1) % allPhotos.length
          setRevealedPhotos((r) => ({ ...r, [allPhotos[nextIdx].id]: true }))
          return nextIdx
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [photoIndex])

  // Cinematic Video Slideshow Timer: advances pictures one by one like a video, then arranges them and blows firecrackers
  useEffect(() => {
    if (!cinematicActive || cinematicPhase !== 'slideshow') return

    const timer = window.setInterval(() => {
      setCinematicStep((prev) => {
        const next = prev + 1
        if (next >= chronologicalJourney.length) {
          setCinematicPhase('assembled')
          setFireworks(true)
          const allUnlocked: Record<string, boolean> = {}
          allPhotos.forEach((p) => {
            allUnlocked[p.id] = true
          })
          setRevealedPhotos(allUnlocked)
          return prev
        }
        return next
      })
    }, 2400)

    return () => window.clearInterval(timer)
  }, [cinematicActive, cinematicPhase])

  // Prevent background scroll during cinematic celebration
  useEffect(() => {
    if (cinematicActive) {
      const orig = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = orig
      }
    }
  }, [cinematicActive])

  const birthdayLine = useMemo(
    () =>
      countdown.arrived
        ? 'Happy 20th Birthday, Sweety Thalli! Today belongs entirely to you.'
        : 'A little countdown to your 20th birthday · November 27',
    [countdown.arrived]
  )

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) {
      setToast('Add your track to public/audio/undiporaadhey.mp3')
      return
    }
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
    } else {
      try {
        await audio.play()
        setMusicOn(true)
        setToast(`♫ Playing: ${songTitle} · Sweety's Favorite Track ♥`)
      } catch {
        setToast('Tap to choose or drop "undiporaadhey.mp3" to play!')
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
      }
    }
  }

  // Handle Long-Distance Hug Button Click
  const sendHug = (e: React.MouseEvent) => {
    setHugCount((prev) => prev + 1)
    const rect = e.currentTarget.getBoundingClientRect()
    const newHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2 + (Math.random() * 40 - 20),
      y: rect.top,
    }
    setFlyingHearts((prev) => [...prev.slice(-15), newHeart])
  }

  // Toggle an "All About Her" card
  const toggleAboutCard = (id: string) => {
    setOpenedAboutCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Launch the grand cinematic celebration: pictures display 1-by-1, assemble in order, then firecrackers blow!
  const launchFinale = () => {
    setCinematicActive(true)
    setCinematicStep(0)
    setCinematicPhase('slideshow')
    setFireworks(false)
  }

  const skipToAssembled = () => {
    setCinematicPhase('assembled')
    setFireworks(true)
    const allUnlocked: Record<string, boolean> = {}
    allPhotos.forEach((p) => {
      allUnlocked[p.id] = true
    })
    setRevealedPhotos(allUnlocked)
  }

  const replayCinematic = () => {
    setCinematicStep(0)
    setCinematicPhase('slideshow')
    setFireworks(false)
  }

  const closeCinematic = () => {
    setCinematicActive(false)
    setFireworks(false)
  }

  const filteredGalleryPhotos = useMemo(() => {
    if (galleryFilter === 'all') return allPhotos
    return allPhotos.filter((p) => p.category === galleryFilter)
  }, [galleryFilter])

  const heroPhoto = allPhotos.find((p) => p.id === 'photo-14')!
  const childhoodPhotos = allPhotos.filter((p) => p.category === 'childhood')
  const talentsPhotos = allPhotos.filter((p) => p.category === 'talents')
  const finalePhoto = allPhotos.find((p) => p.id === 'photo-13')!

  const isChildhoodAllOpen = childhoodPhotos.every((p) => !!revealedPhotos[p.id])
  const isTalentsAllOpen = talentsPhotos.every((p) => !!revealedPhotos[p.id])
  const isGalleryAllOpen = filteredGalleryPhotos.every((p) => !!revealedPhotos[p.id])

  const activeCinematicPhoto = chronologicalJourney[cinematicStep] || chronologicalJourney[0]

  return (
    <main>
      <AnimatePresence>
        {!isGateUnlocked && (
          <GiftBoxGate
            onUnlock={() => setIsGateUnlocked(true)}
            onStartMusic={startMusicFromGate}
          />
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src="./audio/undiporaadhey.mp3"
        onError={(e) => {
          const el = e.currentTarget
          if (!el.src.includes('romantic-instrumental.mp3')) {
            el.src = './audio/romantic-instrumental.mp3'
          }
        }}
        loop
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file && audioRef.current) {
            const url = URL.createObjectURL(file)
            audioRef.current.src = url
            audioRef.current.play().then(() => {
              setMusicOn(true)
              const cleanName = file.name.replace(/\.[^/.]+$/, '')
              setSongTitle(cleanName)
              setToast(`Now playing: ${cleanName} ♫`)
            }).catch(() => {
              setToast('Audio loaded. Tap Play to listen!')
            })
          }
        }}
      />
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <nav className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">♥</span> FOR SWEETY THALLI
        </a>
        <div className="nav-actions">
          <a href="#childhood">Childhood</a>
          <a href="#talents">Talents</a>
          <a href="#memories">Memories</a>
          <a href="#letter">My letter</a>
          <a href="#about">All About Her</a>
          <a href="#story">Story</a>
          <button
            className="sound-button"
            onClick={toggleMusic}
            aria-label={musicOn ? 'Pause music' : 'Play music'}
            title="Sweety's favorite track: Undiporaadhey (Hushaaru)"
          >
            {musicOn ? <Pause size={15} /> : <Music2 size={15} />}
            <span>{musicOn ? 'Pause' : 'Undiporaadhey ♫'}</span>
          </button>
          <button
            className="sound-button gift-replay-btn"
            onClick={() => setIsGateUnlocked(false)}
            title="Replay the 3D Gift Box Surprise"
          >
            <Gift size={15} />
            <span>Surprise 🎁</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-grid-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="eyebrow"
            >
              <span /> A WORLD CREATED JUST FOR YOU <span />
            </motion.div>

            <motion.p
              className="hero-pretitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Since I cannot be with you physically today, this website is my birthday gift to you
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.1 }}
            >
              Happy Birthday,
              <br />
              <em>Sweety Thalli</em>
              <span className="title-heart">♥</span>
            </motion.h1>

            <motion.p
              className="hero-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Even across the miles, every second of this day is dedicated to celebrating your smile, your Kuchipudi grace, your Paris dreams, and everything that makes you unique.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <button
                className="primary-button"
                onClick={() => {
                  document.getElementById('childhood')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                UNWRAP YOUR MEMORIES <Heart size={15} fill="currentColor" />
              </button>
              <a
                className="outline-button hero-outline-btn"
                href="#about"
              >
                ALL ABOUT SWEETY ✦
              </a>
            </motion.div>

            <div className="scroll-cue">
              <span>SCROLL TO UNWRAP HER SURPRISES</span>
              <ChevronDown size={15} />
            </div>
          </div>

          {/* Hero Portrait: Photo 14 */}
          <motion.div
            className="hero-portrait-wrapper"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            <div
              className="hero-portrait-card"
              onClick={() => openPhotoById('photo-14')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openPhotoById('photo-14')
              }}
              aria-label="View Sweety's Hero Portrait in high resolution"
            >
              <div className="hero-portrait-frame">
                <img
                  src={heroPhoto.src}
                  alt={heroPhoto.title}
                  className="hero-img"
                  style={{ objectPosition: heroPhoto.objectPosition }}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="hero-portrait-vignette" />
                <div className="hero-portrait-badge">
                  <span>✦</span> QUEEN OF THE DAY
                </div>
                <div className="hero-portrait-caption">
                  <h3>{heroPhoto.title}</h3>
                  <p>{heroPhoto.date}</p>
                </div>
                <span className="zoom-hint">
                  <Maximize2 size={15} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-side-note">
          NOVEMBER 27, 2026 <span>✦</span> CELEBRATING SWEETY THALLI
        </div>
        <div className="hero-bottom-glow" />
      </section>

      {/* Countdown Section */}
      <section className="countdown-section section-wrap">
        <div className="section-kicker">CELEBRATING 20 RADIANT YEARS · BORN NOVEMBER 27, 2006</div>
        <p className="countdown-caption">{birthdayLine}</p>
        <div className="countdown">
          {[
            ['DAYS', countdown.days],
            ['HOURS', countdown.hours],
            ['MINUTES', countdown.minutes],
            ['SECONDS', countdown.seconds],
          ].map(([label, value]) => (
            <div className="time-unit" key={label}>
              <strong>{String(value).padStart(2, '0')}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1: Childhood Memories (Photos 01, 02, 03) */}
      <section className="section-wrap childhood-section" id="childhood">
        <div className="section-heading">
          <div className="section-kicker">CHAPTER ONE · THE SWEETEST BEGINNINGS</div>
          <h2>
            Where every <em>beautiful story</em> began.
          </h2>
          <p>
            Little steps, bright eyes, and a heart full of wonder. Touch each card below to unwrap and reveal each childhood memory.
          </p>

          <button
            className="chapter-unwrap-btn"
            onClick={() => toggleChapterReveal(childhoodPhotos.map((p) => p.id))}
          >
            {isChildhoodAllOpen ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isChildhoodAllOpen ? 'FOLD ALL CHILDHOOD MEMORIES' : 'TOUCH TO UNWRAP ALL (3)'}</span>
          </button>
        </div>

        <div className="childhood-grid">
          {childhoodPhotos.map((photo) => {
            const isOpened = !!revealedPhotos[photo.id]
            return (
              <motion.div
                className={`childhood-card interactive-memory-card ${isOpened ? 'is-opened' : 'is-sealed'}`}
                key={photo.id}
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => {
                  if (!isOpened) {
                    togglePhotoReveal(photo.id)
                  } else {
                    openPhotoById(photo.id)
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (!isOpened) togglePhotoReveal(photo.id)
                    else openPhotoById(photo.id)
                  }
                }}
                aria-label={isOpened ? `View childhood memory: ${photo.title}` : `Touch to unwrap memory ${photo.number}`}
              >
                <AnimatePresence mode="wait">
                  {!isOpened ? (
                    <motion.div
                      className="card-sealed-cover"
                      key="sealed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="wax-seal-wrapper">
                        <div className="wax-seal-ring">
                          <Heart className="wax-seal-icon" size={24} fill="currentColor" />
                        </div>
                        <span className="seal-sparkle-dot">✦</span>
                      </div>
                      <span className="sealed-number">{photo.number}</span>
                      <span className="sealed-tag">CHILDHOOD MEMORY</span>
                      <h4 className="sealed-title">{photo.title}</h4>
                      <p className="sealed-teaser">{photo.teaser}</p>
                      <div className="sealed-touch-action">
                        <Sparkles size={13} />
                        <span>TOUCH TO UNWRAP</span>
                        <Sparkles size={13} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="card-opened-content"
                      key="opened"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="photo-card-inner">
                        <div
                          className="photo-blur-backdrop"
                          style={{ backgroundImage: `url(${photo.src})` }}
                          aria-hidden="true"
                        />
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="card-photo-img"
                          style={{ objectPosition: photo.objectPosition }}
                          loading="lazy"
                        />
                        <span className="photo-number">{photo.number}</span>
                        <span className="photo-tag">CHILDHOOD</span>
                        <span className="card-zoom-pill" title="View Fullscreen">
                          <Maximize2 size={13} />
                        </span>
                        <button
                          className="card-reclose-pill"
                          onClick={(e) => togglePhotoReveal(photo.id, e)}
                          title="Fold Memory"
                          aria-label="Fold Memory"
                        >
                          <EyeOff size={12} />
                        </button>
                      </div>
                      <div className="card-info">
                        <span className="card-date">
                          <Calendar size={11} style={{ marginRight: 5, verticalAlign: -1 }} />
                          {photo.date}
                        </span>
                        <h3>{photo.title}</h3>
                        <p>{photo.note}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Section 2: Talents and Traditional Memories (Photos 04, 07) */}
      <section className="section-wrap talents-section" id="talents">
        <div className="section-heading">
          <div className="section-kicker">CHAPTER TWO · PASSION, RHYTHM & KUCHIPUDI DEDICATION</div>
          <h2>
            Grace in motion, <em>artistry in spirit.</em>
          </h2>
          <p>
            Celebrating your professional devotion in Kuchipudi dance, classical mudras, and your vibrant love for western beats!
          </p>

          <button
            className="chapter-unwrap-btn"
            onClick={() => toggleChapterReveal(talentsPhotos.map((p) => p.id))}
          >
            {isTalentsAllOpen ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isTalentsAllOpen ? 'FOLD ALL DANCE MEMORIES' : 'TOUCH TO UNWRAP ALL (2)'}</span>
          </button>
        </div>

        <div className="talents-grid">
          {talentsPhotos.map((photo) => {
            const isOpened = !!revealedPhotos[photo.id]
            return (
              <motion.div
                className={`talent-card interactive-memory-card ${isOpened ? 'is-opened' : 'is-sealed'}`}
                key={photo.id}
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => {
                  if (!isOpened) {
                    togglePhotoReveal(photo.id)
                  } else {
                    openPhotoById(photo.id)
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (!isOpened) togglePhotoReveal(photo.id)
                    else openPhotoById(photo.id)
                  }
                }}
                aria-label={isOpened ? `View talent photo: ${photo.title}` : `Touch to unwrap memory ${photo.number}`}
              >
                <AnimatePresence mode="wait">
                  {!isOpened ? (
                    <motion.div
                      className="card-sealed-cover"
                      key="sealed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="wax-seal-wrapper">
                        <div className="wax-seal-ring gold-seal-ring">
                          <Sparkles className="wax-seal-icon" size={24} />
                        </div>
                        <span className="seal-sparkle-dot">✦</span>
                      </div>
                      <span className="sealed-number">{photo.number}</span>
                      <span className="sealed-tag gold-tag">KUCHIPUDI ARTIST</span>
                      <h4 className="sealed-title">{photo.title}</h4>
                      <p className="sealed-teaser">{photo.teaser}</p>
                      <div className="sealed-touch-action">
                        <Sparkles size={13} />
                        <span>TOUCH TO UNWRAP</span>
                        <Sparkles size={13} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="card-opened-content"
                      key="opened"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="talent-photo-frame">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="talent-img"
                          style={{ objectPosition: photo.objectPosition }}
                          loading="lazy"
                        />
                        <div className="talent-overlay" />
                        <span className="photo-number">{photo.number}</span>
                        <span className="photo-tag gold-tag">KUCHIPUDI & RHYTHM</span>
                        <span className="card-zoom-pill" title="View Fullscreen">
                          <Maximize2 size={13} />
                        </span>
                        <button
                          className="card-reclose-pill"
                          onClick={(e) => togglePhotoReveal(photo.id, e)}
                          title="Fold Memory"
                          aria-label="Fold Memory"
                        >
                          <EyeOff size={12} />
                        </button>
                      </div>
                      <div className="talent-info">
                        <span className="card-date">{photo.date}</span>
                        <h3>{photo.title}</h3>
                        <p>{photo.note}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Section 3: Main Memories Gallery (Photos 05, 06, 08, 09, 10, 11, 12) */}
      <section className="section-wrap memories-section" id="memories">
        <div className="section-heading">
          <div className="section-kicker">CHAPTER THREE · MOMENTS I TREASURE</div>
          <h2>
            Memories I will <em>always cherish.</em>
          </h2>
          <p>
            From your favorite color black to candid smiles and western beats. Touch any sealed card below to unwrap the memory inside.
          </p>

          <button
            className="chapter-unwrap-btn"
            onClick={() => toggleChapterReveal(filteredGalleryPhotos.map((p) => p.id))}
          >
            {isGalleryAllOpen ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isGalleryAllOpen ? 'FOLD ALL GALLERY MEMORIES' : `TOUCH TO UNWRAP ALL (${filteredGalleryPhotos.length})`}</span>
          </button>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="gallery-tabs">
          <button
            className={`tab-btn ${galleryFilter === 'gallery' ? 'active' : ''}`}
            onClick={() => setGalleryFilter('gallery')}
          >
            Main Gallery ({allPhotos.filter((p) => p.category === 'gallery').length})
          </button>
          <button
            className={`tab-btn ${galleryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setGalleryFilter('all')}
          >
            All Memories ({allPhotos.length})
          </button>
          <button
            className={`tab-btn ${galleryFilter === 'childhood' ? 'active' : ''}`}
            onClick={() => setGalleryFilter('childhood')}
          >
            Childhood ({childhoodPhotos.length})
          </button>
          <button
            className={`tab-btn ${galleryFilter === 'talents' ? 'active' : ''}`}
            onClick={() => setGalleryFilter('talents')}
          >
            Dance & Art ({talentsPhotos.length})
          </button>
        </div>

        <div className="memory-grid">
          {filteredGalleryPhotos.map((photo) => {
            const isOpened = !!revealedPhotos[photo.id]
            return (
              <motion.div
                className={`memory-card interactive-memory-card ${isOpened ? 'is-opened' : 'is-sealed'}`}
                key={photo.id}
                onClick={() => {
                  if (!isOpened) {
                    togglePhotoReveal(photo.id)
                  } else {
                    openPhotoById(photo.id)
                  }
                }}
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (!isOpened) togglePhotoReveal(photo.id)
                    else openPhotoById(photo.id)
                  }
                }}
                aria-label={isOpened ? `View photo: ${photo.title}` : `Touch to unwrap memory ${photo.number}`}
              >
                <AnimatePresence mode="wait">
                  {!isOpened ? (
                    <motion.div
                      className="card-sealed-cover"
                      key="sealed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="wax-seal-wrapper">
                        <div className="wax-seal-ring">
                          <Heart className="wax-seal-icon" size={22} fill="currentColor" />
                        </div>
                        <span className="seal-sparkle-dot">✦</span>
                      </div>
                      <span className="sealed-number">{photo.number}</span>
                      <span className="sealed-tag">{photo.categoryLabel}</span>
                      <h4 className="sealed-title">{photo.title}</h4>
                      <p className="sealed-teaser">{photo.teaser}</p>
                      <div className="sealed-touch-action">
                        <Sparkles size={13} />
                        <span>TOUCH TO UNWRAP</span>
                        <Sparkles size={13} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="card-opened-content"
                      key="opened"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="memory-photo">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          style={{ objectPosition: photo.objectPosition }}
                          loading="lazy"
                        />
                        <span className="photo-number">{photo.number}</span>
                        <span className="photo-category-pill">{photo.categoryLabel}</span>
                        <span className="card-zoom-pill" title="View Fullscreen">
                          <Maximize2 size={13} />
                        </span>
                        <button
                          className="card-reclose-pill"
                          onClick={(e) => togglePhotoReveal(photo.id, e)}
                          title="Fold Memory"
                          aria-label="Fold Memory"
                        >
                          <EyeOff size={12} />
                        </button>
                      </div>
                      <div className="memory-info">
                        <span>{photo.date}</span>
                        <h3>{photo.title}</h3>
                        <p>{photo.note}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        <p className="micro-note">
          Touch any card above to open & unwrap the memory inside. Tap again to open full-screen view.
        </p>
      </section>

      {/* Section 4: Letter Section */}
      <section className="letter-section" id="letter">
        <div className="letter-backdrop" />
        <div className="section-wrap letter-inner">
          <div className="section-kicker">CHAPTER FOUR · WORDS FROM MY HEART</div>
          <h2>
            A letter, just <em>for you.</em>
          </h2>
          <p className="letter-intro">Written across the distance, carrying my warmest wishes for your birthday.</p>
          <motion.button
            className={`envelope ${letterOpen ? 'opened' : ''}`}
            onClick={() => setLetterOpen(!letterOpen)}
            whileHover={{ scale: 1.025 }}
            aria-label="Open the birthday letter"
          >
            <div className="envelope-flap" />
            <div className="envelope-seal">♥</div>
            <div className="envelope-label">
              {letterOpen ? 'TOUCH TO CLOSE LETTER' : 'OPEN WHEN YOU ARE READY'}
            </div>
          </motion.button>
          <AnimatePresence>
            {letterOpen && (
              <motion.article
                className="letter-paper"
                initial={{ opacity: 0, y: 24, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 12, height: 0 }}
              >
                <span className="letter-date">NOVEMBER 27, 2026</span>
                <h3>My dearest Sweety Thalli,</h3>
                <p>
                  Happy Birthday, Sweety! Because I cannot be right there with you physically today to celebrate, I poured my whole heart into making this website your birthday surprise.
                </p>
                <p>
                  Today is all about you: your dedication to Kuchipudi and how effortlessly you dance, the stunning way you carry the color black, your happy cravings for your favorite chicken delights, and your dreams of walking under the glittering lights of Paris.
                </p>
                <p>
                  Life takes people on unpredictable paths, but my deep care, respect, and warmth for you will never fade. The memories we made, the sound of your laughter, and the peace we shared will always hold a sacred place in my heart.
                </p>
                <p>
                  On this special birthday, I genuinely wish you limitless happiness, good health, soaring success in dance and life, and for all your grandest dreams to come true.
                </p>
                <p className="letter-signoff">
                  Always wishing you happiness, peace, and dreams fulfilled.
                  <br />
                  <em>Happy Birthday, Sweety Thalli. ♥</em>
                </p>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================================
          HER PERSONAL UNIVERSE: ALL ABOUT SWEETY
          Deeply personal, interactive features!
          ========================================================================= */}
      <section className="about-section" id="about">
        <div className="section-wrap">
          <div className="section-heading">
            <div className="section-kicker">HER PERSONAL UNIVERSE · ALL ABOUT SWEETY</div>
            <h2>
              Everything that makes <em>Sweety, Sweety.</em>
            </h2>
            <p>
              The little cravings, signature elegance, dance dedication, and Paris dreams that define your wonderful soul. Touch any card to uncover a personal note.
            </p>
          </div>

          {/* Interactive "All About Her" Feature Cards */}
          <div className="about-cards-grid">
            {/* Card 1: Favorite Food Chicken */}
            <motion.div
              className={`about-card ${openedAboutCards['food'] ? 'active-about' : ''}`}
              whileHover={{ y: -6 }}
              onClick={() => toggleAboutCard('food')}
              role="button"
              tabIndex={0}
            >
              <div className="about-card-media">
                <img
                  src="./photos/about-chicken-feast.jpg"
                  alt="Hot delicious chicken feast"
                  className="about-card-img"
                  loading="lazy"
                />
                <div className="about-card-media-overlay" />
                <div className="about-pill-chip gold-chip">
                  <UtensilsCrossed size={12} />
                  <span>FAVORITE CRAVING</span>
                </div>
                <div className="about-media-badge gold-glow">
                  <Flame size={16} />
                </div>
              </div>

              <div className="about-card-body">
                <div className="about-card-header">
                  <span className="about-card-kicker">Instant Happiness</span>
                  <h3>Chicken Feasts 🍗</h3>
                </div>
                <p className="about-card-summary">
                  Nothing beats the sheer joy on your face when enjoying hot, delicious chicken! The ultimate instant happiness formula.
                </p>

                <AnimatePresence>
                  {openedAboutCards['food'] && (
                    <motion.div
                      className="about-card-secret"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="about-card-secret-content">
                        <span className="secret-note-tag">✦ PERSONAL NOTE</span>
                        <p>
                          "Sending you an unlimited virtual bucket of your favorite crispy, spicy chicken today! May your birthday table overflow with your favorite feast."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="about-card-tap-cue">
                  <span>{openedAboutCards['food'] ? '✦ TOUCH TO CLOSE NOTE' : '✦ TOUCH TO UNVEIL SECRET'}</span>
                  <Sparkles size={12} />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Favorite Color Black */}
            <motion.div
              className={`about-card ${openedAboutCards['black'] ? 'active-about' : ''}`}
              whileHover={{ y: -6 }}
              onClick={() => toggleAboutCard('black')}
              role="button"
              tabIndex={0}
            >
              <div className="about-card-media">
                <img
                  src="./photos/about-black-elegance.jpg"
                  alt="Midnight black elegance and stardust"
                  className="about-card-img"
                  loading="lazy"
                />
                <div className="about-card-media-overlay" />
                <div className="about-pill-chip silver-chip">
                  <Sparkles size={12} />
                  <span>SIGNATURE COLOR</span>
                </div>
                <div className="about-media-badge black-glow">
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>

              <div className="about-card-body">
                <div className="about-card-header">
                  <span className="about-card-kicker">Her Iconic Hue</span>
                  <h3>Elegance in Black 🖤</h3>
                </div>
                <p className="about-card-summary">
                  Her favorite color: Black. Sophisticated, bold, and stunning. Look at memory #05 and #08 — black was tailor-made for your grace.
                </p>

                <AnimatePresence>
                  {openedAboutCards['black'] && (
                    <motion.div
                      className="about-card-secret"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="about-card-secret-content">
                        <span className="secret-note-tag">✦ PERSONAL NOTE</span>
                        <p>
                          "Whenever you wear black, you don't just enter a room — you effortlessly own the entire spotlight with timeless elegance."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="about-card-tap-cue">
                  <span>{openedAboutCards['black'] ? '✦ TOUCH TO CLOSE NOTE' : '✦ TOUCH TO UNVEIL SECRET'}</span>
                  <Sparkles size={12} />
                </div>
              </div>
            </motion.div>

            {/* Card 3: Kuchipudi & Western Dance */}
            <motion.div
              className={`about-card ${openedAboutCards['dance'] ? 'active-about' : ''}`}
              whileHover={{ y: -6 }}
              onClick={() => toggleAboutCard('dance')}
              role="button"
              tabIndex={0}
            >
              <div className="about-card-media">
                <img
                  src="./photos/about-kuchipudi-art.jpg"
                  alt="Kuchipudi classical dance and artistic rhythm"
                  className="about-card-img"
                  loading="lazy"
                />
                <div className="about-card-media-overlay" />
                <div className="about-pill-chip wine-chip">
                  <Music size={12} />
                  <span>ART & RHYTHM</span>
                </div>
                <div className="about-media-badge wine-glow">
                  <Sparkles size={16} />
                </div>
              </div>

              <div className="about-card-body">
                <div className="about-card-header">
                  <span className="about-card-kicker">Heartbeats & Mudras</span>
                  <h3>Kuchipudi & Western 💃</h3>
                </div>
                <p className="about-card-summary">
                  Professional dedication in Kuchipudi mudras, storytelling, and footwork — blended with her energetic love for Western beats!
                </p>

                <AnimatePresence>
                  {openedAboutCards['dance'] && (
                    <motion.div
                      className="about-card-secret"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="about-card-secret-content">
                        <span className="secret-note-tag">✦ PERSONAL NOTE</span>
                        <p>
                          "From centuries of classical heritage to modern dance beats, dance is not just your talent — rhythm breathes through your soul."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="about-card-tap-cue">
                  <span>{openedAboutCards['dance'] ? '✦ TOUCH TO CLOSE NOTE' : '✦ TOUCH TO UNVEIL SECRET'}</span>
                  <Sparkles size={12} />
                </div>
              </div>
            </motion.div>

            {/* Card 4: Dream Destination Paris */}
            <motion.div
              className={`about-card ${openedAboutCards['paris'] ? 'active-about' : ''}`}
              whileHover={{ y: -6 }}
              onClick={() => toggleAboutCard('paris')}
              role="button"
              tabIndex={0}
            >
              <div className="about-card-media">
                <img
                  src="./photos/about-paris-eiffel.jpg"
                  alt="Paris Eiffel Tower illuminated at night"
                  className="about-card-img"
                  loading="lazy"
                />
                <div className="about-card-media-overlay" />
                <div className="about-pill-chip blue-chip">
                  <MapPin size={12} />
                  <span>DREAM DESTINATION</span>
                </div>
                <div className="about-media-badge paris-glow">
                  <Compass size={16} />
                </div>
              </div>

              <div className="about-card-body">
                <div className="about-card-header">
                  <span className="about-card-kicker">City of Lights</span>
                  <h3>The Lights of Paris 🗼</h3>
                </div>
                <p className="about-card-summary">
                  Her dream destination: Paris. The sparkling Eiffel Tower at midnight, quaint French cafés, and romantic cobblestone walks.
                </p>

                <AnimatePresence>
                  {openedAboutCards['paris'] && (
                    <motion.div
                      className="about-card-secret"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="about-card-secret-content">
                        <span className="secret-note-tag">✦ PERSONAL NOTE</span>
                        <p>
                          "I pray that soon you walk along the Seine, smiling as the Eiffel Tower glitters just for you. You deserve to see Paris!"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="about-card-tap-cue">
                  <span>{openedAboutCards['paris'] ? '✦ TOUCH TO CLOSE NOTE' : '✦ TOUCH TO UNVEIL SECRET'}</span>
                  <Sparkles size={12} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              LONG-DISTANCE LOVE & HUG COUNTER
              ========================================================================= */}
          <div className="distance-hug-box">
            <div className="hug-box-inner">
              <span className="hug-kicker">✦ LONG-DISTANCE BIRTHDAY LOVE ✦</span>
              <h3>Sending Hugs Across the Miles</h3>
              <p>
                Since I cannot be there to hug you in person today, tap the heart below to send unlimited birthday hugs straight to you!
              </p>

              <div className="hug-counter-display">
                <span className="hug-number">{hugCount.toLocaleString()}</span>
                <span className="hug-label">Hugs Delivered Across the Distance</span>
              </div>

              <motion.button
                className="hug-send-button"
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                onClick={sendHug}
              >
                <Heart size={20} fill="#ff4d6d" color="#ff4d6d" />
                <span>TAP TO SEND A BIRTHDAY HUG ♥</span>
              </motion.button>

              <div className="hug-milestone-tag">
                {hugCount >= 150 ? (
                  <span>✦ Over 150 hugs delivered! An infinity supply of warmth just for you. ✦</span>
                ) : hugCount >= 125 ? (
                  <span>✦ 125+ hugs! May you dance in Paris under the twinkling Eiffel lights! 🗼 ✦</span>
                ) : hugCount >= 115 ? (
                  <span>✦ 115+ hugs! A giant bucket of hot crispy chicken and happiness heading your way! 🍗 ✦</span>
                ) : (
                  <span>✦ Every tap sends real love and prayers across the miles. ✦</span>
                )}
              </div>
            </div>

            {/* Flying Hearts Floating Upward on Tap */}
            {flyingHearts.map((h) => (
              <motion.div
                key={h.id}
                className="flying-heart-particle"
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -180, scale: 1.8 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{ left: h.x, top: h.y }}
              >
                ♥
              </motion.div>
            ))}
          </div>

          {/* =========================================================================
              INTERACTIVE "OPEN WHEN..." BIRTHDAY CAPSULES
              ========================================================================= */}
          <div className="open-when-section">
            <div className="open-when-header">
              <span className="banner-kicker">✦ TIMELESS TIME CAPSULES ✦</span>
              <h3>Open When... Envelopes</h3>
              <p>Four special envelopes sealed with care. Touch any envelope to open its message.</p>
            </div>

            <div className="open-when-grid">
              {/* Capsule 1: Morning */}
              <div
                className={`open-when-card ${openWhenSelected === 'morning' ? 'card-opened' : ''}`}
                onClick={() => setOpenWhenSelected(openWhenSelected === 'morning' ? null : 'morning')}
              >
                <div className="capsule-seal">
                  <PartyPopper size={22} />
                </div>
                <h4>Open on Birthday Morning</h4>
                <span className="capsule-status">
                  {openWhenSelected === 'morning' ? 'TOUCH TO FOLD' : 'TOUCH TO UNSEAL'}
                </span>
                {openWhenSelected === 'morning' && (
                  <motion.div
                    className="capsule-letter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>
                      *"Good morning, Birthday Girl! Wake up knowing you are deeply appreciated. Take a deep breath, smile, and let today be filled with laughter and zero worries."*
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Capsule 2: Dance */}
              <div
                className={`open-when-card ${openWhenSelected === 'dance' ? 'card-opened' : ''}`}
                onClick={() => setOpenWhenSelected(openWhenSelected === 'dance' ? null : 'dance')}
              >
                <div className="capsule-seal gold-capsule">
                  <Music size={22} />
                </div>
                <h4>Open When You Want to Dance</h4>
                <span className="capsule-status">
                  {openWhenSelected === 'dance' ? 'TOUCH TO FOLD' : 'TOUCH TO UNSEAL'}
                </span>
                {openWhenSelected === 'dance' && (
                  <motion.div
                    className="capsule-letter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>
                      *"Whether practicing classical Kuchipudi mudras or dancing freely to western music, remember the joy it gives you. Never let the world quiet your rhythm."*
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Capsule 3: Comfort */}
              <div
                className={`open-when-card ${openWhenSelected === 'comfort' ? 'card-opened' : ''}`}
                onClick={() => setOpenWhenSelected(openWhenSelected === 'comfort' ? null : 'comfort')}
              >
                <div className="capsule-seal red-capsule">
                  <UtensilsCrossed size={22} />
                </div>
                <h4>Open When You Crave Comfort</h4>
                <span className="capsule-status">
                  {openWhenSelected === 'comfort' ? 'TOUCH TO FOLD' : 'TOUCH TO UNSEAL'}
                </span>
                {openWhenSelected === 'comfort' && (
                  <motion.div
                    className="capsule-letter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>
                      *"Whenever life gets chaotic, go get your favorite chicken meal, put on your comfiest black outfit, and remember that peaceful, sweet days will always find you."*
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Capsule 4: Midnight & Paris */}
              <div
                className={`open-when-card ${openWhenSelected === 'midnight' ? 'card-opened' : ''}`}
                onClick={() => setOpenWhenSelected(openWhenSelected === 'midnight' ? null : 'midnight')}
              >
                <div className="capsule-seal purple-capsule">
                  <Sparkles size={22} />
                </div>
                <h4>Open at Midnight Under the Stars</h4>
                <span className="capsule-status">
                  {openWhenSelected === 'midnight' ? 'TOUCH TO FOLD' : 'TOUCH TO UNSEAL'}
                </span>
                {openWhenSelected === 'midnight' && (
                  <motion.div
                    className="capsule-letter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>
                      *"Look up at the night sky. We may be in different cities, but we are looking at the exact same moon and stars. Wishing you safe warmth and a future that shines like Paris."*
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* =========================================================================
              20 STARS FOR 20 YEARS WISHING CONSTELLATION (2006 -> 2026)
              ========================================================================= */}
          <div className="constellation-section" id="constellation">
            <div className="constellation-header">
              <span className="banner-kicker">✦ TWO DECADES OF WONDER · 2006 — 2026 ✦</span>
              <h3>20 Stars for 20 Radiant Years</h3>
              <p>
                Each star in this celestial cluster represents a year of your life. Touch any star to illuminate it and reveal its memory.
              </p>
              <div className="constellation-actions">
                <span className="constellation-progress">
                  ✦ {Object.keys(illuminatedStars).length} of 20 Stars Shining ✦
                </span>
                <button className="small-action-btn" onClick={illuminateAllStars}>
                  <Sparkles size={13} /> Illuminate All 20 Stars
                </button>
              </div>
            </div>

            <div className="constellation-stars-grid">
              {twentyStars.map((s) => {
                const isIlluminated = !!illuminatedStars[s.year]
                const isSelected = selectedStar === s.year
                return (
                  <button
                    key={s.year}
                    className={`constellation-star-btn ${isIlluminated ? 'is-lit' : ''} ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => toggleStar(s.year)}
                    title={`Year ${s.year} (${s.calendarYear})`}
                  >
                    <span className="star-icon">★</span>
                    <span className="star-num">{s.year}</span>
                    <span className="star-cal-year">{s.calendarYear}</span>
                  </button>
                )
              })}
            </div>

            {selectedStar !== null && (
              <motion.div
                className="selected-star-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedStar}
              >
                {(() => {
                  const star = twentyStars.find((s) => s.year === selectedStar)!
                  return (
                    <div className="star-tribute-inner">
                      <div className="star-badge">
                        <span className="star-tribute-emoji">{star.icon}</span>
                        <div>
                          <strong>Year {star.year} · {star.calendarYear}</strong>
                          <h4>{star.title}</h4>
                        </div>
                      </div>
                      <p>{star.tribute}</p>
                    </div>
                  )
                })()}
              </motion.div>
            )}
          </div>

          {/* =========================================================================
              THE GROQ AI COSMIC STARLIGHT ORACLE
              ========================================================================= */}
          <div className="oracle-section" id="oracle">
            <div className="oracle-header">
              <span className="banner-kicker">✦ POWERED BY GROQ AI & INFINITE WARMTH ✦</span>
              <h3>The Cosmic Starlight Oracle</h3>
              <p>
                Ask the universe for a personal blessing on your 20th birthday. Select an aspect of your life or whisper your own thought, then let Groq AI generate a bespoke poetic prophecy just for you.
              </p>
            </div>

            <div className="oracle-box">
              <div className="oracle-theme-pills">
                {[
                  'Turning 20 (Two Decades of Light)',
                  'Kuchipudi & Dance Rhythm',
                  'Paris & Starlit Dreams',
                  'Crispy Chicken & Pure Joy',
                  'Midnight Elegance in Black',
                ].map((th) => (
                  <button
                    key={th}
                    className={`oracle-pill ${oracleTheme === th ? 'is-active' : ''}`}
                    onClick={() => setOracleTheme(th)}
                  >
                    {th}
                  </button>
                ))}
              </div>

              <div className="oracle-custom-input">
                <input
                  type="text"
                  placeholder="Optional: Whisper a question or personal birthday thought to the stars..."
                  value={oracleCustomQuery}
                  onChange={(e) => setOracleCustomQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleConsultOracle()
                  }}
                />
              </div>

              <button
                className="primary-button oracle-trigger-btn"
                onClick={handleConsultOracle}
                disabled={oracleLoading}
              >
                {oracleLoading ? (
                  <>
                    <Sparkles className="spin-slow" size={16} /> ALIGNING THE CONSTELLATIONS...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} /> CONSULT THE ORACLE <Sparkles size={14} />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {oracleBlessing && (
                  <motion.div
                    className="oracle-result-card"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="oracle-result-ornament">✦ ✦ ✦</div>
                    <span className="oracle-result-theme">{oracleTheme}</span>
                    <p className="oracle-result-text">{oracleBlessing}</p>
                    <div className="oracle-result-footer">
                      <button className="oracle-copy-btn" onClick={handleCopyBlessing}>
                        {copiedBlessing ? (
                          <>
                            <Check size={14} /> COPIED TO CLIPBOARD
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> COPY BLESSING
                          </>
                        )}
                      </button>
                      <button className="oracle-regen-btn" onClick={handleConsultOracle}>
                        <RotateCcw size={14} /> ASK THE STARS AGAIN
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Relationship Timeline */}
      <section className="section-wrap story-section" id="story">
        <div className="section-heading">
          <div className="section-kicker">CHAPTER FIVE · A STORY I VALUE</div>
          <h2>
            A chapter I will <em>always remember.</em>
          </h2>
          <p>Some chapters evolve. That will never change how meaningful and genuine they were.</p>
        </div>
        <div className="timeline">
          {story.map((item, i) => (
            <motion.div
              className={`timeline-item ${i % 2 ? 'right' : 'left'}`}
              key={item.number}
              initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker">{item.number}</div>
              <div className="timeline-card">
                <span>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 6: Things I Admire */}
      <section className="reasons-section" id="reasons">
        <div className="section-wrap">
          <div className="section-heading">
            <div className="section-kicker">CHAPTER SIX · THINGS I ADMIRE</div>
            <h2>
              Little things I <em>appreciate about you.</em>
            </h2>
            <p>Your Kuchipudi artistry, love for black, chicken feasts, and Paris dreams.</p>
          </div>
          <div className="reasons-grid">
            {reasons.map(([title, text], i) => (
              <motion.div className="reason-card" key={title} whileHover={{ y: -5 }}>
                <span className="reason-index">0{i + 1}</span>
                <Heart className="reason-heart" size={19} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Cake & Wish */}
      <section className="cake-section section-wrap" id="cake">
        <div className="section-kicker">CHAPTER SEVEN · MAKE A WISH</div>
        <h2>
          One wish, <em>just for you.</em>
        </h2>
        <p className="cake-copy">May this year bring you peace, inner strength, sweet laughter, and cherished dreams coming true.</p>
        <div className={`cake-scene ${wished ? 'wished' : ''}`}>
          <div className="cake-glow" />
          <div className="candles">
            {[0, 1, 2].map((n) => (
              <button
                className={`candle candle-${n + 1}`}
                key={n}
                onClick={() => setCakeLit(!cakeLit)}
                aria-label="Toggle candle flame"
              >
                <span className={`flame ${cakeLit ? '' : 'out'}`} />
              </button>
            ))}
          </div>
          <div className="cake-top" />
          <div className="cake-body">
            <span className="cake-drip">♥　♥　♥</span>
            <span className="cake-script">for you</span>
          </div>
          <div className="cake-plate" />
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setCakeLit(false)
            setWished(true)
            launchFinale()
          }}
        >
          {wished ? 'REPLAY THE CELEBRATION ♥' : 'BLOW OUT THE CANDLES & CELEBRATE'} <Sparkles size={16} />
        </button>
        <p className="micro-note">Tap the candles or button to begin the grand celebration.</p>
      </section>

      {/* Section 8: Birthday Finale (Photo 13) */}
      <section className="finale-section" id="finale">
        <div className="finale-stars" />
        <div className="section-wrap finale-content">
          <div className="section-kicker">CHAPTER EIGHT · CELEBRATING YOU</div>
          <div className="final-heart">♥</div>
          <h2>
            Wherever life takes you, <em>be happy.</em>
          </h2>

          {/* Finale Centerpiece: Photo 13 */}
          <motion.div
            className="finale-portrait-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onClick={() => openPhotoById('photo-13')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openPhotoById('photo-13')
            }}
            aria-label="View finale celebration portrait"
          >
            <div className="finale-portrait-card">
              <img
                src={finalePhoto.src}
                alt={finalePhoto.title}
                className="finale-img"
                style={{ objectPosition: finalePhoto.objectPosition }}
                loading="lazy"
              />
              <div className="finale-portrait-glow" />
              <div className="finale-portrait-badge">
                <Sparkles size={13} style={{ marginRight: 6 }} />
                MAY YOUR LIFE ALWAYS BLOOM
              </div>
              <span className="card-zoom-pill">
                <Maximize2 size={14} />
              </span>
            </div>
          </motion.div>

          <p>
            May life be gentle with you. May your Paris dreams find their way to you. May you always dance with pure joy and be surrounded by peace, kindness, and love.
          </p>
          <p className="final-wish">Happy Birthday, Sweety Thalli.</p>

          {/* Trigger for the Grand Memory Recap Video & Sky Firecrackers */}
          <button className="primary-button finale-sky-trigger-btn" onClick={launchFinale}>
            MAKE THE SKY CELEBRATE YOU <Sparkles size={16} />
          </button>

          <div className="signature">
            A BIRTHDAY WISH FROM ACROSS THE MILES <span>♥</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span>FOR SWEETY THALLI</span>
        <span>27 · 11 · 2026</span>
        <span>WISHING YOU WELL, ALWAYS ♥</span>
      </footer>

      {/* =========================================================================
          GRAND CINEMATIC MEMORY RECAP & SKY FIRECRACKERS MODAL
          ========================================================================= */}
      <AnimatePresence>
        {cinematicActive && (
          <motion.div
            className="cinematic-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Bar Controls */}
            <div className="cinematic-topbar">
              <div className="cinematic-brand">
                <span className="brand-dot">✦</span>
                {cinematicPhase === 'slideshow'
                  ? `SWEETY'S MEMORY RECAP · CHAPTER ${cinematicStep + 1} OF ${chronologicalJourney.length}`
                  : `✦ ALL ${chronologicalJourney.length} MEMORIES ASSEMBLED IN ORDER · SKY CELEBRATION ✦`}
              </div>

              <div className="cinematic-actions">
                {cinematicPhase === 'slideshow' ? (
                  <button className="cinematic-btn" onClick={skipToAssembled} title="Skip to firecrackers celebration">
                    <SkipForward size={14} />
                    <span>SKIP TO CELEBRATION</span>
                  </button>
                ) : (
                  <button className="cinematic-btn" onClick={replayCinematic} title="Replay video slideshow from start">
                    <RotateCcw size={14} />
                    <span>REPLAY RECAP</span>
                  </button>
                )}

                <button className="cinematic-close-btn" onClick={closeCinematic} aria-label="Close celebration">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Slideshow Progress Bar */}
            <div className="cinematic-progress-track">
              <motion.div
                className="cinematic-progress-fill"
                initial={false}
                animate={{
                  width:
                    cinematicPhase === 'slideshow'
                      ? `${((cinematicStep + 1) / chronologicalJourney.length) * 100}%`
                      : '100%',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* PHASE 1: Displaying each picture one by one like a video */}
            {cinematicPhase === 'slideshow' && (
              <div className="cinematic-stage">
                <div className="cinematic-centerpiece">
                  <AnimatePresence mode="wait">
                    <motion.div
                      className="cinematic-photo-card"
                      key={activeCinematicPhoto.id}
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -10 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                      <div className="cinematic-photo-frame">
                        <img
                          src={activeCinematicPhoto.src}
                          alt={activeCinematicPhoto.title}
                          className="cinematic-img"
                          style={{ objectPosition: activeCinematicPhoto.objectPosition }}
                        />
                        <div className="cinematic-photo-glow" />
                        <span className="cinematic-badge">
                          {activeCinematicPhoto.categoryLabel} · CHAPTER {activeCinematicPhoto.number}
                        </span>
                      </div>
                      <div className="cinematic-caption">
                        <span className="cinematic-date">{activeCinematicPhoto.date}</span>
                        <h3>{activeCinematicPhoto.title}</h3>
                        <p>{activeCinematicPhoto.note}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom tray: Arranging each picture into order step by step */}
                <div className="cinematic-order-tray">
                  <div className="tray-label">
                    <span>✦ MEMORIES ARRANGING IN ORDER ({cinematicStep + 1} / {chronologicalJourney.length}) ✦</span>
                  </div>
                  <div className="tray-strip">
                    {chronologicalJourney.map((photo, i) => {
                      const isFilled = i <= cinematicStep
                      const isCurrent = i === cinematicStep
                      return (
                        <div
                          className={`tray-slot ${isFilled ? 'filled' : 'empty'} ${isCurrent ? 'active-slot' : ''}`}
                          key={photo.id}
                        >
                          {isFilled ? (
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="tray-thumb"
                              style={{ objectPosition: photo.objectPosition }}
                            />
                          ) : (
                            <span className="tray-placeholder-number">{String(i + 1).padStart(2, '0')}</span>
                          )}
                          {isCurrent && <span className="tray-current-indicator">✦</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* PHASE 2: After all 20 pictures displayed -> Assembled in order + Firecrackers Blow! */}
            {cinematicPhase === 'assembled' && (
              <div className="cinematic-assembled-stage">
                <div className="assembled-header">
                  <motion.div
                    className="celebration-tagline-box"
                    initial={{ opacity: 0, y: -16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <span className="banner-kicker">✦ THE SKY CELEBRATES YOU · NOVEMBER 27 ✦</span>
                    <h1 className="banner-main-title">
                      YOU DESERVE THE WHOLE SKY <span className="title-heart">♥</span>
                    </h1>
                    <p className="banner-sub">
                      Happy Birthday, Sweety Thalli · Every Beautiful Memory Assembled in Order
                    </p>
                  </motion.div>
                </div>

                {/* The Complete 20 Photos Arranged in Perfect Order */}
                <div className="assembled-grid-container">
                  <div className="assembled-grid">
                    {chronologicalJourney.map((photo, index) => (
                      <motion.div
                        className="assembled-card"
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        onClick={() => openPhotoById(photo.id)}
                        role="button"
                        tabIndex={0}
                        title={`View ${photo.title} in full resolution`}
                      >
                        <div className="assembled-photo-frame">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            style={{ objectPosition: photo.objectPosition }}
                          />
                          <span className="assembled-number">{String(index + 1).padStart(2, '0')}</span>
                          <span className="card-zoom-pill">
                            <Maximize2 size={11} />
                          </span>
                        </div>
                        <div className="assembled-info">
                          <h4>{photo.title}</h4>
                          <span>{photo.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GRAND FIRECRACKERS & FIREWORKS BURSTS */}
            {fireworks && (
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
                <div className="firework fw-13">✦</div>
                <div className="firework fw-14">✧</div>
                <div className="firework fw-15">✹</div>
                <div className="firework fw-16">✸</div>
                <div className="firework fw-17">✦</div>
                <div className="firework fw-18">✧</div>
                <div className="firework fw-sparkle-1">✦</div>
                <div className="firework fw-sparkle-2">✧</div>
                <div className="firework fw-sparkle-3">✹</div>
                <div className="firework fw-sparkle-4">✦</div>
                <div className="firework fw-sparkle-5">✧</div>
                <div className="firework fw-sparkle-6">✹</div>
                <div className="firework fw-sparkle-7">★</div>
                <div className="firework fw-sparkle-8">★</div>
                <div className="firework fw-rocket-1">| ✦</div>
                <div className="firework fw-rocket-2">| ✧</div>
                <div className="firework fw-rocket-3">| ✹</div>
                <div className="firework fw-rocket-4">| ✦</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {photoIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhotoIndex(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setPhotoIndex(null)}
              aria-label="Close photo view"
            >
              <X size={20} />
            </button>
            <button
              className="lightbox-arrow prev"
              onClick={(e) => {
                e.stopPropagation()
                const nextIdx = (photoIndex + allPhotos.length - 1) % allPhotos.length
                setPhotoIndex(nextIdx)
                setRevealedPhotos((r) => ({ ...r, [allPhotos[nextIdx].id]: true }))
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-photo">
                <img
                  src={allPhotos[photoIndex].src}
                  alt={allPhotos[photoIndex].title}
                  style={{ objectPosition: allPhotos[photoIndex].objectPosition }}
                />
                <span className="lightbox-counter">
                  {String(photoIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
                </span>
                <span className="lightbox-category-pill">
                  {allPhotos[photoIndex].categoryLabel}
                </span>
              </div>
              <div className="lightbox-details">
                <span className="lightbox-date">{allPhotos[photoIndex].date}</span>
                <h3>{allPhotos[photoIndex].title}</h3>
                <p>{allPhotos[photoIndex].note}</p>
              </div>
            </div>

            <button
              className="lightbox-arrow next"
              onClick={(e) => {
                e.stopPropagation()
                const nextIdx = (photoIndex + 1) % allPhotos.length
                setPhotoIndex(nextIdx)
                setRevealedPhotos((r) => ({ ...r, [allPhotos[nextIdx].id]: true }))
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onAnimationComplete={() => window.setTimeout(() => setToast(''), 3500)}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Button */}
      <button
        className={`floating-music ${musicOn ? 'music-playing' : ''}`}
        onClick={toggleMusic}
        title={`Sweety's Favorite: ${songTitle}`}
        aria-label={musicOn ? 'Pause background music' : 'Play background music'}
      >
        {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>{musicOn ? '♫ UNDIPORAADHEY' : 'PLAY HER SONG'}</span>
      </button>
    </main>
  )
}

export default App
