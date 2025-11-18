# 1. Use an official Node.js runtime as a parent image
FROM node:22-alpine
# 2. Set the working directory inside the container
WORKDIR /app
# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 'npm ci' is faster and cleaner than 'npm install' for production
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "start"]