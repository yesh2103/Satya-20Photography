# 📸 How to Add Content to Your Satya Photography Website

## 🎯 **Method 1: Admin Dashboard (Best for Regular Use)**

### Step 1: Login as Owner
1. Go to your website: `/login` 
2. Use your admin credentials: `Rajkarthikeya10@gmail.com`
3. Click "Admin Login"

### Step 2: Access Admin Dashboard  
1. After login, click your profile avatar (top right)
2. Select "Admin Dashboard"
3. You'll see sections for:
   - **Media Management**: Upload photos/videos
   - **Contact Submissions**: View customer inquiries  
   - **Statistics**: Track website performance

### Step 3: Upload Media
1. Go to "Media Management" section
2. Click "Upload New Media"
3. Select your photos/videos
4. Choose the service type (Wedding, Pre-wedding, etc.)
5. Add title and description
6. Click "Save"

---

## 🎯 **Method 2: Database Direct Insert (Advanced)**

### Add Photos via Supabase Dashboard:
1. Go to your Supabase dashboard
2. Open "Table Editor" 
3. Select "media" table
4. Click "Insert" > "Insert row"
5. Fill in:
   ```
   title: "Your Photo Title"
   type: "photo" (or "video")
   service_type: "wedding" (or other category)
   url: "https://your-image-url.com/photo.jpg"
   uploaded_by: [your-user-id]
   ```

### Add Packages:
1. In Supabase, go to "packages" table
2. Insert new package:
   ```
   title: "Premium Wedding Package"
   description: "Full description here"
   price_range: "₹50,000 - ₹1,00,000"
   service_type: "wedding"
   created_by: [your-user-id]
   ```

---

## 🎯 **Method 3: Quick Demo Content (What I Just Added)**

✅ **I've already added real demo images to your gallery!**

The gallery now shows:
- 🤵‍♀️ Wedding ceremony photos
- 💕 Pre-wedding romantic shoots  
- 👶 Newborn baby moments
- 🎂 Birthday celebrations
- 💍 Engagement ceremonies
- 🏢 Corporate events
- 🎉 Retirement parties

---

## 📁 **Content Organization Tips**

### Photo Categories:
- **Wedding**: Ceremony, reception, rituals
- **Pre-wedding**: Couple shoots, romantic sessions
- **Newborn**: Baby photos, family portraits  
- **Birthdays**: Kids parties, adult celebrations
- **Engagement**: Ring ceremonies, couple photos
- **Events**: Corporate, social gatherings
- **Retirement**: Farewell parties, achievements

### Image Requirements:
- **Format**: JPG, PNG, WebP
- **Size**: Recommended 800-1200px width
- **Quality**: High resolution for professional look
- **Aspect Ratio**: 4:3 or 16:9 work best

---

## 🔧 **For Your Real Photos**

### Option A: Use Admin Dashboard (Recommended)
- Upload through the website interface
- Automatic categorization and optimization
- Easy management and editing

### Option B: Host Images Online
1. Upload photos to:
   - Google Drive (make public)
   - Imgur 
   - Cloudinary
   - Your hosting provider
2. Get the direct image URLs
3. Add to database via Supabase

### Option C: Replace Demo URLs
- Edit the demo images I added
- Replace URLs with your actual photo URLs
- Keep the same structure and format

---

## ✅ **Current Status**

Your website now has:
- ✅ Real demo images in gallery (I just added these)
- ✅ Working admin dashboard for uploading
- ✅ Public access to view content
- ✅ Professional photo categorization
- ✅ Contact form for customer inquiries

**Next Steps**: Login as admin and start uploading your actual photography portfolio!
