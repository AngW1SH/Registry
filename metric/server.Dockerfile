FROM node:18-alpine

# Install pm2 globally
RUN npm install -g pm2

# Set the working directory inside the container
WORKDIR /app/proto

# Copy the contents of the proto directory from your host machine to the /app/proto directory in the container
COPY ./proto .

# Change the working directory to the parent directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY ./server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./server .

# Build the application
RUN npm run build

# Expose the required port
EXPOSE 4173

RUN npx prisma generate
# Use pm2 to start the Node.js application
CMD ["pm2-runtime", "start", "--name", "metric-server", "npm", "--", "start"]