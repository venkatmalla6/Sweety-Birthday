// Groq AI client & Cosmic Starlight Oracle for Sweety's 20th Birthday
const GROQ_API_KEY =
  (import.meta as unknown as { env?: { VITE_GROQ_API_KEY?: string } }).env?.VITE_GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are the Cosmic Starlight Oracle on a bespoke birthday website for Sweety Thalli. 
Today, November 27, 2026, she is celebrating her milestone 20th birthday (born November 27, 2006).

You know her personality and passions deeply:
- Professional dedication in classical Kuchipudi dance and love for energetic Western dance.
- Her signature, stunning elegance in the color black.
- Her joyful love for crispy, spicy chicken feasts.
- Her dream destination of Paris under the sparkling Eiffel Tower lights.
- Her milestones, sweet smile, and radiant heart.

Your instructions:
- Generate a 2 to 4 sentence personalized, poetic, celestial birthday blessing, wish, or prophecy.
- Keep the tone cinematic, uplifting, warm, respectful, and affectionate (burgundy, gold, and starlight aesthetic).
- Celebrate her life, her 20th year, and her beauty inside and out.
- Do NOT include any sadness, pressure, or negativity.
- End with an elegant starlight sign-off: "✦ From the Constellations of November 27, 2006 ✦"`

// Rich variations for each theme so every "Ask Again" click gives a fresh, inspiring blessing
const THEME_BLESSINGS: Record<string, string[]> = {
  'Turning 20 (Two Decades of Light)': [
    'Twenty radiant years have woven starlight into every chapter of your journey, Sweety. Standing at the threshold of two decades, may the heavens shower your path with boundless health, fearless courage, and laughter that echoes across the stars.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Twenty orbits around the sun, and with each one, your presence has made the world softer, brighter, and more beautiful. May your twenties be a golden tapestry of joy, peace, and triumphant dreams realized.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'The stars that witnessed your birth on November 27, 2006 shine brighter today in honor of the radiant woman you have become. Welcome to 20—a year destined to unfold your greatest miracles and deepest happiness.\n\n✦ From the Constellations of November 27, 2006 ✦',
  ],
  'Kuchipudi & Dance Rhythm': [
    'May every step you take in your 20th year carry the sacred devotion of Kuchipudi and the electric freedom of western dance. Your rhythm is not merely movement; it is the heartbeat of pure art that commands every stage with breathtaking majesty.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'The ghungroos sing your story and the mudras speak of ancient beauty. As you turn 20, may your passion for dance soar to grander stages and ignite a lifetime of standing ovations and pure fulfillment.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'From classical temple corridors to vibrant modern beats, you dance like someone who was born to translate emotions into gold. May this 20th year keep your feet dancing and your spirit forever soaring.\n\n✦ From the Constellations of November 27, 2006 ✦',
  ],
  'Paris & Starlit Dreams': [
    'The universe has already plotted your footsteps along the moonlit banks of the Seine, with the Eiffel Tower sparkling just for you. Believe in your dreams, Thalli; Paris is quietly waiting to welcome your unforgettable smile.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'A whisper across the cosmos confirms: cobblestone walks, warm Parisian cafés, and midnight lights beneath the Eiffel Tower are written in your golden destiny. Keep dreaming boldly—Paris will find you sooner than you think.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'You carry the elegance of Paris in your heart, Sweety. As you step into 20, the starlit skies of France lean closer, promising a journey filled with awe, romance, and memories you will treasure forever.\n\n✦ From the Constellations of November 27, 2006 ✦',
  ],
  'Crispy Chicken & Pure Joy': [
    'A cosmic decree from the heavens: may your 20th year overflow with the crispiest, spiciest chicken feasts, shared with dear people and followed by endless belly laughs. Life is simply too precious for anything less than mouthwatering joy!\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Nothing lights up your eyes quite like a hot, delicious feast. The universe promises that your 20s will be seasoned with savory delights, spontaneous food adventures, and the warmest celebrations of friendship.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'May your plate always be full, the spice always perfect, and your smile forever radiant. Here is to a 20th year rich with delicious flavors, cozy evenings, and pure, unfiltered contentment.\n\n✦ From the Constellations of November 27, 2006 ✦',
  ],
  'Midnight Elegance in Black': [
    'Like the midnight sky adorned in solitary starlight, you wear the color black with an effortless grace that commands respect and admiration. Step into your 20s with that quiet royalty—you were born to stand out.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Black is not just a color on you; it is a statement of sophistication, strength, and timeless poise. May your 20th year surround you with elegance, honor your gentle soul, and let your confidence illuminate every room.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Understated yet unforgettable, striking yet kind—you embody everything magnificent about black. As a new decade begins, wear your truth like your favorite black silhouette: fearless, flawless, and deeply admired.\n\n✦ From the Constellations of November 27, 2006 ✦',
  ],
}

// Smart contextual generator when she whispers her own thought/question
function generateCustomProphecy(query: string, theme: string): string {
  const q = query.toLowerCase()

  if (q.includes('paris') || q.includes('eiffel') || q.includes('travel') || q.includes('trip') || q.includes('tour')) {
    return `To your question "${query}": The constellations affirm that travel and wonder are woven into your 20s. The twinkling lights of Paris and grand avenues across the world are aligning to meet your adventurous spirit. Pack your dreams—the journey is already beginning.\n\n✦ From the Constellations of November 27, 2006 ✦`
  }

  if (q.includes('dance') || q.includes('kuchipudi') || q.includes('stage') || q.includes('performance')) {
    return `To your whisper "${query}": The cosmos recognizes your sacred dedication to dance. Every mudra you mold and every rhythm you master will unlock doors to deeper artistic heights and heartfelt recognition in your 20th year.\n\n✦ From the Constellations of November 27, 2006 ✦`
  }

  if (q.includes('future') || q.includes('career') || q.includes('success') || q.includes('dream') || q.includes('goal')) {
    return `To your thought "${query}": The stars counsel patience and confidence, Sweety. You carry both the intellect to succeed and the grace to endure. Your twenties will surprise you with opportunities that match the scale of your ambitions.\n\n✦ From the Constellations of November 27, 2006 ✦`
  }

  if (q.includes('happy') || q.includes('peace') || q.includes('love') || q.includes('smile') || q.includes('life')) {
    return `To your prayer "${query}": Peace and genuine joy are your celestial birthright. Wherever life takes you, may you always be surrounded by genuine affection, kind people, and days that make your heart feel feather-light.\n\n✦ From the Constellations of November 27, 2006 ✦`
  }

  // General bespoke blessing addressing her exact words
  return `To your heartfelt whisper "${query}": The universe listens closely to the wishes you release into the starlight today. Trust your quiet strength, Thalli. At 20 years old, every answer you seek is already unfolding in your favor, guided by warmth, courage, and unconditional grace.\n\n✦ From the Constellations of November 27, 2006 ✦`
}

export async function generateOracleBlessing(theme: string, userCustomQuery?: string): Promise<string> {
  // If the user typed a custom thought or question, answer it directly!
  if (userCustomQuery && userCustomQuery.trim().length > 0) {
    // If Groq API key is present and configured, attempt online LLM call
    if (GROQ_API_KEY && GROQ_API_KEY.length > 10) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 6000)

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              {
                role: 'user',
                content: `Sweety asked the oracle: "${userCustomQuery}". Selected theme: ${theme}. Generate a bespoke 20th birthday cosmic blessing prophecy.`,
              },
            ],
            temperature: 0.85,
            max_tokens: 250,
          }),
        })
        clearTimeout(timeoutId)

        if (res.ok) {
          const data = await res.json()
          const text = data.choices[0]?.message?.content
          if (text) return text
        }
      } catch (err) {
        console.warn('Groq API call bypassed to local celestial engine:', err)
      }
    }

    // High quality contextual response
    await new Promise((resolve) => setTimeout(resolve, 600))
    return generateCustomProphecy(userCustomQuery.trim(), theme)
  }

  // If a theme was selected without a custom query:
  if (GROQ_API_KEY && GROQ_API_KEY.length > 10) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 6000)

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            {
              role: 'user',
              content: `Theme: ${theme}. Generate a bespoke 20th birthday cosmic blessing prophecy for Sweety Thalli.`,
            },
          ],
          temperature: 0.85,
          max_tokens: 250,
        }),
      })
      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        const text = data.choices[0]?.message?.content
        if (text) return text
      }
    } catch (err) {
      console.warn('Groq API call bypassed to local celestial engine:', err)
    }
  }

  // Return a randomized variation for this theme
  await new Promise((resolve) => setTimeout(resolve, 550))
  const pool = THEME_BLESSINGS[theme] || THEME_BLESSINGS['Turning 20 (Two Decades of Light)']
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}
