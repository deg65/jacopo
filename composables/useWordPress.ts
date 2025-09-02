import axios from 'axios'

interface WordPressPost {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  date: string
  slug: string
  categories: number[]
  tags: number[]
  acf?: {
    affiliate_link?: string
    product_price?: string
    product_rating?: number
    product_image?: string
    commission_rate?: string
    [key: string]: any
  }
}

interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
  }
}

interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
}

export const useWordPress = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.wpApiUrl

  const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Fetch all posts (affiliate products)
  const getPosts = async (params: {
    per_page?: number
    page?: number
    categories?: string
    search?: string
    orderby?: string
    order?: 'asc' | 'desc'
  } = {}) => {
    try {
      const response = await api.get('/posts', {
        params: {
          per_page: 10,
          _embed: true,
          ...params
        }
      })
      return {
        posts: response.data as WordPressPost[],
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  // Fetch single post by slug
  const getPostBySlug = async (slug: string) => {
    try {
      const response = await api.get('/posts', {
        params: {
          slug,
          _embed: true
        }
      })
      return response.data[0] as WordPressPost
    } catch (error) {
      console.error('Error fetching post:', error)
      throw error
    }
  }

  // Fetch categories
  const getCategories = async () => {
    try {
      const response = await api.get('/categories', {
        params: {
          per_page: 100
        }
      })
      return response.data as WordPressCategory[]
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  // Fetch featured media
  const getMedia = async (mediaId: number) => {
    try {
      const response = await api.get(`/media/${mediaId}`)
      return response.data as WordPressMedia
    } catch (error) {
      console.error('Error fetching media:', error)
      throw error
    }
  }

  // Search posts
  const searchPosts = async (query: string, page = 1) => {
    return getPosts({
      search: query,
      page,
      per_page: 12
    })
  }

  // Get posts by category
  const getPostsByCategory = async (categoryId: number, page = 1) => {
    return getPosts({
      categories: categoryId.toString(),
      page,
      per_page: 12
    })
  }

  return {
    getPosts,
    getPostBySlug,
    getCategories,
    getMedia,
    searchPosts,
    getPostsByCategory
  }
}