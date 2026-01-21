# Digital Mahadata Prima - Company Profile

A modern, responsive company profile website built with Next.js, Payload CMS, GSAP animations, and professional UI design.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes  
- **Smooth Scrolling**: Implemented with Lenis for buttery-smooth navigation
- **Advanced Animations**: GSAP-powered animations including horizontal scrolling clients/partners
- **Content Management**: Payload CMS for easy portfolio and content management
- **Performance Optimized**: Built with Next.js 15 and TypeScript
- **SEO Friendly**: Optimized for search engines
- **Portfolio System**: Dynamic portfolio with CMS integration and static fallbacks
- **Contact Form**: Functional contact form with email integration
- **Admin Dashboard**: Full CMS admin panel for content management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Payload CMS 3.x (Headless)
- **Database**: MongoDB
- **Animations**: GSAP (GreenSock) + Lenis
- **Email**: Nodemailer for contact form
- **Deployment**: Ready for Vercel/Netlify

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (payload)/      # Payload CMS routes
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── portfolio/      # Portfolio pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   └── payload.config.ts   # Payload CMS config
├── media/                  # Static assets (logos, images)
├── scripts/                # Utility scripts
└── .env.example           # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dmp-company-profile.git
   cd dmp-company-profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URI=mongodb://localhost:27017/dmp-compro
   PAYLOAD_SECRET=your-super-secret-key-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### First Admin User Setup

Create your first admin user by visiting `/admin` and filling out the registration form.

## 📊 Portfolio Management

The portfolio system supports both:
- **CMS-managed portfolios**: Add new portfolios via admin panel
- **Static fallback portfolios**: Predefined portfolios for demo/backup

To import static portfolios to CMS:
```bash
npm run import-portfolio
```

## 🎨 Key Components

- **Hero Section**: Eye-catching landing with animations
- **About Section**: Company information with smooth reveals
- **Services Section**: Service offerings with hover effects  
- **Our Clients**: Horizontal scrolling client logos (left to right)
- **Our Partners**: Horizontal scrolling partner logos (right to left)
- **Portfolio Grid**: Filterable portfolio showcase
- **Contact Form**: Working contact form with validation

## 🔧 Customization

### Adding New Sections
1. Create component in `src/components/`
2. Add to main page in `src/app/page.tsx`
3. Style with Tailwind CSS

### CMS Collections
Edit `src/payload.config.ts` to modify:
- Portfolio fields
- Media configuration  
- Admin interface settings

### Animations
GSAP animations are in individual components. Key animation files:
- `src/components/OurClients.tsx` - Client logos animation
- `src/components/OurPartners.tsx` - Partner logos animation
- `src/app/portfolio/[slug]/page.tsx` - Portfolio detail animations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm start`

### Environment Variables for Production
```env
DATABASE_URI=mongodb+srv://your-atlas-connection
PAYLOAD_SECRET=your-production-secret
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run payload` - Access Payload CLI
- `npm run import-portfolio` - Import static portfolios to CMS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@domain.com]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Payload CMS for the headless CMS solution
- GSAP for powerful animations
- Tailwind CSS for utility-first styling

---

**Digital Mahadata Prima** - Transforming businesses through innovative technology solutions.
- **Animations**: GSAP (GreenSock)
- **Smooth Scrolling**: Lenis
- **Deployment**: Ready for Vercel/Netlify

## 📦 Getting Started

First, install dependencies:

```bash
npm install
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
