# Define source image
FROM node:alpine

# Information about building
LABEL maintainer = "Antonio Carlos Gomes <acgomes68@gmail.com>"
LABEL description = "Alpine Linux with Node.js and project dependencies"

# 1.Update current system packages
# 2.Update repositories and install required system packages
# 3.Clean cache after in order to keep small image
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]