import { WordPressAPI } from '~/utils/wordpress-api'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const wpAPI = new WordPressAPI(config.public.wpApiUrl)
  
  return {
    provide: {
      wpAPI
    }
  }
})