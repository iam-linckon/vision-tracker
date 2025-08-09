# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./ 
RUN npm ci

# Copy all source files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Remove dev dependencies (optional, since npm ci installs only prod deps if package-lock is correct)
RUN npm prune --production

# Stage 2: Production image
FROM node:18-alpine AS runner

# Create a non-root user and group with meaningful names
RUN addgroup -S myappgroup && adduser -S myappuser -G myappgroup

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Change ownership to the new user and group
RUN chown -R myappuser:myappgroup /app

# Switch to the non-root user
USER myappuser

# Expose the port your Next.js app runs on
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]