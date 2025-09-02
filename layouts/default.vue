<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center">
              <h1 class="text-2xl font-bold text-blue-600">AffiliateHub</h1>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink
                to="/"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                Home
              </NuxtLink>
              <NuxtLink
                to="/products"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                Products
              </NuxtLink>
              <NuxtLink
                to="/categories"
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                Categories
              </NuxtLink>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:block flex-1 max-w-lg mx-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @keyup.enter="handleSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-show="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              @click="mobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              @click="mobileMenuOpen = false"
            >
              Products
            </NuxtLink>
            <NuxtLink
              to="/categories"
              class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              @click="mobileMenuOpen = false"
            >
              Categories
            </NuxtLink>
            <!-- Mobile Search -->
            <div class="px-3 py-2">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @keyup.enter="handleSearch"
              >
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-2xl font-bold text-white mb-4">AffiliateHub</h3>
            <p class="text-gray-300 mb-4">
              Discover the best affiliate products and deals. We help you find quality products 
              with honest reviews and competitive prices.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-gray-300 hover:text-white transition-colors">Products</NuxtLink></li>
              <li><NuxtLink to="/categories" class="text-gray-300 hover:text-white transition-colors">Categories</NuxtLink></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Affiliate Disclosure</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700">
          <p class="text-center text-gray-300">
            © {{ new Date().getFullYear() }} AffiliateHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
    mobileMenuOpen.value = false
  }
}
</script>