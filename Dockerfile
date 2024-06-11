
# # Use the official Node.js 14 image as the base image.
# FROM node:alpine3.18


# Use an official Node.js runtime as a parent image
FROM node:alpine3.18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 4000 80

# Start Nginx and your backend application
CMD service nginx start && npm start




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


















