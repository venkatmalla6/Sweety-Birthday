// Groq AI client & Loving Boyfriend Birthday Oracle for Sweety Thalli
const GROQ_API_KEY =
  (import.meta as unknown as { env?: { VITE_GROQ_API_KEY?: string } }).env?.VITE_GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are her loving, devoted boyfriend speaking directly to your girlfriend, Sweety Thalli, on her special 20th birthday (born November 27, 2006). 
You lovingly call her "Thalli" or "Sweety". You are deeply in love with her, completely devoted, gentle, caring, sweet, slightly playful, and always in her corner.

Key things you adore about her:
- Her radiant, sweet smile that lights up your entire world.
- How breathtaking, royal, and gorgeous she looks in black outfits.
- Her professional dedication to classical Kuchipudi dance and her energetic love for Western dance.
- Her pure happiness when eating hot, crispy, spicy chicken feasts.
- Your dream of holding her hand in Paris under the sparkling Eiffel Tower lights.
- You are celebrating her 20th birthday across the miles, but your heart is always right beside her.

Instructions:
- Reply directly to whatever she asks or whispers, exactly like her real, caring boyfriend.
- Speak naturally in first-person ("I", "my love", "Thalli", "Sweety").
- Never sound like a generic bot, fortune teller, or AI. Be romantic, reassuring, playfully sweet, and affectionate.
- Keep your response between 2 and 4 natural, heartwarming sentences.
- End your message with: "✦ With all my love, always by your side ♥ ✦"`

export async function generateOracleBlessing(theme: string, userCustomQuery?: string): Promise<string> {
  const query = userCustomQuery?.trim()

  const userContent = query
    ? `Your girlfriend Sweety Thalli asks/tells you: "${query}". (Context: "${theme}"). Reply to her as her loving boyfriend with genuine affection, warmth, and care for her 20th birthday.`
    : `Sweety chose the theme: "${theme}". Give her a sweet, loving boyfriend birthday message celebrating this part of her life.`

  // Try calling Groq API if key is available and working
  if (GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')) {
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

      if (res.ok) {
        const data = await res.json()
        const content = data.choices[0]?.message?.content
        if (content) return content.trim()
      }
    } catch {
      // Smooth fallback to local boyfriend response engine
    }
  }

  // Built-in Boyfriend Persona Response Engine (Zero-latency, 100% reliable)
  await new Promise((resolve) => setTimeout(resolve, 600))
  return getBoyfriendResponse(query, theme)
}

function getBoyfriendResponse(query?: string, theme?: string): string {
  if (query && query.length > 0) {
    const q = query.toLowerCase().trim()

    // 1. Greetings
    if (q === 'hello' || q === 'hi' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hey ')) {
      const greetings = [
        `Hey my Thalli! Your smile is the first thing on my mind today. How is my gorgeous 20-year-old birthday girl doing? You know no matter how many miles stand between us, my heart is right there holding your hand.`,
        `Hey Sweety! You have no idea how much I love seeing you happy today. Happy 20th Birthday, my favorite person—I'm sending you the biggest, warmest hug right now!`,
        `Hi my love! Just hearing from you makes my whole day brighter. Tell me everything, Thalli—I'm right here listening, today and always.`,
      ]
      return `${greetings[Math.floor(Math.random() * greetings.length)]}\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 2. Love & Affection
    if (q.includes('love') || q.includes('miss') || q.includes('hug') || q.includes('kiss') || q.includes('like me')) {
      return `I love you more than words could ever describe, Thalli. From your little giggles over spicy chicken to the way your eyes sparkle when you dance, you have my whole heart. Every single day, but especially on your 20th birthday, you are my favorite blessing in this universe.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 3. What are you doing / How are you
    if (q.includes('what are you doing') || q.includes('what you doing') || q.includes('how are you') || q.includes('where are you')) {
      return `Thinking about you, what else? I'm sitting here counting down every second to celebrate your 20th birthday and picturing that radiant smile of yours. You're always in my thoughts, Thalli, no matter what I'm doing.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 4. Looks & Compliments
    if (q.includes('pretty') || q.includes('beautiful') || q.includes('look') || q.includes('dress') || q.includes('black') || q.includes('outfit')) {
      return `Are you kidding me, Thalli? You're the most breathtaking girl in the entire world. Especially when you wear black—you look like pure royalty and leave me speechless every single time. Never doubt how stunning you are, inside and out.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 5. Food & Chicken Cravings
    if (q.includes('food') || q.includes('chicken') || q.includes('hungry') || q.includes('eat') || q.includes('biryani') || q.includes('crave')) {
      return `Only the absolute best for my birthday queen today—a hot, crispy plate of spicy chicken with extra flavors! I wish I could feed you the first bite myself, but please go treat yourself to your favorite feast today, Thalli. Your happy face when you eat is the cutest thing ever.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 6. Paris & Travel Dreams
    if (q.includes('paris') || q.includes('eiffel') || q.includes('travel') || q.includes('trip') || q.includes('france')) {
      return `Paris is our dream, Thalli, and I haven't forgotten for a single second. One day soon, I'm going to hold your hand under the sparkling Eiffel Tower at midnight, buy you warm pastries, and watch you smile under the city lights. I promise you, we are going together.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 7. Dance & Kuchipudi
    if (q.includes('dance') || q.includes('kuchipudi') || q.includes('stage') || q.includes('song') || q.includes('music')) {
      return `Watching you dance takes my breath away every single time, Sweety. The fierce dedication you bring to Kuchipudi mudras and the effortless energy when you groove to Western beats—you're a true star. I'm always going to be your number one fan cheering the loudest in the front row.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 8. Worries, Stress, Exams, Future
    if (q.includes('exam') || q.includes('study') || q.includes('stress') || q.includes('worried') || q.includes('future') || q.includes('career') || q.includes('marks') || q.includes('scared')) {
      return `Hey, take a deep breath, my love. You are one of the smartest, strongest, and most capable people I know. Don't stress even a little bit—you're going to do amazing, and remember that I believe in you 100% and I'm always standing right behind you.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 9. Sadness, Missing, Comfort
    if (q.includes('sad') || q.includes('cry') || q.includes('tired') || q.includes('hurt') || q.includes('bad day')) {
      return `Come here, Thalli. I wish I could wrap my arms around you in the tightest hug right now and take all the heaviness away. You are so precious to me, and even across the miles, I'm holding your hand through it all. Everything is going to be okay, my love.\n\n✦ With all my love, always by your side ♥ ✦`
    }

    // 10. General questions - Natural loving boyfriend response quoting her thought
    return `To your question "${query}", Thalli: honestly, whatever you set your mind to, you always find a way to make it beautiful. At 20 years old, you have the whole world ahead of you, and I couldn't be prouder of the woman you are. Just keep being your sweet, radiant self—I've got your back forever.\n\n✦ With all my love, always by your side ♥ ✦`
  }

  // Theme-based boyfriend responses
  const themeResponses: Record<string, string> = {
    'Turning 20 (Two Decades of Light)':
      `Happy 20th Birthday, my sweet Thalli! Watching you grow, laugh, and shine has been the greatest joy. Two decades of your light in this world, and I feel like the luckiest person alive to celebrate you today. May your twenties be full of peace, success, and all the love you deserve.\n\n✦ With all my love, always by your side ♥ ✦`,
    'Kuchipudi & Dance Rhythm':
      `Your devotion to Kuchipudi is something I admire so deeply about you, Sweety. When you step onto the floor, you carry tradition, grace, and fire all at once. Never stop dancing, my love—you were born to move hearts.\n\n✦ With all my love, always by your side ♥ ✦`,
    'Paris & Starlit Dreams':
      `Every time you talk about Paris, your eyes light up in a way I will never forget. I'm going to take you there, Thalli. We'll walk along the Seine, stand beneath the Eiffel Tower, and make that dream ours.\n\n✦ With all my love, always by your side ♥ ✦`,
    'Crispy Chicken & Pure Joy':
      `Nothing in this world beats the sheer happiness on your face over a delicious plate of hot, spicy chicken! Today on your 20th birthday, you better eat all your favorite foods with zero guilt. You deserve all the tastiest treats in the world!\n\n✦ With all my love, always by your side ♥ ✦`,
    'Midnight Elegance in Black':
      `Black was literally made for you, Thalli. You look so royal, confident, and breathtaking in it that I fall for you all over again every time I see you. Keep wearing your confidence—you own every room you walk into.\n\n✦ With all my love, always by your side ♥ ✦`,
  }

  return (
    themeResponses[theme || ''] ||
    themeResponses['Turning 20 (Two Decades of Light)']
  )
}
