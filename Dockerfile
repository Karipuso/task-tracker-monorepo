# Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

COPY . ./

# Install dependencies
RUN yarn

EXPOSE 3000 3001 8000

