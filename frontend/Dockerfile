FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy source code
COPY . .

# Expose the port that Vite uses
EXPOSE 5173

# Start the development server with host binding
CMD ["npm", "run", "dev"]
