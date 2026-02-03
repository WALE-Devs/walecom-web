import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { apiUrl, getApiBaseUrl } from '../api'

describe('getApiBaseUrl', () => {
  const originalEnv = process.env
  const originalWindow = global.window

  afterEach(() => {
    // Reset environment after each test
    process.env = { ...originalEnv }
    global.window = originalWindow
  })

  describe('in server-side rendering (SSR)', () => {
    beforeEach(() => {
      // Mock server environment
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
    })

    it('should use INTERNAL_API_URL when available', () => {
      process.env.INTERNAL_API_URL = 'http://internal-backend:8000/api'
      expect(getApiBaseUrl()).toBe('http://internal-backend:8000/api')
    })

    it('should fallback to default backend URL when INTERNAL_API_URL is not set', () => {
      delete process.env.INTERNAL_API_URL
      expect(getApiBaseUrl()).toBe('http://backend:8000/api')
    })

    it('should ignore NEXT_PUBLIC_API_URL in SSR', () => {
      process.env.INTERNAL_API_URL = 'http://internal-backend:8000/api'
      process.env.NEXT_PUBLIC_API_URL = 'http://public-backend:8000/api'
      expect(getApiBaseUrl()).toBe('http://internal-backend:8000/api')
    })
  })

  describe('in client-side rendering (CSR)', () => {
    beforeEach(() => {
      // Mock browser environment
      Object.defineProperty(global, 'window', {
        value: {},
        writable: true,
      })
    })

    it('should use NEXT_PUBLIC_API_URL when available', () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://public-api.example.com/api'
      expect(getApiBaseUrl()).toBe('http://public-api.example.com/api')
    })

    it('should fallback to localhost when NEXT_PUBLIC_API_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_API_URL
      expect(getApiBaseUrl()).toBe('http://localhost:8000/api')
    })

    it('should ignore INTERNAL_API_URL in CSR', () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://public-api.example.com/api'
      process.env.INTERNAL_API_URL = 'http://internal-backend:8000/api'
      expect(getApiBaseUrl()).toBe('http://public-api.example.com/api')
    })
  })
})

describe('apiUrl', () => {
  describe('path construction', () => {
    it('should concatenate base and path correctly', () => {
      // Mock server environment
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('/products')).toBe('http://backend:8000/api/products')
    })

    it('should add leading slash if path does not have one', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('products')).toBe('http://backend:8000/api/products')
    })

    it('should handle paths with leading slash', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('/products')).toBe('http://backend:8000/api/products')
    })

    it('should handle paths with multiple segments', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('/products/featured')).toBe('http://backend:8000/api/products/featured')
    })

    it('should handle paths with query parameters', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('/products?category=shoes')).toBe('http://backend:8000/api/products?category=shoes')
    })

    it('should handle root path', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      process.env.INTERNAL_API_URL = 'http://backend:8000/api'

      expect(apiUrl('/')).toBe('http://backend:8000/api/')
    })
  })
})
