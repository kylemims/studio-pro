# VIVID - Boutique Fitness Studio Management

A modern, responsive business management application for boutique fitness studios built with React, Vite, and Tailwind CSS.

## Features

- **Authentication System**: Secure login with demo credentials
- **Analytics Dashboard**: Comprehensive KPIs, revenue tracking, and performance metrics
- **CRM Module**: Customer and lead management with detailed profiles
- **Marketing Tools**: Campaign management, email analytics, and social media metrics
- **Mobile-First Design**: Responsive UI with bottom navigation for mobile and hamburger menu
- **Modern UI**: Clean, professional design with custom color palette

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS with custom studio color palette
- **Routing**: React Router DOM
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## Color Palette

- **Studio Dark**: `#041421` - Primary dark color
- **Studio Blue**: `#042630` - Secondary dark color
- **Studio Teal**: `#4c7273` - Primary accent color
- **Studio Mint**: `#86b9b0` - Secondary accent color
- **Studio Light**: `#d0d6d6` - Light background color

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:kylemims/studio-pro.git
cd studio-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Login

Use the following credentials to access the application:
- **Email**: admin@studio.com
- **Password**: password

## 🚀 Daily Usage - Starting the Project

### Normal Startup (95% of the time)
```bash
cd /path/to/your/studio-pro
npm run dev
```

Then open your browser to the URL shown (usually `http://localhost:5173`)

### If You Run Into Issues
If you encounter JSX/file extension errors, simply run:
```bash
npm run fix-extensions
npm run dev
```

### Complete Startup Checklist (if needed)

1. **Navigate to project**:
   ```bash
   cd /path/to/your/studio-pro
   ```

2. **If it's been a while, update dependencies** (optional):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open browser** to the URL shown (usually `http://localhost:5173`)

### Quick Tips

- **Default login**: `admin@yourstudio.com` / `password` (or whatever you customized)
- **Stop server**: `Ctrl+C` in the terminal
- **Change port**: The server will automatically find an available port if 5173 is busy
- **Clear cache**: If you see weird behavior, run `npm run fix-extensions` first

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── crm/            # CRM-related components
│   ├── dashboard/      # Dashboard components
│   ├── marketing/      # Marketing components
│   ├── navigation/     # Navigation components
│   └── ui/             # Reusable UI components
├── data/               # Sample data and mock APIs
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── utils/              # Utility functions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run customize` - Update your studio data
- `npm run fix-extensions` - Fix file extension issues

## Features Overview

### Dashboard
- Real-time KPIs (members, revenue, classes, retention)
- Interactive charts for revenue trends and class attendance
- Member demographics visualization
- Recent sales tracking
- Top performing classes

### CRM
- Member management with detailed profiles
- Lead tracking and status management
- Search and filter functionality
- Contact information and activity history

### Marketing
- Campaign management and tracking
- Email marketing analytics
- Social media metrics
- Budget tracking and performance monitoring

### Navigation
- Desktop: Header navigation with hamburger menu
- Mobile: Bottom navigation bar with icons
- Responsive design for all screen sizes

## Customization

### Colors
Update the color palette in `tailwind.config.js`:
```js
colors: {
  'studio-dark': '#041421',
  'studio-blue': '#042630',
  'studio-teal': '#4c7273',
  'studio-mint': '#86b9b0',
  'studio-light': '#d0d6d6'
}
```

### Components
All components are modular and reusable. Customize them in their respective directories under `src/components/`.

## 🎯 Quick Data Customization

Before running the app, customize it with your studio's data:

```bash
# 1. Edit the customization script with your studio info
code scripts/customizeData.js

# 2. Run the customization script
npm run customize

# 3. Start the development server
npm run dev
```

**What you can customize:**
- Studio name and admin credentials
- Member and lead information
- Revenue and performance metrics
- Class names and instructors
- Marketing campaign data

For detailed instructions, see: `DATA_CUSTOMIZATION_README.md`

## 🚀 Deployment

### GitHub Pages (Free)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Enable GitHub Pages in repository settings

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push
3. Custom domain support available

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📊 Database Integration

For production use with a real database:
- See `DATABASE_INTEGRATION_GUIDE.md` for complete setup
- Includes PostgreSQL, MySQL, and SQLite options
- Full API integration and authentication
- Data migration and seeding scripts

## 🛠️ Troubleshooting

### "Invalid JS syntax" or "JSX" errors

If you see errors like:
```
Failed to parse source for import analysis because the content contains invalid JS syntax. 
If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
```

**Quick Fix:**
```bash
npm run fix-extensions
npm run dev
```

**Why this happens:** Some tools may recreate files with wrong extensions. The project uses:
- `useAuth.jsx` (not `.js`) for JSX content
- `postcss.config.cjs` and `tailwind.config.cjs` (not `.js`) for CommonJS syntax

### Server won't start

1. Kill all Node processes: `pkill -f "vite"`
2. Clear cache: `rm -rf node_modules/.vite`
3. Run: `npm run fix-extensions`
4. Start fresh: `npm run dev`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
