# *** DEV ***

FROM node:22.14.0-alpine3.21

RUN apk add --no-cache git

USER node

WORKDIR /home/node/api

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "dev"]
