// Groq AI client for Sweety's 20th Birthday Cosmic Oracle
const GROQ_API_KEY =
  (import.meta as unknown as { env?: { VITE_GROQ_API_KEY?: string } }).env?.VITE_GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are the Cosmic Starlight Oracle on a bespoke birthday website for Sweety Thalli. 
Today, November 27, 2026, she is celebrating her milestone 20th birthday (born November 27, 2006).

You know her personality and passions deeply:
- Professional dedication in classical Kuchipudi dance and love for energetic Western dance.
- Her signature, stunning elegance in the color black.
- Her joyful love for crispy, spicy chicken feasts.
- Her dream destination of Paris under the sparkling Eiffel Tower lights, and memories of warmth and safety.
- Her milestones, sweet smile, and radiant heart.

Your instructions:
- Generate a 2 to 4 sentence personalized, poetic, celestial birthday blessing, wish, or prophecy.
- Keep the tone cinematic, uplifting, warm, respectful, and affectionate (burgundy, gold, and starlight aesthetic).
- Celebrate her life, her 20th year, and her beauty inside and out.
- Do NOT include any sadness, pressure, or negativity.
- End with an elegant starlight sign-off: "✦ From the Constellations of November 27, 2006 ✦"`

export async function generateOracleBlessing(theme: string, userCustomQuery?: string): Promise<string> {
  const userContent = userCustomQuery?.trim()
    ? `Custom question/thought from Sweety: "${userCustomQuery}". Theme: ${theme}. Write a bespoke 20th birthday cosmic blessing.`
    : `Theme chosen by Sweety: "${theme}". Write a personalized 20th birthday cosmic blessing celebrating this aspect of her life.`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.85,
        max_tokens: 240,
      }),
    })

    if (!res.ok) {
      // Fallback to 20b
      const fallbackRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userContent },
          ],
          temperature: 0.85,
          max_tokens: 240,
        }),
      })
      if (!fallbackRes.ok) throw new Error('Groq API error')
      const fallbackData = await fallbackRes.json()
      return fallbackData.choices[0]?.message?.content || getLocalFallback(theme)
    }

    const data = await res.json()
    return data.choices[0]?.message?.content || getLocalFallback(theme)
  } catch (err) {
    console.warn('Using local celestial blessing fallback:', err)
    return getLocalFallback(theme)
  }
}

// Graceful offline fallback in case of any network interruption
export function getLocalFallback(theme: string): string {
  const fallbacks: Record<string, string> = {
    'Kuchipudi & Dance Rhythm':
      "May every step you take in your 20th year carry the divine rhythm of Kuchipudi and the unbridled joy of dancing freely. Your grace is not just an art form—it is the very music your soul was born to share with the universe.\n\n✦ From the Constellations of November 27, 2006 ✦",
    'Paris & Starlit Dreams':
      "The universe has already plotted your footsteps along the moonlit Seine, with the Eiffel Tower glittering just for you. Trust in your dreams, Sweety; the city of lights is waiting to welcome your radiant smile.\n\n✦ From the Constellations of November 27, 2006 ✦",
    'Crispy Chicken & Pure Joy':
      "Here is a cosmic decree: may your 20th year be packed with the crispiest, spiciest, most satisfying feasts and laughter that echoes till midnight. Life is too short for anything less than delicious happiness!\n\n✦ From the Constellations of November 27, 2006 ✦",
    'Midnight Elegance in Black':
      "Like the midnight sky adorned with pure starlight, you wear the color black with an effortless majesty that captivates every room. Walk into your 20s with that unmistakable confidence—you are nothing short of royal.\n\n✦ From the Constellations of November 27, 2006 ✦",
    'Turning 20 (Two Decades of Light)':
      "Twenty radiant years have shaped you into the extraordinary woman you are today. As a new decade begins, may the heavens shower you with boundless health, unbreakable courage, and moments that make your heart soar.\n\n✦ From the Constellations of November 27, 2006 ✦",
  }
  return fallbacks[theme] || fallbacks['Turning 20 (Two Decades of Light)']
}
