# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Expose the port that the Express.js app will run on
EXPOSE 8000

# Define the command to run your Express.js server
CMD ["npm", "run", "start"]