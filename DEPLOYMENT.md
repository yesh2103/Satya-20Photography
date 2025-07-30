# Deployment Guide - Satya Photography Website

This guide covers deploying the Satya Photography website to production using Netlify.

## Prerequisites

1. **Supabase Account**: Set up your Supabase project
2. **Email Service**: Configure SMTP for contact form notifications
3. **Netlify Account**: For hosting and deployment

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Note down your Project URL and Anon Key

### 1.2 Apply Database Schema
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the content from `/database/schema.sql`
3. Run the SQL to create all tables, policies, and sample data

### 1.3 Configure Authentication
1. Go to Authentication > Settings
2. Enable Email authentication
3. For Google OAuth:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your OAuth credentials from Google Cloud Console

### 1.4 Set up Storage (Optional)
1. Go to Storage
2. Create a bucket named `media`
3. Set up policies for file uploads

## Step 2: Email Configuration

### 2.1 Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use this app password for SMTP_PASS

### 2.2 Alternative Email Providers
- **Outlook**: Use `smtp-mail.outlook.com:587`
- **Yahoo**: Use `smtp.mail.yahoo.com:587`
- **SendGrid**: Use `smtp.sendgrid.net:587`

## Step 3: Netlify Deployment

### 3.1 Connect Repository
1. Push your code to GitHub/GitLab
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/spa`

### 3.2 Environment Variables
Set these in Netlify Dashboard > Site settings > Environment variables:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
OWNER_EMAIL=owner@satyaphotography.com

# Production
NODE_ENV=production
```

### 3.3 Netlify Functions Setup
1. Ensure `/netlify/functions/api.ts` is properly configured
2. The build process will automatically handle serverless functions

### 3.4 Domain Configuration
1. Add your custom domain in Netlify
2. Configure DNS settings
3. Enable HTTPS (automatic with Netlify)

## Step 4: Testing Deployment

### 4.1 Functional Tests
- [ ] Homepage loads correctly
- [ ] User registration/login works
- [ ] Contact form submits successfully
- [ ] Email notifications are sent
- [ ] Gallery displays properly
- [ ] Admin dashboard accessible (owner only)
- [ ] Packages page requires login

### 4.2 Performance Tests
- [ ] Page load times < 3 seconds
- [ ] Images are optimized
- [ ] Mobile responsiveness
- [ ] SEO meta tags

## Step 5: Post-Deployment Setup

### 5.1 Create Owner Account
1. Register through the website
2. Manually update the user's role in Supabase:
   ```sql
   UPDATE users SET role = 'owner' WHERE email = 'your-email@domain.com';
   ```

### 5.2 Upload Sample Media
1. Log in as owner
2. Use admin dashboard to upload sample photos
3. Organize by categories

### 5.3 Monitor Performance
1. Set up Netlify Analytics
2. Monitor Supabase usage
3. Check email delivery rates

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Yes | `eyJhbGciOiJIUzI1NiIs...` |
| `SMTP_HOST` | Email server host | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | Yes | `587` |
| `SMTP_USER` | Email username | Yes | `your-email@gmail.com` |
| `SMTP_PASS` | Email password/app password | Yes | `your-app-password` |
| `OWNER_EMAIL` | Owner's email for notifications | Yes | `owner@satyaphotography.com` |
| `NODE_ENV` | Environment mode | No | `production` |

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check SMTP credentials
   - Verify app password (for Gmail)
   - Check firewall/security settings

2. **Supabase connection issues**
   - Verify URL and key
   - Check RLS policies
   - Ensure tables exist

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

4. **Authentication not working**
   - Check Supabase auth settings
   - Verify redirect URLs
   - Test OAuth provider setup

### Support Contacts

- **Supabase**: [Support Documentation](https://supabase.com/docs)
- **Netlify**: [Help Center](https://docs.netlify.com/)
- **Technical Issues**: Check server logs and error messages

## Security Considerations

1. **Environment Variables**: Never commit secrets to git
2. **Database Security**: Use RLS policies properly
3. **File Uploads**: Validate file types and sizes
4. **Email Security**: Use app passwords, not regular passwords
5. **HTTPS**: Always use HTTPS in production (automatic with Netlify)

## Performance Optimization

1. **Images**: Optimize images before upload
2. **Caching**: Leverage Netlify's CDN
3. **Database**: Use indexes for query performance
4. **Bundle Size**: Monitor and optimize JavaScript bundle

---

## Quick Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema applied
- [ ] Email service configured and tested
- [ ] Environment variables set in Netlify
- [ ] Repository connected to Netlify
- [ ] Build and deploy successful
- [ ] All functionality tested
- [ ] Owner account created
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

Your Satya Photography website is now ready for production! 🎉
