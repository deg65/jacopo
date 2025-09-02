<template>
  <div class="card card-hover group">
    <!-- Product Image -->
    <div class="relative overflow-hidden">
      <img
        :src="productImage"
        :alt="product.title.rendered"
        class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      >
      <!-- Rating Badge -->
      <div v-if="product.acf?.product_rating" class="absolute top-4 left-4">
        <div class="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ product.acf.product_rating }}
        </div>
      </div>
      <!-- Price Badge -->
      <div v-if="product.acf?.product_price" class="absolute top-4 right-4">
        <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          ${{ product.acf.product_price }}
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div class="p-6">
      <!-- Product Title -->
      <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ product.title.rendered }}
      </h3>

      <!-- Product Excerpt -->
      <div 
        class="text-gray-600 mb-4 line-clamp-3"
        v-html="cleanExcerpt"
      ></div>

      <!-- Product Meta -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center text-sm text-gray-500">
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formatDate(product.date) }}
        </div>
        <div v-if="product.acf?.commission_rate" class="text-sm text-green-600 font-medium">
          {{ product.acf.commission_rate }}% commission
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <NuxtLink
          :to="`/product/${product.slug}`"
          class="flex-1 bg-gray-100 text-gray-800 text-center py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          View Details
        </NuxtLink>
        <a
          v-if="product.acf?.affiliate_link"
          :href="product.acf.affiliate_link"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          @click="trackClick"
        >
          Buy Now
          <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Computed properties
const productImage = computed(() => {
  // Use ACF product image if available, otherwise use a placeholder
  if (props.product.acf?.product_image) {
    return props.product.acf.product_image
  }
  // Fallback to a placeholder image
  return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80`
})

const cleanExcerpt = computed(() => {
  // Remove HTML tags and clean up the excerpt
  return props.product.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/\[&hellip;\]/g, '...')
    .trim()
})

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Track affiliate link clicks
const trackClick = () => {
  // Here you could add analytics tracking
  console.log(`Affiliate link clicked for product: ${props.product.title.rendered}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>