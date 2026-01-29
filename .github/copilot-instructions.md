# GitHub Copilot Instructions for VIVID

## Project Overview
This is a boutique fitness studio management application built with React, Vite, and Tailwind CSS. The application provides a comprehensive business management solution including authentication, analytics dashboard, CRM, and marketing tools.

## Architecture & Patterns

### Component Structure
- **Modular Design**: Components are organized by feature (auth, crm, dashboard, marketing, navigation, ui)
- **Reusable UI Components**: Common components in `src/components/ui/`
- **Page Components**: Top-level page components in `src/pages/`
- **Custom Hooks**: Reusable logic in `src/hooks/`

### Styling Guidelines
- **Tailwind CSS**: Primary styling framework with custom color palette
- **Mobile-First**: Responsive design with mobile-first approach
- **Custom Classes**: Utility classes defined in `src/index.css`

## Color Palette
Always use the custom studio color palette:
- `studio-dark`: #041421 (primary dark)
- `studio-blue`: #042630 (secondary dark)
- `studio-teal`: #4c7273 (primary accent)
- `studio-mint`: #86b9b0 (secondary accent)
- `studio-light`: #d0d6d6 (light background)

## Code Style & Standards

### React Components
- Use functional components with hooks
- Implement proper prop validation
- Follow naming conventions (PascalCase for components)
- Use destructuring for props
- Implement error boundaries where appropriate

### State Management
- Use React hooks (useState, useEffect, useContext)
- Implement custom hooks for reusable logic
- Use context for authentication state
- Keep state as local as possible

### Styling
- Use Tailwind CSS classes consistently
- Implement responsive design with Tailwind breakpoints
- Use custom color palette variables
- Follow mobile-first approach
- Ensure accessibility compliance

### File Organization
- Group related components by feature
- Use index.js files for clean imports
- Keep utility functions in separate files
- Organize assets by type

## Features & Functionality

### Authentication
- Demo login system with localStorage persistence
- Protected routes using React Router
- User context for global state management

### Dashboard
- KPI cards with trend indicators
- Interactive charts using Chart.js
- Responsive grid layout
- Real-time data visualization

### CRM
- Member and lead management
- Search and filter functionality
- Card-based layout for easy scanning
- Status indicators and contact information

### Marketing
- Campaign management with budget tracking
- Email and social media analytics
- Tabbed interface for different metrics
- Performance tracking and visualization

### Navigation
- Dual navigation system (desktop header + mobile bottom)
- Responsive hamburger menu
- Route-based active states
- Icon-based navigation with Lucide React

## Development Guidelines

### Adding New Features
1. Create feature branch
2. Follow existing component structure
3. Use TypeScript-style prop definitions in comments
4. Implement responsive design
5. Add proper error handling
6. Test on mobile and desktop

### API Integration
- Use Axios for HTTP requests
- Implement proper error handling
- Use async/await pattern
- Create reusable API service functions

### Performance Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Lazy load components where appropriate
- Optimize images and assets

## Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user workflows
- E2E tests for critical paths

## Deployment
- Build optimization for production
- Environment variable management
- Asset optimization
- Performance monitoring

## Common Patterns

### Component Pattern
```jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const ComponentName = ({ prop1, prop2 }) => {
  const { user } = useAuth()
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    // Side effects
  }, [dependencies])

  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  )
}

export default ComponentName
```

### Page Pattern
```jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PageName = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page content */}
    </div>
  )
}
```

## Best Practices
- Keep components focused and single-purpose
- Use proper semantic HTML
- Implement accessibility features
- Follow React best practices
- Use consistent naming conventions
- Document complex logic
- Implement proper error handling
- Use TypeScript-style comments for prop types
