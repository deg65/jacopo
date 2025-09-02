<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Search Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>
          
          <!-- Search Form -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for products..."
                class="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @keyup.enter="performSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                @click="performSearch"
                class="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <span class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Search
                </span>
              </button>
            </div>
          </div>
          
          <!-- Current Search Query -->
          <div v-if="currentQuery" class="mt-4">
            <p class="text-gray-600">
              Showing results for: <span class="font-semibold text-gray-900">"{{ currentQuery }}"</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 12" :key="i" class="animate-pulse">
          <div class="bg-white rounded-lg shadow-sm">
            <div class="bg-gray-200 h-64 rounded-t-lg"></div>
            <div class="p-6">
              <div class="bg-gray-200 h-4 rounded mb-2"></div>
              <div class="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
              <div class="bg-gray-200 h-8 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Search Error</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="refresh()"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Results -->
      <div v-else-if="data?.posts?.length" class="space-y-8">
        <!-- Results Info -->
        <div class="flex items-center justify-between">
          <p class="text-gray-600">
            Found {{ data.total }} result{{ data.total !== 1 ? 's' : '' }} for "{{ currentQuery }}"
          </p>
          
          <!-- Sort Options -->
          <div class="flex items-center space-x-4">
            <label class="text-sm text-gray-600">Sort by:</label>
            <select
              v-model="sortBy"
              @change="performSearch"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Latest</option>
              <option value="title">Name A-Z</option>
            </select>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in data.posts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Pagination -->
        <div v-if="data.totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <!-- Previous Button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Page Numbers -->
            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg border',
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 py-2 text-gray-500">...</span>
            </template>

            <!-- Next Button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === data.totalPages"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="currentQuery" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
        <p class="text-gray-600 mb-6">
          We couldn't find any products matching "{{ currentQuery }}". Try different keywords or browse our categories.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/products"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Categories
          </NuxtLink>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
        <p class="text-gray-600 mb-6">
          Enter keywords above to find the perfect affiliate products for you.
        </p>
        
        <!-- Popular Searches -->
        <div class="max-w-2xl mx-auto">
          <p class="text-sm text-gray-500 mb-4">Popular searches:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="term in popularSearches"
              :key="term"
              @click="searchQuery = term; performSearch()"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {{ term }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wordpressAPI } from '~/utils/wordpress-api'

// SEO
useHead({
  title: 'Search Products - AffiliateHub',
  meta: [
    {
      name: 'description',
      content: 'Search for affiliate products and find the best deals with detailed reviews and competitive prices.'
    }
  ]
})

// Reactive state
const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const currentQuery = ref('')
const currentPage = ref(1)
const sortBy = ref('relevance')

// Popular search terms
const popularSearches = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty',
  'Toys',
  'Health'
]

// Initialize from URL query
const initializeFromQuery = () => {
  const query = route.query.q
  const page = route.query.page
  const sort = route.query.sort
  
  if (query) {
    searchQuery.value = query
    currentQuery.value = query
  }
  
  if (page) {
    currentPage.value = parseInt(page) || 1
  }
  
  if (sort) {
    sortBy.value = sort
  }
}

// Initialize on mount
onMounted(() => {
  initializeFromQuery()
})

// Watch for route changes
watch(() => route.query, () => {
  initializeFromQuery()
})

// Fetch search results
const { data, pending, error, refresh } = await useLazyAsyncData(
  'search-results',
  () => {
    if (!currentQuery.value) return { posts: [], total: 0, totalPages: 0 }
    
    const params = {
      search: currentQuery.value,
      per_page: 12,
      page: currentPage.value
    }
    
    // Add sorting
    if (sortBy.value === 'date') {
      params.orderby = 'date'
      params.order = 'desc'
    } else if (sortBy.value === 'title') {
      params.orderby = 'title'
      params.order = 'asc'
    }
    
    return wordpressAPI.searchPosts(currentQuery.value, currentPage.value)
  },
  {
    watch: [currentQuery, currentPage, sortBy]
  }
)

// Computed properties
const visiblePages = computed(() => {
  if (!data.value || data.value.totalPages <= 1) return []
  
  const totalPages = data.value.totalPages
  const current = currentPage.value
  const pages = []
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(totalPages - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < totalPages - 2) {
      pages.push('...')
    }
    
    if (totalPages > 1) {
      pages.push(totalPages)
    }
  }
  
  return pages
})

// Methods
const performSearch = () => {
  if (!searchQuery.value.trim()) return
  
  currentQuery.value = searchQuery.value.trim()
  currentPage.value = 1
  
  // Update URL
  router.push({
    path: '/search',
    query: {
      q: currentQuery.value,
      ...(sortBy.value !== 'relevance' && { sort: sortBy.value })
    }
  })
}

const goToPage = (page) => {
  if (page >= 1 && page <= data.value.totalPages) {
    currentPage.value = page
    
    // Update URL
    router.push({
      path: '/search',
      query: {
        q: currentQuery.value,
        page: page > 1 ? page : undefined,
        ...(sortBy.value !== 'relevance' && { sort: sortBy.value })
      }
    })
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>