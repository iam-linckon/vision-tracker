# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with a lightweight web server (nginx)
FROM nginx:stable-alpine

# Create a non-root user and group for running nginx
RUN addgroup -S reactgroup && adduser -S reactuser -G reactgroup

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Change ownership to non-root user
RUN chown -R reactuser:reactgroup /usr/share/nginx/html

# Switch to non-root user
USER reactuser

# Expose default nginx port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]