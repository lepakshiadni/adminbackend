
# # Use the official Node.js 14 image as the base image.
# FROM node:alpine3.18


# # Set the working directory to /app
# WORKDIR /app

# # Copy the current directory contents into the container at /app
# COPY package*.json /app

# # Install any needed packages specified in package.json
# RUN npm install

# COPY . .




# # Make port 8080 available to the world outside this container
# EXPOSE 4000


# # Run the app when the container launches
# CMD ["npm", "run", "start"] 



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

# Expose port 4000
EXPOSE 4000


# Copy SSL certificate files
COPY certs/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY certs/privkey.pem /etc/ssl/private/privkey.pem

# Command to run the app with HTTPS
CMD ["npm", "run", "start"]


















