# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the Node.js app runs on
EXPOSE 4000

# Use the official Nginx image for the final stage
FROM nginx:alpine

# Copy the Nginx configuration file
COPY config/nginx.conf /etc/nginx/nginx.conf

# Copy the Node.js app from the previous stage
COPY --from=0 /app /app

# Expose port 80 for Nginx
EXPOSE 4000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



# # Use the official Node.js 14 image as the base image.
# FROM node:alpine3.18 AS build

# # Set the working directory to /app
# WORKDIR /app

# # Copy the package.json and package-lock.json
# COPY package*.json ./

# # Install any needed packages specified in package.json
# RUN npm install

# # Copy the current directory contents into the container at /app
# COPY . .

# # Build the Node.js app (if necessary)
# # RUN npm run build

# # Use the official NGINX image for serving the application
# FROM nginx:alpine
# # Copy the built Node.js app from the build stage to the NGINX html directory
# # If you have a build step, replace `.` with the build output directory, e.g., `build`
# COPY --from=build /app /usr/share/nginx/html

# # Copy custom NGINX configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Copy additional NGINX configurations if any
# COPY conf.d /etc/nginx/conf.d

# # Expose port 80
# EXPOSE 80

# # Run NGINX
# CMD ["nginx", "-g", "daemon off;"]
