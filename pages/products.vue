<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">All Products</h1>
            <p class="mt-2 text-gray-600">Discover amazing affiliate products and deals</p>
          </div>
          
          <!-- Filters -->
          <div class="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <!-- Category Filter -->
            <select
              v-model="selectedCategory"
              @change="filterProducts"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            
            <!-- Sort Filter -->
            <select
              v-model="sortBy"
              @change="filterProducts"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Latest</option>
              <option value="title">Name A-Z</option>
              <option value="modified">Recently Updated</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
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
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Unable to load products</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="refresh()"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else-if="data?.posts?.length" class="space-y-8">
        <!-- Results Info -->
        <div class="flex items-center justify-between">
          <p class="text-gray-600">
            Showing {{ ((currentPage - 1) * 12) + 1 }}-{{ Math.min(currentPage * 12, data.total) }} of {{ data.total }} products
          </p>
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

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your filters or check back later for new products.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wordpressAPI } from '~/utils/wordpress-api'

// SEO
useHead({
  title: 'All Products - AffiliateHub',
  meta: [
    {
      name: 'description',
      content: 'Browse all affiliate products with detailed reviews and competitive prices. Find the best deals across multiple categories.'
    }
  ]
})

// Reactive state
const currentPage = ref(1)
const selectedCategory = ref('')
const sortBy = ref('date')

// Fetch categories
const { data: categories } = await useLazyAsyncData('categories', () => 
  wordpressAPI.getCategories()
)

// Fetch products with reactive parameters
const { data, pending, error, refresh } = await useLazyAsyncData(
  'products',
  () => wordpressAPI.getPosts({
    per_page: 12,
    page: currentPage.value,
    categories: selectedCategory.value || undefined,
    orderby: sortBy.value,
    order: 'desc'
  }),
  {
    watch: [currentPage, selectedCategory, sortBy]
  }
)

// Computed properties
const visiblePages = computed(() => {
  if (!data.value) return []
  
  const totalPages = data.value.totalPages
  const current = currentPage.value
  const pages = []
  
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first page, current page area, and last page with ellipsis
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
const goToPage = (page) => {
  if (page >= 1 && page <= data.value.totalPages) {
    currentPage.value = page
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const filterProducts = () => {
  currentPage.value = 1 // Reset to first page when filtering
}

// Watch for URL query parameters
const route = useRoute()
watch(() => route.query, (newQuery) => {
  if (newQuery.category) {
    selectedCategory.value = newQuery.category
  }
  if (newQuery.page) {
    currentPage.value = parseInt(newQuery.page) || 1
  }
}, { immediate: true })
</script>