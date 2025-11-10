# ConverseAI - AI-Powered Forum Application

<div align="center">

![ConverseAI Logo](public/logo.png)

**An interactive AI-powered forum where users can share ideas, ask questions, and connect with the community seamlessly.**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://ai-forum-client.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Live Demo](https://ai-forum-client.vercel.app/) • [Report Bug](https://github.com/ismailjosim/ai-forum-client/issues) • [Request Feature](https://github.com/ismailjosim/ai-forum-client/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Key Design Decisions](#key-design-decisions)
- [Assumptions & Trade-offs](#assumptions--trade-offs)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 About the Project

ConverseAI is a modern, real-time forum application built with Next.js 16+ that enables users to create discussion threads, engage in conversations, and interact with an AI-powered community. The application features a clean, intuitive interface with real-time updates powered by Socket.io.

### Live Application

🔗 **[https://ai-forum-client.vercel.app/](https://ai-forum-client.vercel.app/)**

---

## ✨ Features

### Core Features

- 🔐 **Authentication System** - Secure custom user registration and login with JWT
- 💬 **Thread Management** - Create, read, update, and delete discussion threads
- 👤 **User Profiles** - Personalized user profiles with activity tracking
- 🔔 **Real-time Notifications** - Socket.io powered live updates
- 🏷️ **Category System** - Organize threads by topics (General, Sports, etc.)
- 👥 **Role-based Access** - User and Admin role management
- 🌐 **Responsive Design** - Mobile-first, works seamlessly on all devices

### UI/UX Features

- 🎨 **Modern Dark Theme** - Eye-friendly interface
- 🎭 **Smooth Animations** - Polished transitions and interactions
- 🔍 **Advanced Search** - Find threads and content quickly

### Technical Features

- ⚡ **Server-Side Rendering** - Fast initial page loads
- 📦 **Optimized Bundle** - Code splitting and lazy loading
- 🔄 **Real-time Updates** - WebSocket connections for live data
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🎯 **SEO Optimized** - Meta tags and structured data

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 16+](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful icon set
- **Fonts:** [Geist Sans & Geist Mono](https://vercel.com/font) - Modern font family

### State Management & Real-time

- **Real-time:** [Socket.io Client](https://socket.io/) - WebSocket communication
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- **HTTP Client:** Native Fetch API with custom wrappers

### Development Tools

- **Package Manager:** npm/yarn/pnpm
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

### Deployment

- **Hosting:** [Vercel](https://vercel.com/) - Optimized for Next.js
- **CI/CD:** Automatic deployments via Vercel

---

## 🏗️ Architecture Overview

### Application Structure

```
┌─────────────────────────────────────────────┐
│           Client Application                │
│         (Next.js 15 App Router)            │
└─────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│  REST API      │      │  WebSocket      │
│  (HTTP)        │      │  (Socket.io)    │
└───────┬────────┘      └────────┬────────┘
        │                        │
        └────────────┬───────────┘
                     │
        ┌────────────▼────────────┐
        │   Backend Server API    │
        │    (Separate Repo)      │
        └─────────────────────────┘
```

### Component Architecture

```
app/
├── (auth)/               # Authentication routes (no sidebar)
│   ├── login/
│   └── register/
├── (main)/               # Main app routes (with sidebar)
│   ├── page.tsx          # Home/Threads page
│   ├── profile/
│   └── threads/
├── contexts/             # React Context providers
│   └── SocketContext.tsx
└── layout.tsx            # Root layout
```

### Data Flow

1. **Authentication Flow:**
   - User submits credentials → API validates → JWT token stored in cookies
   - Protected routes check authentication status via middleware

2. **Real-time Updates:**
   - Socket.io connection established on app load
   - Server pushes notifications and thread updates
   - Client UI updates reactively

3. **State Management:**
   - Server state via HTTP requests
   - Real-time state via Socket.io context
   - Local UI state via React hooks

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ismailjosim/ai-forum-client.git
   cd ai-forum-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Then configure your environment variables (see [Environment Variables](#environment-variables) section)

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Run Tests (if available)

```bash
npm run test
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_SOCKET_URL=your_socket_server_url

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `https://api.example.com` |
| `NEXT_PUBLIC_SOCKET_URL` | WebSocket server URL | `wss://socket.example.com` |

---

## 📁 Project Structure

```
ai-forum-client/
├── public/                    # Static assets
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth layout group
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/           # Main layout group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   └── threads/
│   │   ├── api/              # API routes (if any)
│   │   ├── contexts/         # React contexts
│   │   │   └── SocketContext.tsx
│   │   ├── globals.css
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── modules/          # Feature-specific components
│   │   │   └── AppSidebar.tsx
│   │   ├── shared/           # Shared components
│   │   │   ├── AppSidebarWrapper.tsx
│   │   │   ├── TopMenu.tsx
│   │   │   └── SidebarUserProfile.tsx
│   │   └── ui/               # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── sidebar.tsx
│   │       └── ...
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   ├── services/             # API service layer
│   │   └── auth/
│   │       └── logout.ts
│   └── types/                # TypeScript type definitions
├── .env.local                # Environment variables (not committed)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 🎯 Key Design Decisions

### 1. **Route Groups for Layout Separation**

We use Next.js 15's route groups `(auth)` and `(main)` to maintain different layouts without affecting URLs:

- **Auth routes** - Clean, centered layout for login/register
- **Main routes** - Full layout with sidebar and top navigation

**Rationale:** Provides better UX by showing relevant UI elements based on user state while maintaining clean URLs.

### 2. **Component-based Architecture**

Separated concerns into distinct component categories:

- **modules/** - Feature-specific, business logic components
- **shared/** - Reusable components across features
- **ui/** - Pure presentational components from shadcn/ui

**Rationale:** Improves maintainability, reusability, and testability.

### 3. **Context-based Real-time Communication**

Socket.io wrapped in React Context for global real-time state:

```typescript
<SocketProvider>
  <App />
</SocketProvider>
```

**Rationale:** Provides clean, centralized WebSocket management accessible throughout the app.

### 4. **Server Components by Default**

Leveraging Next.js 15's default server components:

- Faster initial page loads
- Better SEO
- Reduced client-side JavaScript

**Rationale:** Improves performance and user experience, especially on slower networks.

### 5. **Type Safety First**

Full TypeScript implementation with strict mode:

- Interfaces for all data structures
- Type-safe API calls
- Compile-time error checking

**Rationale:** Prevents runtime errors and improves developer experience.

---

## ⚖️ Assumptions & Trade-offs

### Assumptions

1. **Backend API Availability**
   - Assumes a separate backend API is running and accessible
   - API endpoints follow RESTful conventions
   - WebSocket server is available for real-time features

2. **User Behavior**
   - Users have stable internet connections for real-time features
   - Modern browsers with JavaScript enabled
   - Screen sizes ranging from mobile (320px) to desktop (1920px+)

3. **Data Structure**
   - User roles limited to USER and ADMIN
   - Thread categories are predefined
   - Single language support (can be extended)

### Trade-offs

#### 1. **Client-Side vs Server-Side Rendering**

- **Decision:** Hybrid approach using Next.js App Router
- **Trade-off:**
  - ✅ Better SEO and initial load times
  - ❌ More complex state management
  - **Why:** Balanced performance with developer experience

#### 2. **Real-time Updates vs HTTP Polling**

- **Decision:** WebSocket (Socket.io) for real-time features
- **Trade-off:**
  - ✅ Instant updates, better UX
  - ❌ More complex infrastructure, persistent connections
  - **Why:** Real-time experience is critical for forum engagement

#### 3. **Component Library vs Custom Components**

- **Decision:** shadcn/ui for UI components
- **Trade-off:**
  - ✅ Rapid development, consistent design
  - ❌ Some customization limitations
  - **Why:** Faster iteration while maintaining quality

#### 4. **Monorepo vs Separate Repos**

- **Decision:** Separate frontend and backend repositories
- **Trade-off:**
  - ✅ Independent deployment, clear separation
  - ❌ Potential version mismatch, duplicate types
  - **Why:** Allows separate teams and deployment strategies

#### 5. **Cookie-based vs Token-based Auth**

- **Decision:** JWT stored in HTTP-only cookies
- **Trade-off:**
  - ✅ XSS protection, automatic inclusion
  - ❌ CSRF considerations, can't read from JS
  - **Why:** Security over convenience

#### 6. **Global State Management**

- **Decision:** React Context instead of Redux/Zustand
- **Trade-off:**
  - ✅ Simpler, less boilerplate
  - ❌ Potential re-render issues at scale
  - **Why:** Application complexity doesn't justify Redux yet

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👤 Author

**Ismail Josim**

- GitHub: [@ismailjosim](https://github.com/ismailjosim)
- Live Demo: [ai-forum-client.vercel.app](https://ai-forum-client.vercel.app/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment Platform
- [shadcn/ui](https://ui.shadcn.com/) - UI Component Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Socket.io](https://socket.io/) - Real-time Engine
- [Lucide](https://lucide.dev/) - Icon Library

---

<div align="center">

**Made with ❤️ by Ismail Josim**

⭐ Star this repo if you find it helpful!

</div>
