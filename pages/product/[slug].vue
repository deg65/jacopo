<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-gray-200 h-96 rounded-lg"></div>
          <div class="space-y-4">
            <div class="bg-gray-200 h-8 rounded w-3/4"></div>
            <div class="bg-gray-200 h-4 rounded"></div>
            <div class="bg-gray-200 h-4 rounded w-5/6"></div>
            <div class="bg-gray-200 h-12 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="text-red-500 mb-4">
        <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
      <p class="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <NuxtLink
        to="/products"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse All Products
      </NuxtLink>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li><NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink></li>
          <li><span class="mx-2">/</span></li>
          <li><NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink></li>
          <li><span class="mx-2">/</span></li>
          <li class="text-gray-900 truncate">{{ product.title.rendered }}</li>
        </ol>
      </nav>

      <!-- Product Details -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              :src="productImage"
              :alt="product.title.rendered"
              class="w-full h-full object-cover"
            >
          </div>
          
          <!-- Image Gallery (if multiple images) -->
          <div v-if="product.acf?.gallery?.length" class="grid grid-cols-4 gap-2">
            <div
              v-for="(image, index) in product.acf.gallery.slice(0, 4)"
              :key="index"
              class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
            >
              <img
                :src="image"
                :alt="`${product.title.rendered} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Title and Rating -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ product.title.rendered }}
            </h1>
            
            <!-- Rating -->
            <div v-if="product.acf?.product_rating" class="flex items-center mb-4">
              <div class="flex items-center">
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    :class="[
                      'h-5 w-5',
                      star <= product.acf.product_rating ? 'text-yellow-400' : 'text-gray-300'
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-600">
                  {{ product.acf.product_rating }}/5
                </span>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div v-if="product.acf?.product_price" class="text-3xl font-bold text-green-600">
            ${{ product.acf.product_price }}
          </div>

          <!-- Commission Info -->
          <div v-if="product.acf?.commission_rate" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span class="text-blue-800 font-medium">
                {{ product.acf.commission_rate }}% Commission Rate
              </span>
            </div>
          </div>

          <!-- Product Excerpt -->
          <div class="prose prose-gray max-w-none">
            <div v-html="cleanExcerpt"></div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-4">
            <a
              v-if="product.acf?.affiliate_link"
              :href="product.acf.affiliate_link"
              target="_blank"
              rel="noopener noreferrer nofollow"
              class="w-full bg-blue-600 text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              @click="trackPurchaseClick"
            >
              Buy Now - ${{ product.acf?.product_price || 'Check Price' }}
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <div class="flex gap-4">
              <button
                @click="shareProduct"
                class="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
              
              <button
                @click="toggleFavorite"
                class="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite
              </button>
            </div>
          </div>

          <!-- Product Meta -->
          <div class="border-t border-gray-200 pt-6">
            <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Published</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(product.date) }}</dd>
              </div>
              <div v-if="product.acf?.brand">
                <dt class="text-sm font-medium text-gray-500">Brand</dt>
                <dd class="text-sm text-gray-900">{{ product.acf.brand }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Product Description -->
      <div class="mt-16">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'description'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Description
            </button>
            <button
              v-if="product.acf?.specifications"
              @click="activeTab = 'specs'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'specs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Specifications
            </button>
          </nav>
        </div>

        <div class="py-8">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="prose prose-gray max-w-none">
            <div v-html="product.content.rendered"></div>
          </div>

          <!-- Specifications Tab -->
          <div v-else-if="activeTab === 'specs' && product.acf?.specifications" class="prose prose-gray max-w-none">
            <div v-html="product.acf.specifications"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { wordpressAPI } from '~/utils/wordpress-api'

const route = useRoute()
const slug = route.params.slug

// Reactive state
const activeTab = ref('description')

// Fetch product data
const { data: product, pending, error } = await useLazyAsyncData(
  `product-${slug}`,
  () => wordpressAPI.getPostBySlug(slug)
)

// SEO
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.title.rendered} - AffiliateHub`,
      meta: [
        {
          name: 'description',
          content: cleanExcerpt.value || `Discover ${product.value.title.rendered} with detailed review and affiliate link.`
        },
        {
          property: 'og:title',
          content: product.value.title.rendered
        },
        {
          property: 'og:description',
          content: cleanExcerpt.value
        },
        {
          property: 'og:image',
          content: productImage.value
        }
      ]
    })
  }
})

// Computed properties
const productImage = computed(() => {
  if (!product.value) return ''
  
  if (product.value.acf?.product_image) {
    return product.value.acf.product_image
  }
  
  return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&crop=center&auto=format&q=80`
})

const cleanExcerpt = computed(() => {
  if (!product.value) return ''
  
  return product.value.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/\[&hellip;\]/g, '...')
    .trim()
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const trackPurchaseClick = () => {
  // Analytics tracking for affiliate link clicks
  console.log(`Purchase link clicked for: ${product.value.title.rendered}`)
}

const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value.title.rendered,
        text: cleanExcerpt.value,
        url: window.location.href
      })
    } catch (err) {
      console.log('Error sharing:', err)
    }
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

const toggleFavorite = () => {
  // Implement favorite functionality
  console.log('Toggle favorite for:', product.value.title.rendered)
}
</script>