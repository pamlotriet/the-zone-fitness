# The Zone Health and Fitness Website

A modern, responsive website for The Zone Health and Fitness built with Angular 19+ featuring Server-Side Rendering (SSR) and optimized for SEO.

## Features

- **Angular 19+ with SSR** - Fast loading and SEO optimized
- **TailwindCSS 3** - Modern utility-first CSS framework
- **Responsive Design** - Mobile-first approach with full-width navigation
- **Multi-Service Focus** - CrossFit, Hyrox training, and nutrition coaching
- **Zone Nutrition Preview** - Exciting upcoming supplement line
- **Professional Branding** - Black and green color scheme matching the gym's brand

## Sections

1. **Hero Section** - Engaging welcome highlighting CrossFit, Hyrox, and nutrition
2. **About** - Mission, values, and gym statistics focused on comprehensive health & fitness
3. **Coaches** - Meet the expert coaching team
4. **Class Schedule** - CrossFit classes, Hyrox training, and nutrition coaching sessions
5. **Contact** - Location, hours, and contact form
6. **Zone Nutrition** - Preview of upcoming supplement line
7. **Footer** - Quick links and additional information

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zone-fitness
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm start
```
Navigate to `http://localhost:4200`. The application will automatically reload if you change any source files.

### Production Build

Build the project with SSR:
```bash
npm run build
```

### Serve SSR Production Build

After building, serve the SSR application:
```bash
npm run serve:ssr:zone-fitness
```
Navigate to `http://localhost:4000` to see the server-side rendered application.

## Docker Deployment

### Build Docker Image

```bash
docker build -t green-zone-crossfit .
```

### Run with Docker

```bash
docker run -p 4000:4000 green-zone-crossfit
```

### Use Docker Compose

```bash
docker-compose up -d
```

This will start the application on `http://localhost:4000`.

## SEO Optimizations

The application includes:

- **Meta Tags** - Comprehensive meta descriptions and keywords
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Structured Data** - Schema.org markup for local business
- **Server-Side Rendering** - Fast initial page loads and better SEO

## Color Scheme

- **Primary Green**: Various shades of green (`zone-green-*`)
- **Background Black**: Deep black (`zone-black`)
- **Accent Colors**: Complementary grays and whites

## Project Structure

```
src/
├── app/
│   ├── app.ts              # Main app component
│   ├── app.html            # Main template with all sections
│   └── app.scss            # Component styles (minimal - using Tailwind)
├── styles.scss             # Global styles and Tailwind imports
└── index.html              # HTML with SEO meta tags and structured data
```

## Customization

### Updating Content

- **Gym Information**: Update contact details in `src/app/app.html` and `src/index.html`
- **Class Schedules**: Modify the schedule section in `src/app/app.html`
- **Coaches**: Update coach information in the coaches section
- **Colors**: Adjust the color scheme in `tailwind.config.js`

### Adding Images

Place images in `src/assets/images/` and reference them in the HTML templates.

## Technologies Used

- **Angular 19+** - Frontend framework with SSR
- **TailwindCSS 3** - Utility-first CSS framework  
- **TypeScript** - Type-safe JavaScript
- **PostCSS** - CSS processing
- **Express** - Node.js server for SSR
- **Docker** - Containerization for deployment

## Performance

- **SSR** - Server-side rendering for fast initial loads
- **Optimized Bundles** - Tree-shaking and code splitting
- **Responsive Images** - Optimized for different screen sizes
- **Modern CSS** - Efficient Tailwind utility classes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for The Zone Health and Fitness.

---

Built with ❤️ for The Zone Health and Fitness community