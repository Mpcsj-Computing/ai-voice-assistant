# Use Node.js 18 as a parent image
FROM node:18-alpine as build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy only necessary files for building
COPY . .

# Build the Next.js app
RUN npm run build

# Use Node.js 18 as a base image for the final production image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the built files from the previous stage
COPY --from=build-stage /usr/src/app/.next ./.next
COPY --from=build-stage /usr/src/app/public ./public
COPY --from=build-stage /usr/src/app/package*.json ./

# Install package.json dependencies as well
RUN npm install

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
