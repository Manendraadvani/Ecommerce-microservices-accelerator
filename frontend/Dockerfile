# Stage 1: Build the Vite app
FROM node:23.11.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the build output to NGINX html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom NGINX config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]





# commands to run any other system
# docker build -t vite-react-app .
# docker run -d -p 3000:80 vite-react-app
