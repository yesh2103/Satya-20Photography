# Satya Photography Website

A premium, elegant photography website built with modern web technologies. Features a luxury black and gold design theme with comprehensive functionality for photographers to showcase their work and manage client inquiries.

## 🌟 Features

### Client-Facing Features
- **Luxury Design**: Black and gold theme with elegant typography
- **Hero Section**: Auto-sliding background showcase with stunning imagery
- **Gallery**: Filterable photo/video gallery by service categories
- **Service Categories**: Wedding, Pre-wedding, Newborn, Events, etc.
- **Authentication**: Google OAuth and email/password registration
- **Contact Form**: Comprehensive inquiry form with email notifications
- **Package Pricing**: Login-protected package information
- **Responsive Design**: Mobile-first, optimized for all devices

### Admin Features (Owner Access)
- **Media Management**: Upload, organize, and manage photos/videos
- **Dashboard Analytics**: View stats, recent uploads, and inquiries
- **Client Inquiries**: Manage and respond to contact form submissions
- **Role-Based Access**: Secure admin-only areas
- **Real-time Updates**: Instant visibility of new uploads

### Technical Features
- **Full-Stack TypeScript**: End-to-end type safety
- **Supabase Integration**: Authentication, database, and file storage
- **Email Notifications**: SMTP integration for contact forms
- **Real-time Database**: Live updates with Supabase
- **SEO Optimized**: Meta tags and performance optimization
- **Production Ready**: Deployment-ready configuration

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Email**: Nodemailer with SMTP
- **Deployment**: Netlify
- **Styling**: TailwindCSS + Radix UI components

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Email service (Gmail recommended)
- Netlify account (for deployment)

## 🛠️ Local Development

### 1. Clone and Install
```bash
git clone <repository-url>
cd satya-photography
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=owner@satyaphotography.com
```

### 3. Database Setup
1. Create a Supabase project
2. Run the SQL from `/database/schema.sql` in Supabase SQL Editor
3. Configure authentication providers in Supabase Dashboard

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080)

## 📚 Project Structure

```
satya-photography/
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── lib/               # Utilities and configurations
│   ├── pages/             # Route components
│   └── App.tsx            # Main app component
├── server/                # Express backend
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic services
│   └── index.ts           # Server setup
├── shared/                # Shared types and utilities
├── database/              # Database schema and migrations
├── netlify/               # Netlify serverless functions
└── public/                # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary Black**: Deep black backgrounds (`hsl(0, 0%, 8%)`)
- **Gold Accent**: Luxury gold highlights (`hsl(45, 100%, 60%)`)
- **Card Backgrounds**: Dark grey cards (`hsl(0, 0%, 12%)`)
- **Text Colors**: Light gold text on dark backgrounds

### Typography
- **Headers**: Serif fonts for elegance
- **Body Text**: Modern sans-serif for readability
- **Hierarchy**: Clear typographic scale with proper contrast

### Components
- Built with Radix UI primitives
- Consistent spacing and border radius
- Hover effects and smooth transitions
- Mobile-responsive layouts

## 🔐 Authentication & Permissions

### User Roles
- **Guest**: Can view public gallery only
- **User**: Access to packages, contact form, and full gallery
- **Owner**: Full admin access to dashboard and media management

### Protected Routes
- `/contact` - Requires user authentication
- `/packages` - Requires user authentication  
- `/admin` - Requires owner role

## 📧 Email Integration

The contact form automatically sends:
1. **Owner Notification**: Detailed inquiry information
2. **User Confirmation**: Professional thank you email

Supports multiple SMTP providers:
- Gmail (recommended)
- Outlook/Hotmail
- Yahoo
- SendGrid
- Custom SMTP servers

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables
4. Deploy!

Build command: `npm run build`  
Publish directory: `dist/spa`

## 📊 Database Schema

### Tables
- **users**: User accounts and profiles
- **media**: Photos and videos with categorization
- **contact_form_submissions**: Client inquiries
- **packages**: Service packages and pricing

### Security
- Row Level Security (RLS) enabled
- Role-based access policies
- Secure file storage with Supabase

## 🎯 Usage Guide

### For Photographers (Owners)
1. Register an account and get it upgraded to owner role
2. Access admin dashboard at `/admin`
3. Upload photos/videos in organized categories
4. Manage client inquiries and respond to contacts
5. Monitor portfolio performance and engagement

### For Clients
1. Browse public gallery without registration
2. Register for access to packages and contact form
3. Submit inquiries with detailed event information
4. Receive automatic email confirmations

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run typecheck    # TypeScript validation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 🆘 Support

For technical support or questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for setup issues
- Review Supabase documentation for database questions
- Check Netlify docs for deployment problems

## 🎉 Acknowledgments

- **Design Inspiration**: Luxury photography websites
- **UI Components**: Radix UI component library
- **Icons**: Lucide React icon set
- **Typography**: Modern serif and sans-serif font pairings

---

**Built with ❤️ for photographers who value elegance and functionality.**
