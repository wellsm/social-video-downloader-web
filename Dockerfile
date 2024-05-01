# Base image
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN pnpm run build

# Use Caddy as the production server
FROM caddy:latest

# Copy the built Vite application to the Caddy server directory
COPY --from=build /app/dist ./dist

# Copy custom Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

RUN caddy fmt --overwrite /etc/caddy/Caddyfile

# Expose port 80
EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile", "2>&1"]