FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["nodemon", "index.js"]
