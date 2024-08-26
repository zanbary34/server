# Use node image as base
FROM node:20-bullseye

# Set the working directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application
COPY . .

# Copy the start script into the container
COPY start.sh /app/start.sh

# Make the start script executable
RUN chmod +x /app/start.sh

# Expose the port the app runs in
EXPOSE 3000

# Command to run the start script
CMD ["bash", "/app/start.sh"]
