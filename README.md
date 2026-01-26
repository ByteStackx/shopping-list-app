# Shopping List App

Organize your shopping efficiently with this full-featured shopping list application. Users can register, log in, create multiple shopping lists, organize items by categories, and manage their shopping experience through a modern, responsive interface.

Built with React, TypeScript, Redux Toolkit, and Vite. Features user authentication, shopping list management with categories, and a responsive UI.

## Features

- **User Authentication**: Registration and login with encrypted passwords
- **Shopping List Management**: Create, edit, and delete shopping lists
- **Category Filtering**: Filter items by category
- **User Profiles**: View and manage user profile information
- **Protected Routes**: Authentication-based route protection
- **Responsive Design**: Mobile-friendly UI with CSS modules
- **State Management**: Redux Toolkit for centralized state management

## Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit, React-Redux
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Routing**: React Router v7
- **Authentication**: Crypto-JS for password encryption
- **Database**: JSON Server (development)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the JSON Server (in one terminal):
```bash
npx json-server src/db/db.json --port 4000
```

2. Start the development server (in another terminal):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with Vite
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/           # Page components for different routes
├── styles/          # CSS modules for page styling
├── types/           # TypeScript type definitions
├── db/              # JSON database file
├── authSlice.ts     # Redux auth state management
├── shoppingListSlice.ts # Redux shopping list state
├── shoppingListApi.ts   # API calls for shopping lists
└── store.ts         # Redux store configuration
```

## Pages

- **Login Page** - User authentication
- **Registration Page** - New user account creation
- **Home Page** - Landing page for authenticated users
- **Shopping List Page** - Main shopping list management
- **Profile Page** - User profile management
- **Not Found Page** - 404 error handling

## Components

- `Navbar` - Navigation bar with logout button
- `ProtectedRoute` - Route protection wrapper
- `ShoppingListForm` - Form for adding/editing items
- `ShoppingListItem` - Individual shopping list item
- `CategoryFilter` - Filter items by category
- `InputField` - Reusable input component
- `ErrorMessage` - Error notification display
- `SuccessMessage` - Success notification display
- `LoadingSpinner` - Loading indicator

## Authentication

User passwords are encrypted using Crypto-JS before storage. The app uses Redux to manage authentication state and protects sensitive routes with the `ProtectedRoute` component.
