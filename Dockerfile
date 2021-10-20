FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "/app/"]

RUN yarn

COPY [".", "/app/"]

EXPOSE 8000

CMD [ "yarn", "run", "dev" ]

