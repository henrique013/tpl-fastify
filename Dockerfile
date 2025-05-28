FROM node:22.14.0-alpine3.21

USER node

WORKDIR /home/node/api

COPY --chown=node:node package*.json .

RUN npm install --omit=dev

COPY --chown=node:node . .

CMD ["npm", "start"]
