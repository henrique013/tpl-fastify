# Stage 1: Build
FROM node:22.14.0-alpine3.21 AS builder
RUN apk add --no-cache git
USER node
WORKDIR /home/node/api
COPY --chown=node:node package*.json .
RUN npm install
COPY --chown=node:node . .

# Stage 2: Production
FROM node:22.14.0-alpine3.21
USER node
WORKDIR /home/node/api
COPY --from=builder /home/node/api .
CMD ["npm", "start"]
