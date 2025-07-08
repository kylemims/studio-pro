#!/usr/bin/env node

/**
 * Quick Data Customization Script
 * This script allows you to easily update the sample data with your own studio information
 * Run with: node scripts/customizeData.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your custom studio data - EDIT THESE VALUES
const STUDIO_CONFIG = {
  // Studio Information
  studioName: "Your Studio Name",
  studioEmail: "admin@yourstudio.com",
  adminName: "Your Name",

  // Custom Members (replace with your real clients)
  members: [
    {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 111-1111",
      membershipType: "Premium",
      joinDate: "2023-01-15",
      status: "Active",
      totalSpent: 2400,
      lastVisit: "2024-01-10",
    },
    {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 222-2222",
      membershipType: "Basic",
      joinDate: "2023-03-20",
      status: "Active",
      totalSpent: 1200,
      lastVisit: "2024-01-08",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "(555) 333-3333",
      membershipType: "Premium",
      joinDate: "2023-05-10",
      status: "Active",
      totalSpent: 1800,
      lastVisit: "2024-01-12",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@email.com",
      phone: "(555) 444-4444",
      membershipType: "Basic",
      joinDate: "2023-07-22",
      status: "Inactive",
      totalSpent: 600,
      lastVisit: "2023-12-15",
    },
    {
      name: "Carol Brown",
      email: "carol.brown@email.com",
      phone: "(555) 555-5555",
      membershipType: "Premium",
      joinDate: "2023-09-05",
      status: "Active",
      totalSpent: 1350,
      lastVisit: "2024-01-14",
    },
  ],

  // Custom Leads (replace with your real prospects)
  leads: [
    {
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "(555) 666-6666",
      source: "Instagram",
      interest: "Yoga Classes",
      status: "New",
    },
    {
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "(555) 777-7777",
      source: "Referral",
      interest: "Personal Training",
      status: "Contacted",
    },
    {
      name: "Frank Miller",
      email: "frank.miller@email.com",
      phone: "(555) 888-8888",
      source: "Website",
      interest: "Group Classes",
      status: "Scheduled",
    },
  ],

  // Custom Classes (replace with your actual class offerings)
  topClasses: [
    {
      name: "Morning Power Yoga",
      instructor: "Your Instructor Name",
      avgAttendance: 16,
      rating: 4.9,
    },
    {
      name: "HIIT Bootcamp",
      instructor: "Another Instructor",
      avgAttendance: 14,
      rating: 4.7,
    },
    {
      name: "Strength & Conditioning",
      instructor: "Fitness Coach",
      avgAttendance: 12,
      rating: 4.8,
    },
    {
      name: "Pilates Flow",
      instructor: "Pilates Expert",
      avgAttendance: 10,
      rating: 4.6,
    },
    {
      name: "Cardio Dance",
      instructor: "Dance Instructor",
      avgAttendance: 18,
      rating: 4.5,
    },
  ],

  // Custom Recent Sales
  recentSales: [
    {
      customerName: "Jane Smith",
      service: "Annual Membership",
      amount: 1200,
      date: "2024-01-15",
    },
    {
      customerName: "John Doe",
      service: "Personal Training Package",
      amount: 500,
      date: "2024-01-14",
    },
    {
      customerName: "Alice Johnson",
      service: "Monthly Membership",
      amount: 89,
      date: "2024-01-13",
    },
    {
      customerName: "Carol Brown",
      service: "Class Package (10 sessions)",
      amount: 200,
      date: "2024-01-12",
    },
    {
      customerName: "New Member",
      service: "Registration Fee",
      amount: 50,
      date: "2024-01-11",
    },
  ],

  // Custom KPIs (adjust these to match your studio)
  kpis: {
    totalMembers: 150, // Your total member count
    activeMembers: 135, // Your active member count
    monthlyRevenue: 28500, // Your monthly revenue
    classesThisMonth: 95, // Classes offered this month
    memberRetentionRate: 89.2, // Your retention rate
    averageClassSize: 11.5, // Your average class size
  },
};

// Generate the updated sample data
const generateSampleData = () => {
  const { members, leads, topClasses, recentSales, kpis } = STUDIO_CONFIG;

  // Add IDs to the data
  const membersWithIds = members.map((member, index) => ({
    id: index + 1,
    ...member,
  }));

  const leadsWithIds = leads.map((lead, index) => ({
    id: index + 1,
    ...lead,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));

  const salesWithIds = recentSales.map((sale, index) => ({
    id: index + 1,
    ...sale,
  }));

  // Sample data structure
  return `// Sample data for the fitness studio dashboard
export const dashboardData = {
  // Key Performance Indicators
  kpis: {
    totalMembers: ${kpis.totalMembers},
    activeMembers: ${kpis.activeMembers},
    monthlyRevenue: ${kpis.monthlyRevenue},
    classesThisMonth: ${kpis.classesThisMonth},
    memberRetentionRate: ${kpis.memberRetentionRate},
    averageClassSize: ${kpis.averageClassSize}
  },

  // Recent sales data
  recentSales: ${JSON.stringify(salesWithIds, null, 4)},

  // Monthly revenue chart data (last 6 months)
  monthlyRevenue: [
    { month: 'Jul', revenue: ${Math.round(kpis.monthlyRevenue * 0.8)} },
    { month: 'Aug', revenue: ${Math.round(kpis.monthlyRevenue * 0.9)} },
    { month: 'Sep', revenue: ${Math.round(kpis.monthlyRevenue * 0.85)} },
    { month: 'Oct', revenue: ${Math.round(kpis.monthlyRevenue * 0.95)} },
    { month: 'Nov', revenue: ${Math.round(kpis.monthlyRevenue * 0.88)} },
    { month: 'Dec', revenue: ${kpis.monthlyRevenue} }
  ],

  // Class attendance data (sample percentages)
  classAttendance: [
    { class: 'Yoga', attendance: 85 },
    { class: 'HIIT', attendance: 92 },
    { class: 'Pilates', attendance: 78 },
    { class: 'Strength', attendance: 89 },
    { class: 'Cardio', attendance: 76 },
    { class: 'Dance', attendance: 94 }
  ],

  // Member demographics (sample distribution)
  memberDemographics: [
    { ageGroup: '18-25', count: ${Math.round(kpis.totalMembers * 0.15)} },
    { ageGroup: '26-35', count: ${Math.round(kpis.totalMembers * 0.35)} },
    { ageGroup: '36-45', count: ${Math.round(kpis.totalMembers * 0.3)} },
    { ageGroup: '46-55', count: ${Math.round(kpis.totalMembers * 0.15)} },
    { ageGroup: '56+', count: ${Math.round(kpis.totalMembers * 0.05)} }
  ],

  // Top performing classes
  topClasses: ${JSON.stringify(topClasses, null, 4)}
};

// CRM sample data
export const crmData = {
  members: ${JSON.stringify(membersWithIds, null, 4)},

  leads: ${JSON.stringify(leadsWithIds, null, 4)}
};

// Marketing sample data
export const marketingData = {
  campaigns: [
    {
      id: 1,
      name: 'New Year Fitness Challenge',
      type: 'Email',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      budget: 1500,
      spent: 850,
      reach: 2800,
      engagement: 12.5,
      conversions: 45
    },
    {
      id: 2,
      name: 'Instagram Fitness Series',
      type: 'Social Media',
      status: 'Active',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      budget: 800,
      spent: 320,
      reach: 1200,
      engagement: 8.3,
      conversions: 18
    },
    {
      id: 3,
      name: 'Holiday Membership Promo',
      type: 'Email',
      status: 'Completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      budget: 2000,
      spent: 1950,
      reach: 3500,
      engagement: 15.2,
      conversions: 78
    }
  ],

  emailMetrics: {
    totalSent: 15420,
    delivered: 14890,
    opened: 7445,
    clicked: 1563,
    unsubscribed: 89,
    openRate: 50.1,
    clickRate: 21.0,
    unsubscribeRate: 0.6
  },

  socialMediaMetrics: {
    followers: {
      instagram: 5420,
      facebook: 3280,
      twitter: 890
    },
    engagement: {
      instagram: 8.7,
      facebook: 5.2,
      twitter: 3.1
    },
    reach: {
      instagram: 12400,
      facebook: 8900,
      twitter: 2100
    }
  }
};`;
};

// Update the authentication hook
const generateAuthData = () => {
  return `import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken')
    if (token) {
      // In a real app, you would validate the token with your backend
      setUser({ 
        id: '1', 
        name: '${STUDIO_CONFIG.adminName}', 
        email: '${STUDIO_CONFIG.studioEmail}',
        role: 'admin'
      })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      if (email === '${STUDIO_CONFIG.studioEmail}' && password === 'password') {
        const userData = { 
          id: '1', 
          name: '${STUDIO_CONFIG.adminName}', 
          email: '${STUDIO_CONFIG.studioEmail}',
          role: 'admin'
        }
        setUser(userData)
        localStorage.setItem('authToken', 'demo-token')
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}`;
};

// Main execution
const main = () => {
  console.log("🚀 Customizing Studio Pro data...");

  try {
    // Update sample data
    const sampleDataPath = path.join(__dirname, "..", "src", "data", "sampleData.js");
    const newSampleData = generateSampleData();
    fs.writeFileSync(sampleDataPath, newSampleData);
    console.log("✅ Updated sample data with your studio information");

    // Update auth hook
    const authHookPath = path.join(__dirname, "..", "src", "hooks", "useAuth.jsx");
    const newAuthData = generateAuthData();
    fs.writeFileSync(authHookPath, newAuthData);
    console.log("✅ Updated authentication with your admin credentials");

    console.log("\\n🎉 Data customization complete!");
    console.log("\\n📧 Login credentials:");
    console.log(`   Email: ${STUDIO_CONFIG.studioEmail}`);
    console.log("   Password: password");
    console.log("\\n💡 To further customize:");
    console.log("   1. Edit the STUDIO_CONFIG object in this script");
    console.log("   2. Run: node scripts/customizeData.js");
    console.log("   3. Restart your development server");
  } catch (error) {
    console.error("❌ Error customizing data:", error);
    process.exit(1);
  }
};

// Run the script
main();
