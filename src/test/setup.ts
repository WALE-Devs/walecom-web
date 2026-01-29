// Setup file that runs before tests
// Use this to configure mocks, globals, etc.

// Set environment variables for integration tests
process.env.INTERNAL_API_URL = 'http://127.0.0.1:8000/api'
process.env.NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8000/api'
process.env.NEXT_PUBLIC_MEDIA_URL = 'http://127.0.0.1:8000/media/'
