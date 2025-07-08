# 📊 Studio Pro Data Customization

## Quick Start - Update Your Data

### Option 1: Quick Customization (5 minutes)

1. **Edit the customization script**:
   ```bash
   # Open the script in your code editor
   code scripts/customizeData.js
   ```

2. **Update the STUDIO_CONFIG object** (lines 13-150) with your information:
   ```javascript
   const STUDIO_CONFIG = {
     studioName: 'Your Studio Name',           // Replace with your studio name
     studioEmail: 'admin@yourstudio.com',      // Your login email
     adminName: 'Your Name',                   // Your name
     
     members: [
       // Replace with your real clients
       {
         name: 'Jane Smith',
         email: 'jane.smith@email.com',
         // ... customize all fields
       }
     ],
     
     kpis: {
       totalMembers: 150,        // Your actual member count
       monthlyRevenue: 28500,    // Your actual revenue
       // ... update all KPIs
     }
   };
   ```

3. **Run the customization**:
   ```bash
   node scripts/customizeData.js
   ```

4. **Restart your development server**:
   ```bash
   # Stop current server (Ctrl+C) then:
   npm run dev
   ```

5. **Login with your new credentials**:
   - Email: `admin@yourstudio.com` (or whatever you set)
   - Password: `password`

### Option 2: Manual Data Updates

Edit these files directly:

1. **`src/data/sampleData.js`** - All dashboard, CRM, and marketing data
2. **`src/hooks/useAuth.jsx`** - Login credentials and user info

### Option 3: Full Database Integration

For production use with real database:

1. **Read the comprehensive guide**:
   ```bash
   open DATABASE_INTEGRATION_GUIDE.md
   ```

2. **Follow the complete database setup** including:
   - PostgreSQL/MySQL setup
   - API service layer
   - Real authentication
   - Data migration scripts

## 🎯 What You Can Customize

### Member Data
- Names, emails, phone numbers
- Membership types (Basic, Premium, VIP, etc.)
- Join dates and status
- Total spending amounts

### Business Metrics
- Total member count
- Monthly revenue figures
- Retention rates
- Average class sizes

### Class Information
- Class names and instructors
- Attendance rates
- Ratings and popularity

### Marketing Data
- Campaign names and budgets
- Email metrics
- Social media followers

### Studio Branding
- Studio name throughout the app
- Admin login credentials
- Contact information

## 🔧 Advanced Customization

### Adding New Member Fields
Edit `src/data/sampleData.js` and add fields like:
```javascript
{
  name: 'John Doe',
  email: 'john@example.com',
  // Add custom fields:
  fitnessGoals: 'Weight loss',
  emergencyContact: 'Jane Doe - (555) 123-4567',
  medicalConditions: 'None',
  preferredClassTime: 'Morning'
}
```

### Custom Membership Types
Update membership types throughout the data:
```javascript
membershipType: 'Unlimited',  // Instead of 'Premium'
membershipType: 'Class Pass', // Instead of 'Basic'
membershipType: 'Student',    // New type
```

### Regional Customization
Update phone number formats, date formats, currency:
```javascript
phone: '+44 20 7946 0958',    // UK format
amount: '£299',               // British pounds
date: '15/01/2024',          // DD/MM/YYYY format
```

## 🚀 Production Deployment

For live production use:

1. **Set up a real database** (PostgreSQL recommended)
2. **Implement proper authentication** (JWT tokens, password hashing)
3. **Add data validation** and error handling
4. **Set up backup systems** for your data
5. **Implement user roles** (admin, manager, staff)

See `DATABASE_INTEGRATION_GUIDE.md` for complete instructions.

## 📞 Need Help?

- **Quick fixes**: Edit `scripts/customizeData.js` and run it
- **Database setup**: Follow `DATABASE_INTEGRATION_GUIDE.md`
- **Custom features**: Modify the React components in `src/`

## 🐛 Troubleshooting

### "Invalid JS syntax" or "JSX" errors

If you see errors like:
```
Failed to parse source for import analysis because the content contains invalid JS syntax. 
If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
```

**Quick Fix:**
```bash
npm run fix-extensions
```

**Or manually:**
1. Delete `src/hooks/useAuth.js` (if it exists)
2. Delete `postcss.config.js` and `tailwind.config.js` (if they exist)
3. Clear cache: `rm -rf node_modules/.vite`
4. Restart dev server: `npm run dev`

**Why this happens:** Some tools may recreate files with wrong extensions. The project uses:
- `useAuth.jsx` (not `.js`) for JSX content
- `postcss.config.cjs` and `tailwind.config.cjs` (not `.js`) for CommonJS syntax

### Server won't start

1. Kill all Node processes: `pkill -f "vite"`
2. Clear cache: `rm -rf node_modules/.vite`
3. Run: `npm run fix-extensions`
4. Start fresh: `npm run dev`

## 🔐 Default Login

After customization, login with:
- **Email**: Whatever you set in `STUDIO_CONFIG.studioEmail`
- **Password**: `password` (change this in production!)

---

💡 **Tip**: Start with the quick customization script, then move to a full database when you're ready for production!
