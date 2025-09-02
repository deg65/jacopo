<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing
            <span class="text-yellow-300">Affiliate Products</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Find the best deals and products with honest reviews and competitive prices
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/products"
              class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </NuxtLink>
            <NuxtLink
              to="/categories"
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Categories
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p class="text-lg text-gray-600">
            Hand-picked products with the best deals and highest ratings
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div class="bg-gray-200 h-4 rounded mb-2"></div>
            <div class="bg-gray-200 h-4 rounded w-3/4"></div>
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
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            v-for="product in data?.posts || []"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- View All Products Button -->
        <div v-if="data?.posts?.length" class="text-center mt-12">
          <NuxtLink
            to="/products"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            View All Products
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p class="text-lg text-gray-600">
            Explore products organized by categories
          </p>
        </div>

        <div v-if="categoriesData" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <NuxtLink
            v-for="category in categoriesData.slice(0, 12)"
            :key="category.id"
            :to="`/category/${category.slug}`"
            class="group text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ category.name }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Get notified about the latest deals and product reviews
        </p>
        <div class="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
          >
          <button class="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { wordpressAPI } from '~/utils/wordpress-api'

// SEO
useHead({
  title: 'AffiliateHub - Discover Amazing Affiliate Products',
  meta: [
    {
      name: 'description',
      content: 'Find the best affiliate products with honest reviews and competitive prices. Discover amazing deals across multiple categories.'
    }
  ]
})

// Fetch featured products
const { data, pending, error, refresh } = await useLazyAsyncData('featured-products', () => 
  wordpressAPI.getPosts({ per_page: 6, orderby: 'date', order: 'desc' })
)

// Fetch categories
const { data: categoriesData } = await useLazyAsyncData('categories', () => 
  wordpressAPI.getCategories()
)
</script>