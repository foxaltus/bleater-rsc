# Bleater (RSC)

A Twitter-like microblogging application where users can scream angry messages, like posts, and argue with other users. Built with Next.js, React Server Components, TypeScript, and Supabase.

![Bleater Logo](/public/logo.png)

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#architecture"><strong>Architecture</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack with React Server Components
- User authentication (sign up, sign in, sign out) using Supabase Auth with cookies
- Create and view posts
- Like/unlike posts
- Optimistic UI updates for a smooth user experience
- User profiles
- Responsive design
- Server-side rendering and React Server Components for improved performance

## Architecture

### Frontend

- **Next.js** with React Server Components
- **TypeScript** for type safety
- **CSS modules** for component styling

### Backend

- **Supabase** for backend services:
  - Authentication & User Management with cookie-based auth
  - PostgreSQL Database
  - Row-level Security Policies

### Database Schema

- **post**: Stores user posts with message content and creation timestamp
- **profiles**: Contains user profile information
- **likes**: Junction table to track post likes by users

## Deployment

You can deploy the application to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm (preferred) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bleater-rsc.git
   cd bleater-rsc
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xwpazbmcghdjsygjluqs.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cGF6Ym1jZ2hkanN5Z2psdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Mzg1OTcsImV4cCI6MjA2NjQxNDU5N30.5BYCp5TB4haOzin3bwJXS6xzx3WzqR-t1qrqtvWrRM8
   ```

   Both values can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

### Running the App

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
pnpm build
```

The build output will be in the `.next` directory.

## Development Tips

- To run Supabase locally for development, check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development)
- This project uses Next.js App Router for server-side rendering and React Server Components
- Authentication is handled using Supabase Auth with cookies, making the user's session available throughout the entire app

## License

MIT
