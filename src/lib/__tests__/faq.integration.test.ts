import { describe, it, expect } from 'vitest'
import { fetchFAQ } from '../faq'

describe('FAQ API Integration Tests', () => {
  // These tests require the backend to be running at http://127.0.0.1:8000

  describe('fetchFAQ', () => {
    it('should fetch FAQ content from real backend', async () => {
      const content = await fetchFAQ()

      // Verify structure
      expect(content).toHaveProperty('id')
      expect(content).toHaveProperty('identifier')
      expect(content).toHaveProperty('title')
      expect(content).toHaveProperty('description')
      expect(content).toHaveProperty('blocks')

      // Verify data
      expect(content.identifier).toBe('faq')
      expect(content.title).toBe('Preguntas Frecuentes')
      expect(content.language).toBe('es')
      expect(content.is_active).toBe(true)

      // Verify blocks
      expect(Array.isArray(content.blocks)).toBe(true)
      expect(content.blocks.length).toBeGreaterThan(0)
    })

    it('should have FAQ blocks with questions and answers', async () => {
      const content = await fetchFAQ()

      content.blocks.forEach(block => {
        // Verify FAQ block structure
        expect(block).toHaveProperty('id')
        expect(block).toHaveProperty('identifier')
        expect(block).toHaveProperty('title')
        expect(block).toHaveProperty('content_text')
        expect(block).toHaveProperty('items')
        expect(block).toHaveProperty('order')

        // Verify title is a question
        expect(block.title).toBeTruthy()
        expect(block.title.length).toBeGreaterThan(0)

        // Verify content_text has the answer
        expect(block.content_text).toBeTruthy()
        expect(block.content_text.length).toBeGreaterThan(0)

        // Verify items is an empty array for FAQ
        expect(Array.isArray(block.items)).toBe(true)
        expect(block.items.length).toBe(0)
      })
    })

    it('should have specific FAQ questions from backend', async () => {
      const content = await fetchFAQ()

      // Find specific FAQ items
      const shippingBlock = content.blocks.find(b => b.identifier === 'shipping')
      const returnsBlock = content.blocks.find(b => b.identifier === 'returns')
      const paymentBlock = content.blocks.find(b => b.identifier === 'payment')

      expect(shippingBlock).toBeDefined()
      expect(returnsBlock).toBeDefined()
      expect(paymentBlock).toBeDefined()

      // Verify questions
      expect(shippingBlock!.title).toContain('envío')
      expect(returnsBlock!.title).toContain('devolver')
      expect(paymentBlock!.title).toContain('métodos de pago')
    })

    it('should have blocks sorted by order', async () => {
      const content = await fetchFAQ()

      // Verify blocks are in order
      for (let i = 1; i < content.blocks.length; i++) {
        expect(content.blocks[i].order).toBeGreaterThanOrEqual(content.blocks[i - 1].order)
      }
    })

    it('should have all required FAQ content', async () => {
      const content = await fetchFAQ()

      // Verify we have at least the 3 main FAQs
      expect(content.blocks.length).toBeGreaterThanOrEqual(3)

      // Verify each has content
      content.blocks.forEach(block => {
        expect(block.title.trim().length).toBeGreaterThan(0)
        expect(block.content_text.trim().length).toBeGreaterThan(0)
      })
    })
  })
})
