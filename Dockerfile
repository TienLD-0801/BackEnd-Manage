# Use the official Node.js 18 image as the base image
FROM node:18.16-alpine AS builder


ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

# Set the working directory in the container to /backend-manage
WORKDIR /backend-manage

# Copy the package.json and package-lock.json files to the container
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node . .

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
RUN npm run build

# Use a lightweight Node.js 18 image as the base image
FROM node:18.16-alpine as production

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

# Set the working directory in the container to /backend-manage
WORKDIR  /backend-manage

# Copy the production build files from the builder image to the container
COPY --from=builder  /backend-manage/dist ./dist
COPY --from=builder  /backend-manage/env/.env.example .env
COPY --from=builder  /backend-manage/node_modules ./node_modules


COPY package*.json ./
COPY tsconfig.json ./

EXPOSE 3000

VOLUME [ "/backend-manage/node_modules" ]

# Start the NestJS application
CMD ["npm","run" , "start:prod"]


