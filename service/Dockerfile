FROM node:18-alpine as base
FROM base as dev 

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node ./service .
RUN npm install

EXPOSE 3000

CMD [ "/bin/sh", "docker-entrypoint.sh" ]
