import { defineStore } from 'pinia'

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

interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
}

interface WordPressState {
  posts: WordPressPost[]
  categories: WordPressCategory[]
  currentPost: WordPressPost | null
  loading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    total: number
  }
}

export const useWordPressStore = defineStore('wordpress', {
  state: (): WordPressState => ({
    posts: [],
    categories: [],
    currentPost: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0
    }
  }),

  getters: {
    getFeaturedPosts: (state) => {
      return state.posts.filter(post => post.acf?.affiliate_link)
    },
    
    getPostsByCategory: (state) => {
      return (categoryId: number) => {
        return state.posts.filter(post => post.categories.includes(categoryId))
      }
    },
    
    getCategoryById: (state) => {
      return (id: number) => {
        return state.categories.find(category => category.id === id)
      }
    }
  },

  actions: {
    async fetchPosts(params: {
      per_page?: number
      page?: number
      categories?: string
      search?: string
      orderby?: string
      order?: 'asc' | 'desc'
    } = {}) {
      this.loading = true
      this.error = null
      
      try {
        const { getPosts } = useWordPress()
        const result = await getPosts(params)
        
        this.posts = result.posts
        this.pagination = {
          currentPage: params.page || 1,
          totalPages: result.totalPages,
          total: result.total
        }
      } catch (error) {
        this.error = 'Failed to fetch posts'
        console.error('Store error:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchPostBySlug(slug: string) {
      this.loading = true
      this.error = null
      
      try {
        const { getPostBySlug } = useWordPress()
        this.currentPost = await getPostBySlug(slug)
      } catch (error) {
        this.error = 'Failed to fetch post'
        console.error('Store error:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const { getCategories } = useWordPress()
        this.categories = await getCategories()
      } catch (error) {
        this.error = 'Failed to fetch categories'
        console.error('Store error:', error)
      }
    },

    async searchPosts(query: string, page = 1) {
      return this.fetchPosts({
        search: query,
        page,
        per_page: 12
      })
    },

    async fetchPostsByCategory(categoryId: number, page = 1) {
      return this.fetchPosts({
        categories: categoryId.toString(),
        page,
        per_page: 12
      })
    },

    clearCurrentPost() {
      this.currentPost = null
    },

    clearError() {
      this.error = null
    }
  }
})