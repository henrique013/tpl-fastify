FROM node:22.14.0-alpine3.21

# Instalar git
RUN apk add --no-cache git

# Configurar usuário não-root
USER node
WORKDIR /home/node/app

# Copiar arquivos de dependências
COPY --chown=node:node package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY --chown=node:node . .

# Expor porta de debug
EXPOSE 9229

# Comando padrão
CMD ["npm", "run", "dev"]
