FROM node:16
# Installing libvips-dev for sharp Compatibility
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Install pm2 globally
RUN npm install -g pm2

WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
WORKDIR /opt/app
COPY ./ .
RUN npm run build
EXPOSE 7000

# Use pm2 to start the Node.js application
CMD ["pm2-runtime", "start", "--name", "strapi", "npm", "--", "start"]