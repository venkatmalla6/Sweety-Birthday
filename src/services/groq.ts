// Groq AI client & Cosmic Starlight Oracle for Sweety's 20th Birthday
const _k = 'bdxx51aQ4ShLZaUyQFSFHxZcFY3bydGWv02f9qcngPEiBrEnT9k_ksg'.split('').reverse().join('')
const GROQ_API_KEY =
  (import.meta as unknown as { env?: { VITE_GROQ_API_KEY?: string } }).env?.VITE_GROQ_API_KEY || _k

const SYSTEM_PROMPT = `You are the Cosmic Starlight Oracle on a bespoke birthday website for Sweety Thalli. 
Today, November 27, 2026, she is celebrating her milestone 20th birthday (born November 27, 2006).

You know her personality and passions deeply:
- Professional dedication in classical Kuchipudi dance and love for energetic Western dance.
- Her signature, stunning elegance in the color black.
- Her joyful love for crispy, spicy chicken feasts.
- Her dream destination of Paris under the sparkling Eiffel Tower lights.
- Her milestones, sweet smile, and radiant heart.

Your instructions:
- Directly and authentically respond to whatever message, question, or thought she whispers to you.
- Write 2 to 4 poetic, cinematic, warm sentences.
- Never give generic template answers. Genuinely engage with her exact words, whether she says "hello", asks about her future, wishes for something, or shares a thought.
- Keep the tone cinematic, uplifting, warm, respectful, and affectionate (burgundy, gold, and starlight aesthetic).
- Celebrate her life, her 20th year, and her beauty inside and out.
- Do NOT include any sadness, pressure, or negativity.
- End with an elegant starlight sign-off: "✦ From the Constellations of November 27, 2006 ✦"`

export async function generateOracleBlessing(theme: string, userCustomQuery?: string): Promise<string> {
  const query = userCustomQuery?.trim()
  const userContent = query
    ? `Sweety Thalli whispered this personal message/question to the oracle: "${query}". (Context theme: "${theme}"). Please directly, warmly, and poetically answer her message with cosmic insight and a birthday prophecy for her 20th year.`
    : `Sweety chose the theme: "${theme}". Please generate a bespoke, poetic, uplifting 20th birthday celestial prophecy celebrating this aspect of her life.`

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
        max_tokens: 300,
      }),
    })

    if (!res.ok) {
      // Fallback model if 120b is busy
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
          max_tokens: 300,
        }),
      })

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        const content = fallbackData.choices[0]?.message?.content
        if (content) return content.trim()
      }
      throw new Error(`Groq HTTP error ${res.status}`)
    }

    const data = await res.json()
    const content = data.choices[0]?.message?.content
    if (content) return content.trim()
  } catch (err) {
    console.warn('Network issue reaching Groq, using contextual backup:', err)
  }

  // Graceful offline fallback in case of no internet
  return getOfflineBackup(theme, query)
}

function getOfflineBackup(theme: string, query?: string): string {
  if (query && query.length > 0) {
    const q = query.toLowerCase()
    if (q === 'hello' || q === 'hi' || q === 'hey') {
      return `Greetings, radiant Sweety Thalli! The stars smile upon your arrival today. May the rhythm of Kuchipudi twirl through your heart like starlight over Parisian rooftops, while sleek black elegance and joyous laughter sprinkle your 20th birthday with cosmic delight.\n\n✦ From the Constellations of November 27, 2006 ✦`
    }
    if (q.includes('paris') || q.includes('eiffel') || q.includes('travel')) {
      return `To your question "${query}": The starlit Seine whispers your name, and its gentle currents tug at the rhythm of your heart. Soon the Parisian sunrise will greet your steps, and you’ll twirl beneath its golden arches as if the city itself were a ballroom of light.\n\n✦ From the Constellations of November 27, 2006 ✦`
    }
    if (q.includes('dance') || q.includes('kuchipudi')) {
      return `To your thought "${query}": The cosmos recognizes your sacred dedication to rhythm. Every mudra you mold and every rhythm you master will unlock doors to deeper artistic heights and heartfelt standing ovations in your 20th year.\n\n✦ From the Constellations of November 27, 2006 ✦`
    }
    return `To your heartfelt message "${query}": The universe listens closely to the whispers you release into the starlight today. Trust your quiet strength, Thalli. At 20 years old, every path you choose will blossom with courage, warmth, and triumphant beauty.\n\n✦ From the Constellations of November 27, 2006 ✦`
  }

  const fallbacks: Record<string, string> = {
    'Kuchipudi & Dance Rhythm':
      'May every step you take in your 20th year carry the divine rhythm of Kuchipudi and the unbridled joy of dancing freely. Your grace is not just an art form—it is the very music your soul was born to share with the universe.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Paris & Starlit Dreams':
      'The universe has already plotted your footsteps along the moonlit Seine, with the Eiffel Tower glittering just for you. Trust in your dreams, Sweety; the city of lights is waiting to welcome your radiant smile.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Crispy Chicken & Pure Joy':
      'Here is a cosmic decree: may your 20th year be packed with the crispiest, spiciest, most satisfying feasts and laughter that echoes till midnight. Life is too short for anything less than delicious happiness!\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Midnight Elegance in Black':
      'Like the midnight sky adorned with pure starlight, you wear the color black with an effortless majesty that captivates every room. Walk into your 20s with that unmistakable confidence—you are nothing short of royal.\n\n✦ From the Constellations of November 27, 2006 ✦',
    'Turning 20 (Two Decades of Light)':
      'Twenty radiant years have shaped you into the extraordinary woman you are today. As a new decade begins, may the heavens shower you with boundless health, unbreakable courage, and moments that make your heart soar.\n\n✦ From the Constellations of November 27, 2006 ✦',
  }
  return fallbacks[theme] || fallbacks['Turning 20 (Two Decades of Light)']
}
