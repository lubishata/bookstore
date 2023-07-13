FROM node:18-alpine as base
FROM base as dev

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node ./frontend .
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]