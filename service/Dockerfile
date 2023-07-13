FROM node:18-alpine

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node . .
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]