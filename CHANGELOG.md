# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.2.0] - 2025-10-23

### Added
- Docker Compose setup for PostgreSQL (f77d491)
- Prisma database migrations (f77d491)
- Backend testing and verification (f77d491)

### Changed
- Updated Docker to use port 5433 to avoid local PostgreSQL conflicts (f77d491)

### Tested
- User registration and login endpoints ✅
- JWT authentication middleware ✅
- Socket.io real-time messaging ✅
- Message persistence to database ✅
- All backend functionality verified working ✅

## [0.1.0] - 2025-10-23

### Added
- Complete backend scaffold with Express, Socket.io, and Prisma (6deb4a0)
  - Express server with TypeScript
  - Socket.io for real-time messaging
  - Prisma schema for PostgreSQL
  - JWT authentication (register/login endpoints)
  - Auth middleware for protected routes
  - Message routes for fetching chat history
  - Socket.io message handler for real-time broadcasts
  - Environment configuration
- Initial commit: Add project plan and gitignore (12be9cc)
