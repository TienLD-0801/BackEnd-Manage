# Use the official Node.js 18 image as the base image
FROM node:alpine AS builder


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
FROM node:alpine

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

# Set the working directory in the container to /backend-manage
WORKDIR  /backend-manage

# Copy the production build files from the builder image to the container
COPY --from=builder  /backend-manage/dist ./dist
COPY --from=builder  /backend-manage/env/.env.example .env.dev
COPY --from=builder  /backend-manage/node_modules ./node_modules


COPY package*.json ./
COPY tsconfig.json ./

# ENV VARIABLE
ARG NODE_ENV
ARG APP_PORT
ARG DB_CONNECTION
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_ROOT_PASSWORD
ARG DB_DATABASE
ARG TIMEZONE_NUM
ARG CLOUD_NAME
ARG API_KEY
ARG API_SECRET

# USE ENV
ENV NODE_ENV=$NODE_ENV
ENV APP_PORT=$APP_PORT
ENV DB_CONNECTION=$DB_CONNECTION
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_ROOT_PASSWORD=$DB_ROOT_PASSWORD
ENV DB_DATABASE=$DB_DATABASE
ENV TIMEZONE_NUM=$TIMEZONE_NUM
ENV CLOUD_NAME=$CLOUD_NAME
ENV API_KEY=$API_KEY
ENV API_SECRET=$API_SECRET


# Expose port 3000 for the NestJS application
EXPOSE 3000

VOLUME [ "/backend-manage/node_modules" ]

# Start the NestJS application
CMD ["npm", "run", "start:prod"]

### build source BE docker images
# docker build --tag backend-source-1.0.0 .

### start container images 
# docker run -p 8080:8080 -d backend-source-1.0.0
