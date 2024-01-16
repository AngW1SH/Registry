FROM node:14

# Install pm2 globally
RUN npm install -g pm2

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the required port
EXPOSE 3000

# Use pm2 to start the Node.js application
CMD ["pm2-runtime", "start", "--name", "auth", "npm", "--", "start"]