# Priority Tracker

A productivity application with Linear-inspired design that helps users prioritize and stay on track for their top 3 priorities of the day.

New change

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with Linear-inspired design system
- **better-auth** - Authentication (email/password, Google OAuth, GitHub OAuth)
- **React Router** - Client-side routing

## Features

### Authentication
- ✅ Email/Password sign-in and sign-up
- ✅ Google OAuth authentication
- ✅ GitHub OAuth authentication
- ✅ Session management
- ✅ Protected routes

### UI/UX
- ✅ Linear-inspired minimal design
- ✅ Dark theme with muted colors
- ✅ Smooth animations and transitions
- ✅ Responsive layout
- ✅ Clean typography

### Pages
- **Landing Page** - Marketing content with features and CTAs
- **Sign In Page** - Multiple authentication methods
- **Sign Up Page** - Email registration
- **Home Page** - Authenticated user dashboard with animated cards

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd better-neon-auth-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file for custom configuration:
   ```bash
   cp .env.example .env
   ```
   The default auth server URL is already configured in `src/lib/auth-client.ts`.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, Card, etc.)
│   ├── layout/          # Layout components (Header)
│   └── ProtectedRoute.tsx
├── pages/
│   ├── LandingPage.tsx  # Public landing page
│   ├── SignInPage.tsx   # Authentication page
│   ├── SignUpPage.tsx   # Registration page
│   └── HomePage.tsx     # Protected home page
├── lib/
│   └── auth-client.ts   # Better-auth client configuration
├── App.tsx              # Main app with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind

```

## Authentication Server

This application connects to a separate better-auth server for authentication:
- Server URL: `https://ep-damp-flower-w4j0yrjv-pooler.neonauth.c-2.us-east-2.aws.neon.build/neondb/auth`

The auth client is configured in `src/lib/auth-client.ts` and provides:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Session management
- User profile data

## Design System

The application follows Linear's design principles:

- **Minimal and Clean**: Reduced visual noise, focus on content
- **Purposeful Motion**: Subtle, meaningful animations
- **Typography-first**: Clear hierarchy with Inter font
- **Muted Colors**: Dark grays with purple accent
- **Speed**: Fast, responsive interactions

### Color Palette

- **Background**: gray-950 (#0a0a0a)
- **Surfaces**: gray-900 (#171717)
- **Borders**: gray-800 (#262626)
- **Text**: gray-100 (#f5f5f5) and gray-400 (#a3a3a3)
- **Primary**: purple-600 (#5E6AD2)

## Future Development

The priority tracking features are planned but not yet implemented. The current version focuses on:
- Authentication infrastructure
- Design system
- User interface foundation

## License

MIT
