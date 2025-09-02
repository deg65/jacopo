# AffiliateHub - Nuxt.js WordPress Affiliate Website

A modern, responsive affiliate marketing website built with Nuxt.js that consumes data from a WordPress API. This project provides a complete frontend solution for displaying affiliate products with search, filtering, and detailed product pages.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **WordPress Integration**: Seamless connection to WordPress REST API
- **Product Management**: Display products, categories, and detailed product pages
- **Search & Filter**: Advanced search functionality with category filtering
- **SEO Optimized**: Built-in SEO features with meta tags and structured data
- **Performance**: Optimized with lazy loading and efficient data fetching
- **Mobile First**: Fully responsive design for all devices
- **State Management**: Pinia store for efficient state management

## 🛠️ Tech Stack

- **Framework**: Nuxt.js 3
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Fonts**: Google Fonts (Inter)
- **Backend**: WordPress REST API

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- A WordPress site with REST API enabled
- WordPress products/posts set up as affiliate products

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd affiliate-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your WordPress API details:
   ```env
   WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
   SITE_URL=http://localhost:3000
   WP_USERNAME=your-username (optional)
   WP_PASSWORD=your-app-password (optional)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind components
├── components/
│   └── ProductCard.vue       # Reusable product card component
├── composables/
│   └── useWordPress.ts       # WordPress API composable
├── layouts/
│   └── default.vue           # Main application layout
├── pages/
│   ├── index.vue             # Homepage
│   ├── products.vue          # Products listing page
│   ├── search.vue            # Search results page
│   ├── categories.vue        # Categories page
│   └── product/
│       └── [slug].vue        # Individual product page
├── plugins/
│   └── wordpress.client.ts   # WordPress API plugin
├── stores/
│   └── wordpress.ts          # Pinia store for WordPress data
├── utils/
│   └── wordpress-api.ts      # WordPress API utility class
├── nuxt.config.ts            # Nuxt configuration
└── package.json              # Project dependencies
```

## 🔌 WordPress Setup

### Required WordPress Configuration

1. **Enable REST API**: Ensure your WordPress REST API is accessible
2. **Product Structure**: Set up your posts/custom post types as affiliate products
3. **Custom Fields**: Add custom fields for affiliate data:
   - `affiliate_url`: The affiliate link URL
   - `commission_rate`: Commission percentage
   - `product_price`: Product price
   - `product_rating`: Product rating (1-5)
   - `brand`: Product brand

### Recommended WordPress Plugins

- **Advanced Custom Fields (ACF)**: For custom product fields
- **Yoast SEO**: For better SEO optimization
- **WP REST API Controller**: For enhanced API control

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize:

- **Colors**: Update the color palette in `tailwind.config.js`
- **Components**: Modify component styles in `assets/css/main.css`
- **Layout**: Customize the layout in `layouts/default.vue`

### API Integration

To modify API endpoints or add new functionality:

1. Update `utils/wordpress-api.ts` for new API methods
2. Extend `composables/useWordPress.ts` for new composables
3. Update `stores/wordpress.ts` for state management

## 📱 Pages Overview

### Homepage (`/`)
- Hero section
- Featured products
- Categories showcase
- Newsletter signup

### Products Page (`/products`)
- All products listing
- Category filtering
- Sorting options
- Pagination

### Product Detail (`/product/[slug]`)
- Detailed product information
- Affiliate links
- Product specifications
- Related products

### Search Page (`/search`)
- Search functionality
- Results filtering
- Pagination

### Categories Page (`/categories`)
- All categories display
- Category statistics
- Featured categories

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 🔧 Configuration

### Nuxt Configuration

Key configuration options in `nuxt.config.ts`:

- **Modules**: Tailwind, Pinia, VueUse, Google Fonts
- **Runtime Config**: API URLs and environment variables
- **SEO**: Default meta tags and site configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WP_API_URL` | WordPress REST API base URL | Yes |
| `SITE_URL` | Your site's URL | Yes |
| `WP_USERNAME` | WordPress username (for private content) | No |
| `WP_PASSWORD` | WordPress application password | No |

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your WordPress site allows cross-origin requests
2. **API Not Found**: Verify your WordPress REST API is enabled and accessible
3. **Build Errors**: Check that all environment variables are set correctly

### Debug Mode

Enable debug mode by setting:
```env
NUXT_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Nuxt.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- WordPress community for the robust CMS platform

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

**Happy coding! 🚀**