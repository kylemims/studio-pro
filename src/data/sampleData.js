// Sample data for the fitness studio dashboard
export const dashboardData = {
  // Key Performance Indicators
  kpis: {
    totalMembers: 150,
    activeMembers: 135,
    monthlyRevenue: 28500,
    classesThisMonth: 95,
    memberRetentionRate: 89.2,
    averageClassSize: 11.5,
  },

  // Recent sales data
  recentSales: [
    {
      id: 1,
      customerName: "Jane Smith",
      service: "Annual Membership",
      amount: 1200,
      date: "2025-01-15",
    },
    {
      id: 2,
      customerName: "John Doe",
      service: "Personal Training Package",
      amount: 500,
      date: "2025-01-14",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      service: "Monthly Membership",
      amount: 89,
      date: "2025-01-13",
    },
    {
      id: 4,
      customerName: "Carol Brown",
      service: "Class Package (10 sessions)",
      amount: 200,
      date: "2025-01-12",
    },
    {
      id: 5,
      customerName: "New Member",
      service: "Registration Fee",
      amount: 50,
      date: "2025-01-11",
    },
  ],

  // Monthly revenue chart data (last 6 months)
  monthlyRevenue: [
    { month: "Jul", revenue: 22800 },
    { month: "Aug", revenue: 25650 },
    { month: "Sep", revenue: 24225 },
    { month: "Oct", revenue: 27075 },
    { month: "Nov", revenue: 25080 },
    { month: "Dec", revenue: 28500 },
  ],

  // Class attendance data (sample percentages)
  classAttendance: [
    { class: "Mon", attendance: 85 },
    { class: "Tue", attendance: 92 },
    { class: "Wed", attendance: 78 },
    { class: "Thu", attendance: 89 },
    { class: "Fri", attendance: 76 },
    { class: "Sat", attendance: 94 },
    { class: "Sun", attendance: 89 },
  ],

  // Member demographics (sample distribution)
  memberDemographics: [
    { ageGroup: "18-25", count: 23 },
    { ageGroup: "26-35", count: 53 },
    { ageGroup: "36-45", count: 45 },
    { ageGroup: "46-55", count: 23 },
    { ageGroup: "56+", count: 8 },
  ],

  // Top performing classes
  topClasses: [
    {
      name: "Power Flow Yoga",
      instructor: "Janelle Smith",
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
};

// CRM sample data
export const crmData = {
  members: [
    {
      id: 1,
      name: "Dillary Huff",
      email: "dillary.huff@email.com",
      phone: "(555) 111-1111",
      membershipType: "Premium",
      joinDate: "2023-01-15",
      status: "Active",
      totalSpent: 2400,
      lastVisit: "2025-01-10",
    },
    {
      id: 2,
      name: "Sydney Sweenly",
      email: "sydney.sweenly@email.com",
      phone: "(555) 222-2222",
      membershipType: "Basic",
      joinDate: "2023-03-20",
      status: "Active",
      totalSpent: 1200,
      lastVisit: "2025-01-08",
    },
    {
      id: 3,
      name: "Daryl Crow",
      email: "daryl.crow@email.com",
      phone: "(555) 333-3333",
      membershipType: "Premium",
      joinDate: "2023-05-10",
      status: "Active",
      totalSpent: 1800,
      lastVisit: "2025-01-12",
    },
    {
      id: 4,
      name: "Lonny Walberg",
      email: "lonny.walberg@email.com",
      phone: "(555) 444-4444",
      membershipType: "Basic",
      joinDate: "2023-07-22",
      status: "Inactive",
      totalSpent: 600,
      lastVisit: "2025-12-15",
    },
    {
      id: 5,
      name: "Cariah Marey",
      email: "cariah.marey@email.com",
      phone: "(555) 555-5555",
      membershipType: "Premium",
      joinDate: "2023-09-05",
      status: "Active",
      totalSpent: 1350,
      lastVisit: "2025-01-14",
    },
    {
      id: 5,
      name: "Sarah Connor",
      email: "sarah.connor  @email.com",
      phone: "(555) 555-5555",
      membershipType: "Premium",
      joinDate: "2023-09-05",
      status: "Active",
      totalSpent: 1350,
      lastVisit: "2025-01-14",
    },
  ],

  leads: [
    {
      id: 1,
      name: "Manelle Jonae",
      email: "manelle.jonae@email.com",
      phone: "(555) 666-6666",
      source: "Instagram",
      interest: "Yoga Classes",
      status: "New",
      createdAt: "2025-07-01",
    },
    {
      id: 2,
      name: "Judie Foster",
      email: "judie.foster@email.com",
      phone: "(555) 777-7777",
      source: "Referral",
      interest: "Personal Training",
      status: "Contacted",
      createdAt: "2025-06-09",
    },
    {
      id: 3,
      name: "Tyler Swift",
      email: "tyler.swift@email.com",
      phone: "(555) 888-8888",
      source: "Website",
      interest: "Group Classes",
      status: "Scheduled",
      createdAt: "2025-07-02",
    },
  ],
};

// Marketing sample data
export const marketingData = {
  campaigns: [
    {
      id: 1,
      name: "New Year Fitness Challenge",
      type: "Email",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      budget: 1500,
      spent: 850,
      reach: 2800,
      engagement: 12.5,
      conversions: 45,
    },
    {
      id: 2,
      name: "Instagram Fitness Series",
      type: "Social Media",
      status: "Active",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      budget: 800,
      spent: 320,
      reach: 1200,
      engagement: 8.3,
      conversions: 18,
    },
    {
      id: 3,
      name: "Holiday Membership Promo",
      type: "Email",
      status: "Completed",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      budget: 2000,
      spent: 1950,
      reach: 3500,
      engagement: 15.2,
      conversions: 78,
    },
  ],

  emailMetrics: {
    totalSent: 15420,
    delivered: 14890,
    opened: 7445,
    clicked: 1563,
    unsubscribed: 89,
    openRate: 50.1,
    clickRate: 21.0,
    unsubscribeRate: 0.6,
  },

  socialMediaMetrics: {
    followers: {
      instagram: 5420,
      facebook: 3280,
      twitter: 890,
    },
    engagement: {
      instagram: 8.7,
      facebook: 5.2,
      twitter: 3.1,
    },
    reach: {
      instagram: 12400,
      facebook: 8900,
      twitter: 2100,
    },
  },
};
