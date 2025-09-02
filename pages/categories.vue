<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Product Categories
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of affiliate products organized by category. Find exactly what you're looking for.
          </p>
        </div>
      </div>
    </div>

    <!-- Categories Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="i in 12" :key="i" class="animate-pulse">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="bg-gray-200 h-48"></div>
            <div class="p-6">
              <div class="bg-gray-200 h-6 rounded mb-2"></div>
              <div class="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
              <div class="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-red-500 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">Unable to Load Categories</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="refresh()"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Categories Grid -->
      <div v-else-if="data?.length" class="space-y-12">
        <!-- Stats -->
        <div class="text-center">
          <p class="text-gray-600">
            Browse {{ data.length }} categories with thousands of affiliate products
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="category in data"
            :key="category.id"
            class="group cursor-pointer"
            @click="navigateToCategory(category)"
          >
            <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <!-- Category Image -->
              <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-white text-center">
                    <!-- Category Icon -->
                    <div class="mb-3">
                      <component :is="getCategoryIcon(category.name)" class="h-12 w-12 mx-auto" />
                    </div>
                    <h3 class="text-xl font-bold">{{ category.name }}</h3>
                  </div>
                </div>
                
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              <!-- Category Info -->
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {{ category.count }} products
                  </span>
                  <svg class="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed" v-html="category.description || getDefaultDescription(category.name)"></p>
                
                <!-- Category Stats -->
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>Updated recently</span>
                    <span class="flex items-center">
                      <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Categories Section -->
        <div class="mt-16">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p class="text-gray-600">Our most popular product categories with the best affiliate deals</p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              v-for="category in featuredCategories"
              :key="'featured-' + category.id"
              class="group cursor-pointer"
              @click="navigateToCategory(category)"
            >
              <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                <div class="flex">
                  <!-- Image -->
                  <div class="w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <component :is="getCategoryIcon(category.name)" class="h-16 w-16 text-white" />
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 p-6">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ category.name }}</h3>
                        <p class="text-gray-600 text-sm mb-3" v-html="category.description || getDefaultDescription(category.name)"></p>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                          <span class="flex items-center">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {{ category.count }} products
                          </span>
                          <span class="flex items-center">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Trending
                          </span>
                        </div>
                      </div>
                      <svg class="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">No Categories Available</h3>
        <p class="text-gray-600 mb-6">
          We're working on adding product categories. Check back soon!
        </p>
        <NuxtLink
          to="/products"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All Products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wordpressAPI } from '~/utils/wordpress-api'

// SEO
useHead({
  title: 'Product Categories - AffiliateHub',
  meta: [
    {
      name: 'description',
      content: 'Browse our comprehensive collection of affiliate product categories. Find electronics, fashion, home goods, and more with detailed reviews and competitive prices.'
    },
    {
      name: 'keywords',
      content: 'affiliate products, categories, electronics, fashion, home, garden, sports, books, beauty, toys, health'
    }
  ]
})

// Fetch categories
const { data, pending, error, refresh } = await useLazyAsyncData(
  'categories',
  () => wordpressAPI.getCategories()
)

// Computed properties
const featuredCategories = computed(() => {
  if (!data.value) return []
  return data.value
    .filter(cat => cat.count > 5) // Categories with more than 5 products
    .sort((a, b) => b.count - a.count) // Sort by product count
    .slice(0, 4) // Take top 4
})

// Methods
const navigateToCategory = (category) => {
  navigateTo(`/products?category=${category.id}`)
}

const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase()
  
  // Return appropriate Heroicon component based on category name
  if (name.includes('electronic') || name.includes('tech')) {
    return 'svg' // DevicePhoneMobileIcon equivalent
  } else if (name.includes('fashion') || name.includes('clothing')) {
    return 'svg' // SparklesIcon equivalent
  } else if (name.includes('home') || name.includes('garden')) {
    return 'svg' // HomeIcon equivalent
  } else if (name.includes('sport') || name.includes('fitness')) {
    return 'svg' // FireIcon equivalent
  } else if (name.includes('book') || name.includes('education')) {
    return 'svg' // BookOpenIcon equivalent
  } else if (name.includes('beauty') || name.includes('health')) {
    return 'svg' // HeartIcon equivalent
  } else if (name.includes('toy') || name.includes('game')) {
    return 'svg' // PuzzlePieceIcon equivalent
  } else {
    return 'svg' // TagIcon equivalent
  }
}

const getDefaultDescription = (categoryName) => {
  const descriptions = {
    'Electronics': 'Discover the latest gadgets, smartphones, laptops, and tech accessories with competitive affiliate commissions.',
    'Fashion': 'Trendy clothing, shoes, and accessories for men, women, and children from top brands.',
    'Home & Garden': 'Transform your living space with furniture, decor, gardening tools, and home improvement products.',
    'Sports & Fitness': 'Equipment and gear for all your favorite sports and fitness activities.',
    'Books': 'Educational resources, novels, and professional development books across all genres.',
    'Beauty & Health': 'Skincare, makeup, wellness products, and health supplements from trusted brands.',
    'Toys & Games': 'Fun and educational toys, board games, and entertainment for all ages.',
    'Automotive': 'Car accessories, tools, and maintenance products for automotive enthusiasts.'
  }
  
  return descriptions[categoryName] || `Explore our curated selection of ${categoryName.toLowerCase()} products with great affiliate deals.`
}

// Create SVG icon component
const createIcon = (pathData) => {
  return h('svg', {
    class: 'h-12 w-12',
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: pathData
    })
  ])
}
</script>