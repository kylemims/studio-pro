# Database Integration Guide for VIVID

## Overview
This guide provides comprehensive instructions for integrating a real database with your VIVID application, replacing the current sample data with live data from your fitness studio.

## Table of Contents
1. [Database Schema Design](#database-schema-design)
2. [Setting Up Your Database](#setting-up-your-database)
3. [Environment Configuration](#environment-configuration)
4. [API Service Layer](#api-service-layer)
5. [Data Seeding](#data-seeding)
6. [Frontend Integration](#frontend-integration)
7. [Testing & Validation](#testing--validation)

---

## Database Schema Design

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Members Table
```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  join_date DATE NOT NULL,
  membership_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  medical_conditions TEXT,
  last_visit TIMESTAMP,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Leads Table
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  source VARCHAR(100),
  interest VARCHAR(255),
  status VARCHAR(50) DEFAULT 'New',
  notes TEXT,
  assigned_to UUID REFERENCES users(id),
  follow_up_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. Classes Table
```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  instructor_name VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  class_type VARCHAR(100),
  description TEXT,
  price DECIMAL(8,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. Class Sessions Table
```sql
CREATE TABLE class_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id),
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  attendance_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. Memberships Table
```sql
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id),
  membership_type VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  price DECIMAL(8,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Active',
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 7. Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  description TEXT,
  payment_method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Completed',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. Marketing Campaigns Table
```sql
CREATE TABLE marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0.00,
  reach INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0.00,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Setting Up Your Database

### Option 1: PostgreSQL (Recommended)

#### Installation
```bash
# macOS
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb studio_pro_db
```

#### Environment Setup
```bash
# Install dependencies
npm install pg dotenv bcryptjs jsonwebtoken

# Optional: Database migration tool
npm install knex
```

### Option 2: MySQL

#### Installation
```bash
# macOS
brew install mysql

# Start MySQL
brew services start mysql

# Create database
mysql -u root -p -e "CREATE DATABASE studio_pro_db;"
```

#### Environment Setup
```bash
# Install dependencies
npm install mysql2 dotenv bcryptjs jsonwebtoken
```

### Option 3: SQLite (Development Only)

#### Installation
```bash
# Install dependencies
npm install sqlite3 dotenv bcryptjs jsonwebtoken
```

---

## Environment Configuration

### 1. Create Environment File
Create `.env` file in your project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=studio_pro_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_SSL=false

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRATION=24h

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Application Configuration
NODE_ENV=development
PORT=3001
```

### 2. Update .gitignore
```
# Environment variables
.env
.env.local
.env.production

# Database
*.db
*.sqlite
```

---

## API Service Layer

### 1. Database Connection
Create `src/lib/database.js`:

```javascript
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export default pool;
```

### 2. API Services
Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Data Services
Create `src/services/memberService.js`:

```javascript
import api from './api';

export const memberService = {
  // Get all members
  async getMembers(filters = {}) {
    const response = await api.get('/members', { params: filters });
    return response.data;
  },

  // Get member by ID
  async getMember(id) {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  // Create new member
  async createMember(memberData) {
    const response = await api.post('/members', memberData);
    return response.data;
  },

  // Update member
  async updateMember(id, memberData) {
    const response = await api.put(`/members/${id}`, memberData);
    return response.data;
  },

  // Delete member
  async deleteMember(id) {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  },

  // Get member statistics
  async getMemberStats() {
    const response = await api.get('/members/stats');
    return response.data;
  },
};
```

---

## Data Seeding

### 1. Create Seeder Script
Create `scripts/seedDatabase.js`:

```javascript
import pool from '../src/lib/database.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  
  const users = [
    {
      email: 'admin@studio.com',
      password_hash: hashedPassword,
      name: 'Studio Admin',
      role: 'admin',
    },
    {
      email: 'manager@studio.com',
      password_hash: hashedPassword,
      name: 'Studio Manager',
      role: 'manager',
    },
  ];

  for (const user of users) {
    await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
      [user.email, user.password_hash, user.name, user.role]
    );
  }

  console.log('✅ Users seeded');
};

const seedMembers = async () => {
  const members = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      join_date: '2023-06-15',
      membership_type: 'Premium',
      status: 'Active',
      total_spent: 1200.00,
    },
    {
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '(555) 234-5678',
      join_date: '2023-08-22',
      membership_type: 'Basic',
      status: 'Active',
      total_spent: 800.00,
    },
    {
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '(555) 345-6789',
      join_date: '2023-04-10',
      membership_type: 'Premium',
      status: 'Active',
      total_spent: 1500.00,
    },
    // Add more members...
  ];

  for (const member of members) {
    await pool.query(
      'INSERT INTO members (name, email, phone, join_date, membership_type, status, total_spent) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING',
      [member.name, member.email, member.phone, member.join_date, member.membership_type, member.status, member.total_spent]
    );
  }

  console.log('✅ Members seeded');
};

const seedLeads = async () => {
  const leads = [
    {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 678-9012',
      source: 'Instagram',
      interest: 'Yoga Classes',
      status: 'New',
    },
    {
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '(555) 789-0123',
      source: 'Referral',
      interest: 'Personal Training',
      status: 'Contacted',
    },
    // Add more leads...
  ];

  for (const lead of leads) {
    await pool.query(
      'INSERT INTO leads (name, email, phone, source, interest, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [lead.name, lead.email, lead.phone, lead.source, lead.interest, lead.status]
    );
  }

  console.log('✅ Leads seeded');
};

const seedClasses = async () => {
  const classes = [
    {
      name: 'Morning HIIT',
      instructor_name: 'Sarah Connor',
      capacity: 20,
      duration_minutes: 45,
      class_type: 'High Intensity',
      price: 25.00,
    },
    {
      name: 'Evening Yoga',
      instructor_name: 'Zen Master',
      capacity: 15,
      duration_minutes: 60,
      class_type: 'Yoga',
      price: 20.00,
    },
    // Add more classes...
  ];

  for (const classData of classes) {
    await pool.query(
      'INSERT INTO classes (name, instructor_name, capacity, duration_minutes, class_type, price) VALUES ($1, $2, $3, $4, $5, $6)',
      [classData.name, classData.instructor_name, classData.capacity, classData.duration_minutes, classData.class_type, classData.price]
    );
  }

  console.log('✅ Classes seeded');
};

const runSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await seedUsers();
    await seedMembers();
    await seedLeads();
    await seedClasses();
    
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeeders();
```

### 2. Add NPM Scripts
Update `package.json`:

```json
{
  "scripts": {
    "seed": "node scripts/seedDatabase.js",
    "seed:fresh": "node scripts/resetDatabase.js && node scripts/seedDatabase.js"
  }
}
```

### 3. Run Seeding
```bash
# Seed the database
npm run seed

# Fresh seed (reset and seed)
npm run seed:fresh
```

---

## Frontend Integration

### 1. Update Authentication Hook
Modify `src/hooks/useAuth.jsx`:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token with backend
      api.get('/auth/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Update Dashboard with Real Data
Modify `src/pages/Dashboard.jsx`:

```javascript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { memberService } from '../services/memberService';
import { dashboardService } from '../services/dashboardService';
// ... other imports

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  if (!user) return null;
  if (loading) return <div>Loading...</div>;

  // ... rest of component
};
```

---

## Testing & Validation

### 1. Create Test Scripts
Create `scripts/testDatabase.js`:

```javascript
import pool from '../src/lib/database.js';

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

const testQueries = async () => {
  try {
    // Test member count
    const memberCount = await pool.query('SELECT COUNT(*) FROM members');
    console.log('👥 Total members:', memberCount.rows[0].count);

    // Test lead count
    const leadCount = await pool.query('SELECT COUNT(*) FROM leads');
    console.log('🎯 Total leads:', leadCount.rows[0].count);

    // Test recent transactions
    const recentTransactions = await pool.query(
      'SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5'
    );
    console.log('💰 Recent transactions:', recentTransactions.rows.length);

  } catch (error) {
    console.error('❌ Query test failed:', error);
  }
};

const runTests = async () => {
  await testConnection();
  await testQueries();
  process.exit(0);
};

runTests();
```

### 2. Run Tests
```bash
# Test database connection
node scripts/testDatabase.js

# Test API endpoints
npm test
```

---

## Production Deployment

### 1. Environment Variables
Set production environment variables:

```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_NAME=studio_pro_production
DB_USER=your-production-user
DB_PASSWORD=your-secure-password
DB_SSL=true
JWT_SECRET=your-super-secure-jwt-secret
```

### 2. Database Migrations
Create migration system for production updates:

```javascript
// migrations/001_initial_schema.js
export const up = async (knex) => {
  await knex.schema.createTable('members', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    // ... other fields
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('members');
};
```

---

## Customization Examples

### 1. Add Custom Member Fields
```sql
ALTER TABLE members ADD COLUMN preferred_class_time VARCHAR(20);
ALTER TABLE members ADD COLUMN fitness_goals TEXT;
ALTER TABLE members ADD COLUMN referral_source VARCHAR(100);
```

### 2. Create Custom Reports
```javascript
// Custom report service
export const reportService = {
  async getMembershipTrends() {
    const response = await api.get('/reports/membership-trends');
    return response.data;
  },

  async getClassPopularity() {
    const response = await api.get('/reports/class-popularity');
    return response.data;
  },

  async getRevenueBreakdown() {
    const response = await api.get('/reports/revenue-breakdown');
    return response.data;
  },
};
```

### 3. Add Real-Time Features
```javascript
// WebSocket integration for real-time updates
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

socket.on('memberUpdate', (data) => {
  // Update member data in real-time
  setMembers(prevMembers => 
    prevMembers.map(member => 
      member.id === data.id ? { ...member, ...data } : member
    )
  );
});
```

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install pg dotenv bcryptjs jsonwebtoken

# 2. Set up environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Create database schema
node scripts/createSchema.js

# 4. Seed database
npm run seed

# 5. Test connection
node scripts/testDatabase.js

# 6. Start development
npm run dev
```

---

## Support & Resources

- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **React Query**: For advanced data fetching and caching
- **Prisma**: Alternative ORM for type-safe database operations
- **Supabase**: Hosted PostgreSQL with built-in auth and real-time features

This guide provides a complete foundation for integrating a real database with your VIVID application. Customize the schema and seeding data according to your specific business needs.
