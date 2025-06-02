# AI Agent (AgentTube)

AgentTube is a modern web application built with Next.js that provides video analysis and thumbnail generation capabilities. The application features user authentication, plan management, and a robust video processing system.

## Features

- 🎥 Video Analysis
- 🖼️ Thumbnail Generation
- 🔐 User Authentication (via Clerk)
- 💳 Plan Management
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates (via Convex)
- 📊 Usage Tracking
- 🎯 Feature Flags

## Features in Detail

### 1. Video Analysis

- Process and analyze video content
- Generate insights and metadata
- Real-time processing status updates

### 2. Thumbnail Generation

- Automatic thumbnail generation from videos
- Custom thumbnail selection
- Multiple thumbnail options

### 3. Plan Management

- Subscription handling
- Usage tracking
- Plan limits and features
- Upgrade/downgrade capabilities

### 4. Authentication

- Secure user authentication via Clerk
- Protected routes
- User profile management

## Tech Stack

- **Framework**: Next.js 15.3 (Canary)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database & Real-time**: Convex
- **Styling**:
  - Tailwind CSS
  - CSS Modules
- **UI Components**:
  - Radix UI
  - Schematic Components
- **APIs Integration**:
  - Google APIs
  - Stripe
- **Feature Management**: Schematic
- **State Management**: Convex React

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-agent.git
cd ai-agent
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (see Environment Variables section below)

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_ISSUE_URL=your_clerk_issue_url

# Convex Database (Required)
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Schematic (Required)
NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY=your_schematic_publishable_key
SCHEMATIC_API_KEY=your_schematic_api_key

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### How to Obtain the Environment Variables

1. **Clerk Authentication**

   - Go to [clerk.dev](https://clerk.dev)
   - Create a new application
   - Get your API keys from the dashboard
   - The Issue URL can be found in your Clerk application settings

2. **Convex Database**

   - Visit [convex.dev](https://convex.dev)
   - Create a new project
   - The Convex URL will be provided in your project settings

3. **Schematic**

   - Sign up at [schematic.com](https://www.schematic.com)
   - Create a new project
   - Obtain both the publishable and API keys from your project settings

4. **Stripe (Optional)**
   - Create an account at [stripe.com](https://stripe.com)
   - Get your API keys from the Stripe Dashboard
   - Required only if you plan to use payment features

## Project Structure

ai-agent/
├── app/ # Next.js app directory
│ ├── manage-plan/ # Plan management pages
│ ├── video/ # Video analysis features
│ └── test/ # Testing routes
├── components/ # Reusable components
│ ├── schematic/ # Schematic-specific components
│ └── ui/ # UI components
├── convex/ # Convex backend setup
│ └── generated/ # Generated Convex types
├── features/ # Feature-specific code
├── lib/ # Utility functions
├── public/ # Static assets
│ └── img/ # Image assets
└── types/ # TypeScript type definitions

## Development

### Scripts

```bash
# Development with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Important Notes

- Never commit your `.env.local` file to version control
- Keep your secret keys private and secure
- The application won't start without the required environment variables
- For development, you can use test keys provided by these services
- For production, make sure to use production keys and secure endpoints

### Development vs Production

For different environments, maintain separate `.env` files:

- `.env.local` - Local development
- `.env.development` - Development environment
- `.env.production` - Production environment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use ESLint for code linting
- Follow the existing code structure
- Write meaningful commit messages
- Add appropriate documentation

## Deployment

The application can be deployed to various platforms:

1. **Vercel** (Recommended)

   - Connect your GitHub repository
   - Configure environment variables
   - Deploy automatically

2. **Other Platforms**
   - Ensure Node.js support
   - Configure environment variables
   - Set up build commands

## Support

For support:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## License

This project is private and proprietary. All rights reserved.

## Acknowledgments

- Next.js team for the framework
- Clerk for authentication
- Convex for backend services
- Schematic for feature management
- All contributors to the project
