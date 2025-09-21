# Overview

This is a Digital Library Management System (Perpustakaan Digital) built as a web application. The system provides functionality for managing books, members, and library operations through both a public frontend interface and an administrative backend dashboard. The application uses modern web technologies with a focus on responsive design and user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application follows a multi-page static website architecture with separate HTML pages for different functionalities:

- **Public Interface**: Modern, responsive design using Tailwind CSS with gradient backgrounds and glassmorphism effects
- **Admin Interface**: Bootstrap-based dashboard with sidebar navigation and data table management
- **Mobile-First Design**: Responsive navigation with mobile menu toggles and adaptive layouts
- **Component Structure**: Modular page organization with consistent navigation across all pages

## Design System
- **CSS Framework**: Tailwind CSS for the public interface, Bootstrap 5 for admin dashboard
- **Icons**: FontAwesome 6 for consistent iconography
- **Typography**: Clean, modern fonts with gradient text effects for branding
- **Color Scheme**: Blue and indigo gradients with slate gray accents for professional appearance

## JavaScript Architecture
- **Client-Side Interactivity**: Vanilla JavaScript for basic interactions and form handling
- **Data Tables**: jQuery DataTables integration for admin data management with Indonesian localization
- **Form Validation**: Client-side validation with visual feedback
- **Mobile Navigation**: JavaScript-powered responsive menu system

## Page Structure
- **Public Pages**: Home, Books, Members, Member Check, Search, Login, Register
- **Admin Pages**: Dashboard, User Management, Book Management, Loan Management, Other Management
- **Shared Components**: Consistent navigation bar, footer, and styling across pages

## Data Management
The frontend is designed to work with a backend system for:
- **User Authentication**: Login and registration workflows
- **Book Catalog**: Display and search functionality
- **Member Management**: Registration and verification
- **Loan Tracking**: Borrowing and return processes

# External Dependencies

## CDN Services
- **Tailwind CSS**: Latest version via CDN for rapid styling
- **Bootstrap 5.3.8**: For admin dashboard components and layout
- **FontAwesome 6.4.0**: Icon library for UI elements
- **jQuery 3.7.1**: Required for DataTables functionality
- **DataTables 1.13.7**: Advanced table management with Bootstrap integration

## Third-Party Integrations
- **DataTables**: Provides sorting, searching, pagination, and responsive table features
- **Bootstrap Components**: Tooltips, popovers, and responsive grid system
- **Google Fonts**: Potential integration for custom typography (referenced but not implemented)

## Asset Management
- **Images**: Logo and other visual assets stored in assets/img/ directory
- **CSS**: Custom styles in assets/css/ with minimal custom CSS due to utility-first approach
- **JavaScript**: Modular JS files in assets/js/ for specific functionality

## Browser Compatibility
- Modern browser support through CSS Grid, Flexbox, and ES6+ JavaScript
- Progressive enhancement for older browser fallbacks
- Responsive design for mobile, tablet, and desktop viewports