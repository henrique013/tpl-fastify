# *** DEV ***

FROM node:22.14.0-alpine3.21

RUN apk add --no-cache git

USER node

WORKDIR /home/node/api

EXPOSE 3000
EXPOSE 9229

CMD ["sh", "-c", "npm install && npm run dev"]
