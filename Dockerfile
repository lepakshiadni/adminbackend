
# Use the official Node.js 14 image as the base image
FROM node:alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4000 (for Node.js) and port 80 (for NGINX)
EXPOSE 4000
EXPOSE 80

# Install NGINX
RUN apk update && apk add nginx

# Copy NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Command to start NGINX and the Node.js application
CMD nginx && npm run start




# # Use the official Node.js 14 image as the base image
# FROM node:alpine3.18

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port 4000
# EXPOSE 4000



# # Command to run the app with HTTPS
# CMD ["npm", "run", "start"]


















