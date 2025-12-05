import { ref, computed } from 'vue'
import universitiesData from '@/data-renewed/universities.json'
import programsData from '@/data-renewed/programs.json'

export function useAIAssistant() {
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const isOpen = ref(false)

  const apiKey = import.meta.env.VITE_AI_API_KEY
  const apiUrl = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com/v1/chat/completions'

  // Build context from dataset
  const dataContext = computed(() => {
    const uniSummary = universitiesData.map((u) => ({
      id: u.id,
      name: u.name?.en || u.name,
      region: u.region?.en || u.region,
      rating: u.rating,
      website: u.website,
    }))

    const progSummary = programsData.map((p) => ({
      id: p.id,
      university_id: p.university_id,
      name: p.name?.en || p.name,
      description: p.description?.en || p.description,
    }))

    return `
Available Universities:
${JSON.stringify(uniSummary, null, 2)}

Available Programs:
${JSON.stringify(progSummary, null, 2)}
    `.trim()
  })

  const systemPrompt = `You are an AI assistant for AI University DataHub, a platform for exploring universities and programs in Kazakhstan.
You help users find the right university and program based on their preferences.
Be helpful, concise, and provide specific recommendations when possible.
When recommending, mention specific university names, programs, cities, and prices.

Here is the current dataset you can reference:
${dataContext.value}`

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return

    // Add user message
    messages.value.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    })

    isLoading.value = true
    error.value = null

    try {
      // If no API key, provide a simulated response
      if (!apiKey) {
        await simulateResponse(userMessage)
        return
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.value.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      messages.value.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date(),
      })
    } catch (e) {
      error.value = 'Failed to get response. Please try again.'
      console.error('AI Assistant error:', e)
      await simulateResponse(userMessage)
    } finally {
      isLoading.value = false
    }
  }

  const simulateResponse = async (userMessage) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerMessage = userMessage.toLowerCase()
    let response = ''

    if (
      lowerMessage.includes('computer science') ||
      lowerMessage.includes('it') ||
      lowerMessage.includes('programming')
    ) {
      response = `For IT and Computer Science, I recommend:

1. **Nazarbayev University** - Computer Science & Engineering (Bachelor, 4 years, English) - ₸4,500,000/year. Top-rated with global partnerships.

2. **Kazakh National University** - Computer Science (Bachelor, 4 years, English) - ₸900,000/year. Great value with Erasmus+ mobility.

3. **Satbayev University** - Information Systems (Bachelor, 4 years, English) - ₸950,000/year. Strong technical focus.

Would you like more details about any of these programs?`
    } else if (
      lowerMessage.includes('cheap') ||
      lowerMessage.includes('affordable') ||
      lowerMessage.includes('budget')
    ) {
      response = `For affordable options, consider:

1. **ENU (Astana)** - Translation Studies - ₸550,000 total (4 years)
2. **ENU (Astana)** - Physics - ₸600,000 total (4 years)
3. **KazNU (Almaty)** - Biology - ₸650,000 total (4 years)

All have good quality and mobility options like Erasmus+!`
    } else if (lowerMessage.includes('english')) {
      response = `Programs taught in English:

- Nazarbayev University: All programs (CS, Finance, Chemical Engineering)
- KIMEP: Business Administration, Law
- KazNU: Computer Science, International Relations, Economics

Nazarbayev University has the most international environment with 100% English instruction.`
    } else if (
      lowerMessage.includes('best') ||
      lowerMessage.includes('top') ||
      lowerMessage.includes('recommend')
    ) {
      response = `Top universities by rating:

1. **Nazarbayev University** (95/100) - Astana, world-class research university
2. **Kazakh National University** (92/100) - Almaty, oldest and largest
3. **KIMEP University** (88/100) - Almaty, best for business/law

For specific field recommendations, tell me what you're interested in studying!`
    } else {
      response = `I can help you find the perfect university or program! Try asking me about:

• Best programs for a specific field (IT, Business, Engineering, etc.)
• Affordable study options
• English-taught programs
• Universities in specific cities (Almaty, Astana)
• Mobility and exchange opportunities

What would you like to know?`
    }

    messages.value.push({
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    })
  }

  const clearMessages = () => {
    messages.value = []
  }

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    messages,
    isLoading,
    error,
    isOpen,
    sendMessage,
    clearMessages,
    toggleOpen,
    open,
    close,
  }
}
