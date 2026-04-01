# Taghazout Fair Prices

A professional, mobile-first directory website that provides tourists with fair market prices for services in Taghazout, Morocco, with direct WhatsApp booking integration.

## 🌊 Design Identity

- **Theme**: Coastal, Surf-inspired, Professional, Clean
- **Colors**: 
  - Primary: Ocean Blue (#0077b6)
  - Secondary: Sandy White (#f8f9fa)
  - Action: WhatsApp Green (#25D366)
- **Typography**: Modern Sans-serif (Inter via Tailwind)

## ✨ Features

- **Mobile-First Design**: 100% responsive, perfect on iPhone/Android
- **Fair Price Transparency**: Verified pricing for all services
- **Direct WhatsApp Booking**: Pre-filled messages for instant booking
- **SEO Optimized**: Meta titles and descriptions for each page
- **Trusted Providers**: Verified badges for reliable services
- **Clean Navigation**: Sticky navbar with smooth routing

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build**: Single-file deployment ready

## 📁 File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Sticky responsive navigation
│   ├── Hero.tsx        # Landing page hero section
│   ├── ServiceCard.tsx # Reusable service listing card
│   └── WhatsAppLogo.tsx # WhatsApp brand icon
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with categories
│   ├── TaxiPage.tsx    # Taxi services listings
│   ├── SurfPage.tsx    # Surf lessons & rentals
│   └── TripsPage.tsx   # Day trips & excursions
├── lib/                # Data and utilities
│   └── data.ts         # Mock data (easily swappable with Supabase)
└── App.tsx             # Main app with routing
```

## 🎯 Core Functionality

### Service Card Component
The reusable `ServiceCard` component includes:
- Provider name and service details
- Dual pricing (EUR/MAD)
- Trusted badge (conditional)
- WhatsApp booking button with pre-filled message

### WhatsApp Integration
```typescript
// Pre-filled message format
"Hello [Provider], I found you on Taghazout Fair Prices and I'd like to book: [Service Name]. Can you confirm availability?"
```

### Data Structure
All data is centralized in `src/lib/data.ts` for easy swapping with a backend:

- `taxiServices`: Airport transfers, local trips
- `surfServices`: Lessons (1h, 2h) and rentals
- `trips`: Day excursions (Paradise Valley, Imsouane, etc.)

## 📱 Pages

### Home Page (`/`)
- Stunning hero section with beach-inspired gradient
- Three large category cards (Taxi, Surf, Trips)
- "Why Us?" section with three feature icons
- Call-to-action buttons

### Taxi Page (`/taxi`)
- Table-like layout on desktop, card-stack on mobile
- Airport transfers and local trips sections
- Price guide and taxi tips
- SEO optimized for "Taxi prices Taghazout"

### Surf Page (`/surf`)
- Lessons vs Rentals focus
- Clear pricing for different durations
- Best surf spots guide
- SEO optimized for "Surf prices Taghazout"

### Trips Page (`/trips`)
- Visual cards for each excursion
- Duration, location, and pricing
- Trip planning tips
- SEO optimized for "Taghazout day trips"

## 🎨 UI/UX Highlights

- **Sticky Navbar**: Responsive, collapses on mobile
- **Smooth Animations**: Hover effects, transitions, scroll-to-top
- **Mobile-First Grid**: Responsive cards and layouts
- **Trust Signals**: Verified badges, SSL indicators
- **Clear CTAs**: WhatsApp green buttons throughout

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔄 Swapping with Supabase

The data structure is ready for backend integration:

1. Replace mock data in `src/lib/data.ts` with API calls
2. Update TypeScript interfaces as needed
3. Add loading states and error handling
4. Implement real phone numbers from database

Example:
```typescript
// Current
export const taxiServices: ServiceProvider[] = [...]

// Future
export const fetchTaxiServices = async (): Promise<ServiceProvider[]> => {
  const { data } = await supabase.from('services').select('*')
  return data
}
```

## 🚀 Deployment

The project builds to a single `index.html` file:

```bash
npm run build
```

Output: `dist/index.html` (includes all CSS and JS)

Deploy to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- Apache/Nginx

## 📱 Mobile Optimization

- **Touch-First**: Large tap targets (44px+)
- **Responsive Images**: SVG icons scale perfectly
- **Fast Loading**: Single file, minimal requests
- **Smooth Scrolling**: Native behavior enhanced
- **Sticky Elements**: Navbar stays accessible

## 🔍 SEO Features

- Unique meta titles per page
- Meta descriptions for each service category
- Semantic HTML structure
- Fast loading times
- Mobile-friendly design

## 🤝 Contributing

1. Update data in `src/lib/data.ts` for price changes
2. Add new services following existing patterns
3. Test on mobile devices
4. Ensure WhatsApp links work correctly

## 📞 Contact

For price updates or provider verification:
- Email: info@taghazoutfairprices.com
- WhatsApp: +212 600 000000

---

**Taghazout Fair Prices** - Making tourism fair, transparent, and accessible for everyone. 🌊