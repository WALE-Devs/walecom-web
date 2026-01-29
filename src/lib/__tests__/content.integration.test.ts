import { describe, it, expect } from 'vitest'
import { fetchAbout } from '../about'
import { fetchContact } from '../contact'
import { fetchSlider } from '../slider'

describe('Content API Integration Tests', () => {
  // These tests require the backend to be running at http://127.0.0.1:8000

  describe('fetchAbout', () => {
    it('should fetch about content from real backend', async () => {
      const content = await fetchAbout()

      // Verify structure
      expect(content).toHaveProperty('id')
      expect(content).toHaveProperty('identifier')
      expect(content).toHaveProperty('title')
      expect(content).toHaveProperty('description')
      expect(content).toHaveProperty('language')
      expect(content).toHaveProperty('is_active')
      expect(content).toHaveProperty('last_updated')
      expect(content).toHaveProperty('blocks')

      // Verify data
      expect(content.identifier).toBe('about')
      expect(content.title).toBe('Sobre Nosotros')
      expect(content.language).toBe('es')
      expect(content.is_active).toBe(true)

      // Verify blocks
      expect(Array.isArray(content.blocks)).toBe(true)
      expect(content.blocks.length).toBeGreaterThan(0)

      // Verify first block structure
      const firstBlock = content.blocks[0]
      expect(firstBlock).toHaveProperty('id')
      expect(firstBlock).toHaveProperty('content')
      expect(firstBlock).toHaveProperty('identifier')
      expect(firstBlock).toHaveProperty('title')
      expect(firstBlock).toHaveProperty('subtitle')
      expect(firstBlock).toHaveProperty('content_text')
      expect(firstBlock).toHaveProperty('items')
      expect(firstBlock).toHaveProperty('image')
      expect(firstBlock).toHaveProperty('order')
      expect(firstBlock).toHaveProperty('is_active')
      expect(firstBlock).toHaveProperty('type')
      expect(firstBlock).toHaveProperty('language')
    })

    it('should have blocks with valid structure', async () => {
      const content = await fetchAbout()

      content.blocks.forEach(block => {
        expect(block.identifier).toBeTruthy()
        expect(block.title).toBeTruthy()
        expect(typeof block.is_active).toBe('boolean')
        expect(typeof block.order).toBe('number')

        // Verify items can be array or object
        expect(block.items).toBeDefined()
      })
    })
  })

  describe('fetchContact', () => {
    it('should fetch contact content from real backend', async () => {
      const content = await fetchContact()

      // Verify structure
      expect(content).toHaveProperty('id')
      expect(content).toHaveProperty('identifier')
      expect(content).toHaveProperty('title')
      expect(content).toHaveProperty('description')
      expect(content).toHaveProperty('blocks')

      // Verify data
      expect(content.identifier).toBe('contact')
      expect(content.title).toBe('Contáctanos')
      expect(content.language).toBe('es')

      // Verify blocks
      expect(Array.isArray(content.blocks)).toBe(true)
      expect(content.blocks.length).toBeGreaterThan(0)
    })

    it('should have contact blocks with items as objects', async () => {
      const content = await fetchContact()

      const infoBlock = content.blocks.find(b => b.identifier === 'information')
      expect(infoBlock).toBeDefined()

      // TypeScript knows items can be array | object, so we check with !Array.isArray
      if (infoBlock && !Array.isArray(infoBlock.items) && infoBlock.items) {
        expect(infoBlock.items).toHaveProperty('email')
        expect(infoBlock.items).toHaveProperty('phone')
        expect(infoBlock.items).toHaveProperty('address')
      }
    })
  })

  describe('fetchSlider', () => {
    it('should fetch slider content from real backend', async () => {
      const content = await fetchSlider()

      // Verify structure
      expect(content).toHaveProperty('id')
      expect(content).toHaveProperty('identifier')
      expect(content).toHaveProperty('title')
      expect(content).toHaveProperty('blocks')

      // Verify data
      expect(content.identifier).toBe('slider')
      expect(content.title).toBe('Home Slider')

      // Verify blocks
      expect(Array.isArray(content.blocks)).toBe(true)
      expect(content.blocks.length).toBeGreaterThan(0)
    })

    it('should have slider blocks with images', async () => {
      const content = await fetchSlider()

      content.blocks.forEach(block => {
        // Verify slider blocks have images
        expect(block.image).toBeTruthy()
        expect(block.image).toMatch(/^http:\/\//)

        // Verify active state
        expect(block.is_active).toBe(true)

        // Verify order
        expect(typeof block.order).toBe('number')
      })
    })

    it('should have slider blocks sorted by order', async () => {
      const content = await fetchSlider()

      // Verify blocks are in order
      for (let i = 1; i < content.blocks.length; i++) {
        expect(content.blocks[i].order).toBeGreaterThanOrEqual(content.blocks[i - 1].order)
      }
    })
  })

  describe('ContentBlock items field flexibility', () => {
    it('should handle items as array (for about content)', async () => {
      const content = await fetchAbout()

      const valuesBlock = content.blocks.find(b => b.identifier === 'values')
      expect(valuesBlock).toBeDefined()

      if (valuesBlock && Array.isArray(valuesBlock.items)) {
        expect(valuesBlock.items.length).toBeGreaterThan(0)
        expect(valuesBlock.items).toContain('Calidad')
        expect(valuesBlock.items).toContain('Sostenibilidad')
      }
    })

    it('should handle items as object (for contact content)', async () => {
      const content = await fetchContact()

      const infoBlock = content.blocks.find(b => b.identifier === 'information')
      expect(infoBlock).toBeDefined()

      // Check it's not an array, so it must be an object
      if (infoBlock && !Array.isArray(infoBlock.items) && infoBlock.items) {
        expect(infoBlock.items).toHaveProperty('email')
        expect(typeof infoBlock.items.email).toBe('string')
      }
    })

    it('should handle items as empty array (for FAQ content)', async () => {
      const content = await fetchAbout()

      const missionBlock = content.blocks.find(b => b.identifier === 'mission')
      expect(missionBlock).toBeDefined()

      if (missionBlock) {
        expect(Array.isArray(missionBlock.items)).toBe(true)
        expect(missionBlock.items.length).toBe(0)
      }
    })
  })
})
