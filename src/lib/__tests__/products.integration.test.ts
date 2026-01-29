import { describe, it, expect, beforeAll } from 'vitest'
import { fetchProducts, fetchProductBySlug } from '../products'

describe('Products API Integration Tests', () => {
  // These tests require the backend to be running at http://127.0.0.1:8000

  describe('fetchProducts', () => {
    it('should fetch products list from real backend', async () => {
      const products = await fetchProducts()

      // Verify we get an array
      expect(Array.isArray(products)).toBe(true)

      // Verify we have at least one product
      expect(products.length).toBeGreaterThan(0)

      // Verify structure of first product
      const firstProduct = products[0]
      expect(firstProduct).toHaveProperty('id')
      expect(firstProduct).toHaveProperty('name')
      expect(firstProduct).toHaveProperty('slug')
      expect(firstProduct).toHaveProperty('description')
      expect(firstProduct).toHaveProperty('base_sku')
      expect(firstProduct).toHaveProperty('category')
      expect(firstProduct).toHaveProperty('currency')
      expect(firstProduct).toHaveProperty('default_price')
      expect(firstProduct).toHaveProperty('default_stock')
      expect(firstProduct).toHaveProperty('image')
      expect(firstProduct).toHaveProperty('tags')

      // Verify image is a full URL (not relative path)
      expect(firstProduct.image).toMatch(/^http:\/\//)

      // Verify tags is an array
      expect(Array.isArray(firstProduct.tags)).toBe(true)
    })

    it('should have products with valid price format', async () => {
      const products = await fetchProducts()

      products.forEach(product => {
        // Verify price is a string that can be parsed to float
        expect(product.default_price).toBeTruthy()
        expect(parseFloat(product.default_price)).not.toBeNaN()
      })
    })

    it('should have products with all required fields populated', async () => {
      const products = await fetchProducts()

      products.forEach(product => {
        expect(product.id).toBeGreaterThan(0)
        expect(product.name).toBeTruthy()
        expect(product.slug).toBeTruthy()
        expect(product.description).toBeTruthy()
        expect(product.base_sku).toBeTruthy()
        expect(product.currency).toBe('PEN')
        expect(product.image).toBeTruthy()
      })
    })
  })

  describe('fetchProductBySlug', () => {
    it('should fetch product detail from real backend', async () => {
      // Use a product slug that we know exists
      const product = await fetchProductBySlug('zapatillas-urbanas-blancas')

      expect(product).not.toBeNull()
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('slug')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('base_sku')
      expect(product).toHaveProperty('category')
      expect(product).toHaveProperty('currency')
      expect(product).toHaveProperty('default_price')
      expect(product).toHaveProperty('default_stock')
      expect(product).toHaveProperty('main_image')
      expect(product).toHaveProperty('images')
      expect(product).toHaveProperty('variants')
      expect(product).toHaveProperty('related_products')
      expect(product).toHaveProperty('tags')
    })

    it('should fetch product with complete detail structure', async () => {
      const product = await fetchProductBySlug('zapatillas-urbanas-blancas')

      expect(product).not.toBeNull()

      // Verify main_image is a full URL
      expect(product!.main_image).toMatch(/^http:\/\//)

      // Verify images array
      expect(Array.isArray(product!.images)).toBe(true)
      expect(product!.images.length).toBeGreaterThan(0)

      // Verify first image structure
      const firstImage = product!.images[0]
      expect(firstImage).toHaveProperty('id')
      expect(firstImage).toHaveProperty('product')
      expect(firstImage).toHaveProperty('image')
      expect(firstImage).toHaveProperty('position')
      expect(firstImage.image).toMatch(/^http:\/\//)

      // Verify variants array
      expect(Array.isArray(product!.variants)).toBe(true)
      expect(product!.variants.length).toBeGreaterThan(0)

      // Verify first variant structure
      const firstVariant = product!.variants[0]
      expect(firstVariant).toHaveProperty('id')
      expect(firstVariant).toHaveProperty('name')
      expect(firstVariant).toHaveProperty('sku')
      expect(firstVariant).toHaveProperty('price')
      expect(firstVariant).toHaveProperty('stock')

      // Verify related_products array
      expect(Array.isArray(product!.related_products)).toBe(true)

      // Verify first related product structure
      if (product!.related_products.length > 0) {
        const firstRelated = product!.related_products[0]
        expect(firstRelated).toHaveProperty('id')
        expect(firstRelated).toHaveProperty('name')
        expect(firstRelated).toHaveProperty('slug')
        expect(firstRelated).toHaveProperty('price')
        expect(firstRelated).toHaveProperty('currency')
        expect(firstRelated).toHaveProperty('image')
        expect(firstRelated.image).toMatch(/^http:\/\//)
      }
    })

    it('should return null for non-existent product', async () => {
      const product = await fetchProductBySlug('non-existent-product-slug-12345')
      expect(product).toBeNull()
    })

    it('should fetch a specific product with correct data', async () => {
      const product = await fetchProductBySlug('zapatillas-urbanas-blancas')

      expect(product).not.toBeNull()
      expect(product!.name).toBe('Zapatillas Urbanas Blancas')
      expect(product!.slug).toBe('zapatillas-urbanas-blancas')
      expect(product!.base_sku).toBe('ZUB')
      expect(product!.currency).toBe('PEN')
      expect(product!.default_price).toBe('259.90')
    })
  })
})
