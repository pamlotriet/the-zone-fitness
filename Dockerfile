# Multi-stage Docker build for Angular SSR application

# Stage 1: Build the application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the Angular application with SSR
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001

# Copy built application from build stage
COPY --from=build --chown=angular:nodejs /app/dist/ ./dist/
COPY --from=build --chown=angular:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER angular

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Start the SSR server
CMD ["node", "dist/zone-fitness/server/server.mjs"]