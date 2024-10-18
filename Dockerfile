# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy both the frontend and backend directories to the container's /app directory
COPY . .

# Navigate to the backend directory
WORKDIR /app/backend

# Install Node.js and npm dependencies
RUN npm install

# Expose the port that the backend will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]