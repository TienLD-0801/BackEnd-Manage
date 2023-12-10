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
COPY --from=builder  /backend-manage/node_modules ./node_modules


COPY package*.json ./
COPY tsconfig.json ./

ARG TIEN_LD
ENV TIEN_LD=$TIEN_LD

# Expose port 3000 for the NestJS application
EXPOSE 3000

VOLUME [ "/backend-manage/node_modules" ]

# Start the NestJS application
CMD ["npm", "run", "start:prod"]

### build source BE docker images
# docker build --tag backend-source-1.0.0 .

### start container images 
# docker run -p 8080:8080 -d backend-source-1.0.0
